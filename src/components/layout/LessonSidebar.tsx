"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { lessons, LessonSection } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';
import styles from './LessonSidebar.module.css';

const sectionInfo: Record<LessonSection, { title: string; icon: string; color: string }> = {
  javascript: {
    title: "JavaScript",
    icon: "fa-code",
    color: "#8A54F8"
  },
  html: {
    title: "HTML",
    icon: "fa-file-code",
    color: "#20c997"
  },
  css: {
    title: "CSS",
    icon: "fa-paint-brush",
    color: "#ff69b4"
  },
  typescript: {
    title: "TypeScript",
    icon: "fa-shield-alt",
    color: "#8A54F8"
  },
  react: {
    title: "React",
    icon: "fa-atom",
    color: "#20c997"
  }
};

export function LessonSidebar() {
  const { completedLessons, isLessonComplete } = useProgress();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<LessonSection | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  // Group lessons by section
  const lessonsBySection = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.section]) {
      acc[lesson.section] = [];
    }
    acc[lesson.section].push(lesson);
    return acc;
  }, {} as Record<LessonSection, typeof lessons>);

  const sectionOrder: LessonSection[] = ['javascript', 'html', 'css', 'typescript', 'react'];

  // Track scroll position to highlight active lesson
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const lesson of lessons) {
        const element = document.getElementById(`lesson-${lesson.id}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLessonId(lesson.id);
            setActiveSection(lesson.section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToLesson = (lessonId: number) => {
    const element = document.getElementById(`lesson-${lessonId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false); // Close sidebar on mobile after selection
    }
  };

  const toggleSection = (section: LessonSection) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`} />
      </button>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className={styles.sidebar}
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className={styles.sidebarHeader}>
              <h2 className={styles.sidebarTitle}>
                <i className="fas fa-map" style={{ marginRight: '0.5rem' }} />
                Navegación
              </h2>
              <button
                className={styles.closeButton}
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation"
              >
                <i className="fas fa-times" />
              </button>
            </div>

            <div className={styles.sidebarContent}>
              {sectionOrder.map(section => {
                const sectionLessons = lessonsBySection[section] || [];
                if (sectionLessons.length === 0 && section !== 'react') return null;

                const sectionData = sectionInfo[section];
                const isExpanded = activeSection === section;
                const sectionCompleted = sectionLessons.every(l => isLessonComplete(l.id));
                const sectionProgress = sectionLessons.filter(l => isLessonComplete(l.id)).length;

                return (
                  <div key={section} className={styles.section}>
                    <button
                      className={`${styles.sectionHeader} ${isExpanded ? styles.expanded : ''}`}
                      onClick={() => toggleSection(section)}
                    >
                      <div className={styles.sectionIcon} style={{ color: sectionData.color }}>
                        <i className={`fas ${sectionData.icon}`} />
                      </div>
                      <div className={styles.sectionInfo}>
                        <span className={styles.sectionTitle}>{sectionData.title}</span>
                        {sectionLessons.length > 0 && (
                          <span className={styles.sectionProgress}>
                            {sectionProgress}/{sectionLessons.length}
                          </span>
                        )}
                      </div>
                      {sectionLessons.length > 0 && (
                        <i className={`fas fa-chevron-down ${styles.chevron} ${isExpanded ? styles.rotated : ''}`} />
                      )}
                      {sectionCompleted && sectionLessons.length > 0 && (
                        <i className={`fas fa-check-circle ${styles.completedIcon}`} />
                      )}
                    </button>

                    <AnimatePresence>
                      {isExpanded && sectionLessons.length > 0 && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={styles.lessonsList}
                        >
                          {sectionLessons.map(lesson => {
                            const completed = isLessonComplete(lesson.id);
                            const isActive = activeLessonId === lesson.id;

                            return (
                              <button
                                key={lesson.id}
                                className={`${styles.lessonItem} ${isActive ? styles.active : ''} ${completed ? styles.completed : ''}`}
                                onClick={() => scrollToLesson(lesson.id)}
                              >
                                <div className={styles.lessonIcon}>
                                  {completed ? (
                                    <i className="fas fa-check-circle" />
                                  ) : (
                                    <i className={`fas ${lesson.icon}`} />
                                  )}
                                </div>
                                <span className={styles.lessonTitle}>{lesson.title}</span>
                                {completed && (
                                  <i className={`fas fa-star ${styles.starIcon}`} />
                                )}
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                );
              })}
            </div>

            <div className={styles.sidebarFooter}>
              <div className={styles.progressSummary}>
                <i className="fas fa-trophy" style={{ marginRight: '0.5rem' }} />
                <span>
                  {completedLessons.length} / {lessons.length} completadas
                </span>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

