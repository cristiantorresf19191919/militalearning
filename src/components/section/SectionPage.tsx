"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { lessons, LessonSection } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';
import { LessonCard } from '@/components/lesson/LessonCard';
import styles from './SectionPage.module.css';

const sectionInfo: Record<LessonSection, { 
  title: string; 
  icon: string; 
  description: string; 
  color: string;
  gradient: string;
  emoji: string;
}> = {
  javascript: {
    title: "JavaScript",
    icon: "fa-code",
    description: "Aprende la base de la programación web",
    color: "#8A54F8",
    gradient: "linear-gradient(135deg, #8A54F8 0%, #A06AF9 50%, #8A54F8 100%)",
    emoji: "⚡"
  },
  html: {
    title: "HTML",
    icon: "fa-file-code",
    description: "Construye la estructura de tus páginas",
    color: "#20c997",
    gradient: "linear-gradient(135deg, #20c997 0%, #2EDC9B 50%, #20c997 100%)",
    emoji: "🏗️"
  },
  css: {
    title: "CSS",
    icon: "fa-paint-brush",
    description: "Dale estilo y belleza a tus creaciones",
    color: "#ff69b4",
    gradient: "linear-gradient(135deg, #F8549B 0%, #F96A88 50%, #F8549B 100%)",
    emoji: "🎨"
  },
  typescript: {
    title: "TypeScript",
    icon: "fa-shield-alt",
    description: "JavaScript con superpoderes de tipos",
    color: "#8A54F8",
    gradient: "linear-gradient(135deg, #8A54F8 0%, #A06AF9 50%, #8A54F8 100%)",
    emoji: "🛡️"
  },
  react: {
    title: "React",
    icon: "fa-atom",
    description: "La habilidad mejor pagada",
    color: "#20c997",
    gradient: "linear-gradient(135deg, #20c997 0%, #2EDC9B 50%, #20c997 100%)",
    emoji: "⚛️"
  }
};

interface SectionPageProps {
  section: LessonSection;
}

export function SectionPage({ section }: SectionPageProps) {
  const { completedLessons } = useProgress();
  
  // Filter lessons for this section
  const sectionLessons = lessons.filter(lesson => lesson.section === section);
  const sectionData = sectionInfo[section];
  
  const sectionProgress = sectionLessons.filter(l => completedLessons.includes(l.id)).length;
  const sectionCompleted = sectionLessons.length > 0 && sectionLessons.every(l => completedLessons.includes(l.id));
  const progressPercentage = sectionLessons.length > 0 ? (sectionProgress / sectionLessons.length) * 100 : 0;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.main
      className={styles.main}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero Section */}
      <motion.section 
        className={styles.hero}
        style={{ background: sectionData.gradient }}
        variants={heroVariants}
      >
        <div className={styles.heroContent}>
          <motion.div
            className={styles.iconContainer}
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15,
              delay: 0.3
            }}
          >
            <i className={`fas ${sectionData.icon} ${styles.heroIcon}`}></i>
            <span className={styles.emoji}>{sectionData.emoji}</span>
          </motion.div>
          
          <motion.h1 
            className={styles.heroTitle}
            variants={itemVariants}
          >
            {sectionData.title}
          </motion.h1>
          
          <motion.p 
            className={styles.heroDescription}
            variants={itemVariants}
          >
            {sectionData.description}
          </motion.p>

          {/* Progress Bar */}
          {sectionLessons.length > 0 && (
            <motion.div 
              className={styles.progressContainer}
              variants={itemVariants}
            >
              <div className={styles.progressInfo}>
                <span className={styles.progressText}>
                  {sectionProgress} / {sectionLessons.length} lecciones completadas
                </span>
                {sectionCompleted && (
                  <span className={styles.completedBadge}>✅ Completado</span>
                )}
              </div>
              <div className={styles.progressBar}>
                <motion.div
                  className={styles.progressFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  style={{ background: sectionData.gradient }}
                />
              </div>
            </motion.div>
          )}

          {/* Back Button */}
          <motion.div variants={itemVariants}>
            <Link href="/" className={styles.backButton}>
              <i className="fas fa-arrow-left"></i>
              Volver al inicio
            </Link>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className={styles.decorativeElements}>
          <motion.div
            className={styles.circle}
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className={styles.circle}
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>
      </motion.section>

      {/* Lessons Section */}
      <motion.section 
        className={styles.lessonsSection}
        variants={containerVariants}
      >
        <div className={styles.lessonsContainer}>
          {sectionLessons.length === 0 ? (
            <motion.div 
              className={styles.emptyState}
              variants={itemVariants}
            >
              <i className={`fas ${sectionData.icon} ${styles.emptyIcon}`}></i>
              <h2>¡Próximamente!</h2>
              <p>Las lecciones de {sectionData.title} estarán disponibles pronto.</p>
            </motion.div>
          ) : (
            <>
              <motion.h2 
                className={styles.lessonsTitle}
                variants={itemVariants}
              >
                Lecciones de {sectionData.title}
              </motion.h2>
              {sectionLessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  variants={itemVariants}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LessonCard 
                    lesson={lesson} 
                    isActive={true}
                    onComplete={() => {}}
                  />
                </motion.div>
              ))}
            </>
          )}
        </div>
      </motion.section>
    </motion.main>
  );
}

