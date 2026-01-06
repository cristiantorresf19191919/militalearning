"use client";

import React, { useEffect, useState } from 'react';
import { lessons } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';
import { LessonCard } from './LessonCard';
import styles from './LessonList.module.css';

export function LessonList() {
  const { completedLessons } = useProgress();
  // Active lesson is the first one not completed + all completed ones are visible?
  // Or current active is the *next* one.
  // We want to show all completed lessons AND the current one.
  // Actually, the legacy app hides next lessons until previous is completed.
  
  // Logic: 
  // - Always show Lesson 1.
  // - Show Lesson N if Lesson N-1 is complete.
  
  // We can just iterate and pass `isActive` state.
  
  // Also we want to scroll to the new lesson when it becomes active.
  // This is handled partly by `LessonCard` reveal animation, but maybe scroll too.
  
  const [maxVisibleLesson, setMaxVisibleLesson] = useState(1);

  useEffect(() => {
    // Calculate how many lessons should be visible
    // If completedLessons contains 1, then maxVisible is 2.
    // If completedLessons contains 1, 2... maxVisible is 3.
    // We assume sequential completion.
    
    // Find the highest ID completed.
    let count = 1;
    for (let i = 1; i <= lessons.length; i++) {
        if (completedLessons.includes(i)) {
            count = i + 1;
        } else {
            break;
        }
    }
    // Cap at total lessons
    if (count > lessons.length) count = lessons.length; // Actually we might want to show a finish screen?
    
    // If count changed, we update
    if (count > maxVisibleLesson) {
        setMaxVisibleLesson(count);
        // Scroll to new lesson?
        setTimeout(() => {
            const el = document.getElementById(`lesson-${count}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500); // Wait for animation
    } else if (count < maxVisibleLesson) {
        // Did we reset?
        setMaxVisibleLesson(count);
    }
    
  }, [completedLessons, maxVisibleLesson]);

  return (
    <div className={styles.list}>
      {lessons.map(lesson => (
        <LessonCard 
            key={lesson.id} 
            lesson={lesson} 
            isActive={lesson.id <= maxVisibleLesson}
            onComplete={() => { /* Handled in effect by context update */ }}
        />
      ))}
      
      {/* Final Message Logic */}
      {completedLessons.length >= lessons.length && (
          <div className={styles.finalMessage} id="final-section">
              <h2>¡Lo hiciste genial! 🌟</h2>
              <img src="/cow.png" alt="Cow" style={{maxWidth: '200px', margin: '1rem auto', display: 'block'}} />
              <p>Has completado el curso de Gorilín. ¡Eres oficialmente una Programadora!</p>
          </div>
      )}
    </div>
  );
}
