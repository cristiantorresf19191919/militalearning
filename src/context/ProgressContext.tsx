"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { 
  doc, 
  setDoc, 
  updateDoc, 
  onSnapshot
} from 'firebase/firestore';

interface ProgressContextType {
  completedLessons: number[];
  hearts: number;
  gorillaHearts: number;
  markLessonComplete: (lessonId: number) => void;
  isLessonComplete: (lessonId: number) => boolean;
  resetProgress: () => void;
  isLoading: boolean;
  heartsToNextGorillaHeart: number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Get or create user ID (we'll use localStorage to persist the user ID)
function getUserId(): string {
  if (typeof window === 'undefined') return 'default-user';
  
  let userId = localStorage.getItem('milita_user_id');
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('milita_user_id', userId);
  }
  return userId;
}

const HEARTS_PER_LESSON = 1;
const HEARTS_FOR_GORILLA_HEART = 5; // Every 5 hearts = 1 GorillaHeart

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [hearts, setHearts] = useState<number>(0);
  const [gorillaHearts, setGorillaHearts] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useFirebase, setUseFirebase] = useState(false);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    setMounted(true);
    const id = getUserId();
    setUserId(id);

    // Check if Firebase is configured
    if (isFirebaseConfigured() && typeof window !== 'undefined' && db) {
      setUseFirebase(true);
      loadProgressFromFirebase(id);
    } else {
      // Fallback to localStorage
      setUseFirebase(false);
      loadProgressFromLocalStorage();
    }
  }, []);

  const loadProgressFromFirebase = async (userId: string) => {
    if (!db) {
      setUseFirebase(false);
      loadProgressFromLocalStorage();
      return;
    }
    
    try {
      const progressRef = doc(db, 'progress', userId);
      
      // Set up real-time listener
      const unsubscribe = onSnapshot(progressRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setCompletedLessons(data.completedLessons || []);
          setHearts(data.hearts || 0);
          setGorillaHearts(data.gorillaHearts || 0);
        } else {
          // Create initial document
          setDoc(progressRef, { 
            completedLessons: [], 
            hearts: 0,
            gorillaHearts: 0,
            createdAt: new Date() 
          });
          setCompletedLessons([]);
          setHearts(0);
          setGorillaHearts(0);
        }
        setIsLoading(false);
      }, (error) => {
        console.error("Firebase error, falling back to localStorage:", error);
        setUseFirebase(false);
        loadProgressFromLocalStorage();
      });

      // Cleanup listener on unmount
      return () => unsubscribe();
    } catch (error) {
      console.error("Failed to load from Firebase, using localStorage:", error);
      setUseFirebase(false);
      loadProgressFromLocalStorage();
    }
  };

  const loadProgressFromLocalStorage = () => {
    const saved = localStorage.getItem('milita_progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedLessons(data.completedLessons || []);
        setHearts(data.hearts || 0);
        setGorillaHearts(data.gorillaHearts || 0);
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    setIsLoading(false);
  };

  const saveToFirebase = async (lessons: number[], heartsCount: number, gorillaHeartsCount: number) => {
    if (!useFirebase || !userId || !db) return;
    
    try {
      const progressRef = doc(db, 'progress', userId);
      await setDoc(progressRef, {
        completedLessons: lessons,
        hearts: heartsCount,
        gorillaHearts: gorillaHeartsCount,
        updatedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error("Failed to save to Firebase:", error);
    }
  };

  const saveToLocalStorage = (lessons: number[], heartsCount: number, gorillaHeartsCount: number) => {
    if (mounted) {
      localStorage.setItem('milita_progress', JSON.stringify({
        completedLessons: lessons,
        hearts: heartsCount,
        gorillaHearts: gorillaHeartsCount,
      }));
    }
  };

  useEffect(() => {
    if (mounted && completedLessons.length >= 0) {
      if (useFirebase) {
        saveToFirebase(completedLessons, hearts, gorillaHearts);
      } else {
        saveToLocalStorage(completedLessons, hearts, gorillaHearts);
      }
    }
  }, [completedLessons, hearts, gorillaHearts, mounted, useFirebase]);

  const markLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      
      // Award heart for completing a lesson
      setHearts(prev => {
        const newHearts = prev + HEARTS_PER_LESSON;
        
        // Check if we've reached a GorillaHeart milestone
        const currentGorillaHearts = Math.floor(prev / HEARTS_FOR_GORILLA_HEART);
        const newGorillaHearts = Math.floor(newHearts / HEARTS_FOR_GORILLA_HEART);
        
        if (newGorillaHearts > currentGorillaHearts) {
          setGorillaHearts(newGorillaHearts);
        }
        
        return newHearts;
      });
    }
  };

  const isLessonComplete = (lessonId: number) => completedLessons.includes(lessonId);

  const resetProgress = async () => {
    setCompletedLessons([]);
    setHearts(0);
    setGorillaHearts(0);
    if (useFirebase && userId && db) {
      try {
        const progressRef = doc(db, 'progress', userId);
        await updateDoc(progressRef, { 
          completedLessons: [],
          hearts: 0,
          gorillaHearts: 0
        });
      } catch (error) {
        console.error("Failed to reset in Firebase:", error);
      }
    } else {
      localStorage.removeItem('milita_progress');
    }
  };

  const heartsToNextGorillaHeart = HEARTS_FOR_GORILLA_HEART - (hearts % HEARTS_FOR_GORILLA_HEART);

  return (
    <ProgressContext.Provider value={{ 
      completedLessons,
      hearts,
      gorillaHearts,
      markLessonComplete, 
      isLessonComplete, 
      resetProgress,
      isLoading,
      heartsToNextGorillaHeart
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
