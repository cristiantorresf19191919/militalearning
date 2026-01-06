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
  markLessonComplete: (lessonId: number) => void;
  isLessonComplete: (lessonId: number) => boolean;
  resetProgress: () => void;
  isLoading: boolean;
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

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
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
        } else {
          // Create initial document
          setDoc(progressRef, { completedLessons: [], createdAt: new Date() });
          setCompletedLessons([]);
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
        setCompletedLessons(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse progress", e);
      }
    }
    setIsLoading(false);
  };

  const saveToFirebase = async (lessons: number[]) => {
    if (!useFirebase || !userId || !db) return;
    
    try {
      const progressRef = doc(db, 'progress', userId);
      await setDoc(progressRef, {
        completedLessons: lessons,
        updatedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error("Failed to save to Firebase:", error);
    }
  };

  const saveToLocalStorage = (lessons: number[]) => {
    if (mounted) {
      localStorage.setItem('milita_progress', JSON.stringify(lessons));
    }
  };

  useEffect(() => {
    if (mounted && completedLessons.length >= 0) {
      if (useFirebase) {
        saveToFirebase(completedLessons);
      } else {
        saveToLocalStorage(completedLessons);
      }
    }
  }, [completedLessons, mounted, useFirebase]);

  const markLessonComplete = (lessonId: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
    }
  };

  const isLessonComplete = (lessonId: number) => completedLessons.includes(lessonId);

  const resetProgress = async () => {
    setCompletedLessons([]);
    if (useFirebase && userId && db) {
      try {
        const progressRef = doc(db, 'progress', userId);
        await updateDoc(progressRef, { completedLessons: [] });
      } catch (error) {
        console.error("Failed to reset in Firebase:", error);
      }
    } else {
      localStorage.removeItem('milita_progress');
    }
  };

  return (
    <ProgressContext.Provider value={{ 
      completedLessons, 
      markLessonComplete, 
      isLessonComplete, 
      resetProgress,
      isLoading 
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
