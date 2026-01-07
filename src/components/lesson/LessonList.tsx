"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { lessons, LessonSection } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';
import { LessonCard } from './LessonCard';
import styles from './LessonList.module.css';

const sectionInfo: Record<LessonSection, { title: string; icon: string; description: string; color: string }> = {
  javascript: {
    title: "JavaScript",
    icon: "fa-code",
    description: "Aprende la base de la programación web",
    color: "var(--purple-1)"
  },
  html: {
    title: "HTML",
    icon: "fa-file-code",
    description: "Construye la estructura de tus páginas",
    color: "var(--teal-1)"
  },
  css: {
    title: "CSS",
    icon: "fa-paint-brush",
    description: "Dale estilo y belleza a tus creaciones",
    color: "var(--pink-1)"
  },
  typescript: {
    title: "TypeScript",
    icon: "fa-shield-alt",
    description: "JavaScript con superpoderes de tipos",
    color: "var(--purple-1)"
  },
  react: {
    title: "React",
    icon: "fa-atom",
    description: "La habilidad mejor pagada",
    color: "var(--teal-1)"
  }
};

export function LessonList() {
  const { completedLessons } = useProgress();

  // Group lessons by section
  const lessonsBySection = lessons.reduce((acc, lesson) => {
    if (!acc[lesson.section]) {
      acc[lesson.section] = [];
    }
    acc[lesson.section].push(lesson);
    return acc;
  }, {} as Record<LessonSection, typeof lessons>);

  const sectionOrder: LessonSection[] = ['javascript', 'html', 'css', 'typescript', 'react'];

  return (
    <div className={styles.list}>
      {/* Motivational Message */}
      <div className={styles.motivationalMessage}>
        <h2 className={styles.motivationalTitle}>
          🌟 ¡Sigue el Camino hacia el Éxito! 🌟
        </h2>
        <p className={styles.motivationalText}>
          Querida <strong>Milita</strong>, este es tu mapa del tesoro para convertirte en una 
          <strong className={styles.highlight}> súper poderosa ingeniera frontend</strong>! 💜
        </p>
        <p className={styles.motivationalText}>
          Cada sección que completes te acerca más a crear cosas increíbles en la web. 
          ¡Tú puedes hacerlo! Tu <span className="text-purple" style={{fontWeight: 600}}>Gorilín</span> 🦍 
          cree en ti y está aquí para ayudarte en cada paso. 
        </p>
        <p className={styles.motivationalText}>
          <strong>¡Vamos a conquistar el mundo del código juntas!</strong> 🚀✨
        </p>
      </div>

      {/* Lessons grouped by sections */}
      {sectionOrder.map(section => {
        const sectionLessons = lessonsBySection[section] || [];
        if (sectionLessons.length === 0 && section !== 'react') return null;

        const sectionData = sectionInfo[section];
        const sectionCompleted = sectionLessons.every(l => completedLessons.includes(l.id));
        const sectionProgress = sectionLessons.filter(l => completedLessons.includes(l.id)).length;

        return (
          <motion.div 
            key={section} 
            className={styles.section}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Link href={`/${section}`} className={styles.sectionLink}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon} style={{ color: sectionData.color }}>
                  <i className={`fas ${sectionData.icon}`}></i>
                </div>
                <div className={styles.sectionTitleContainer}>
                  <h2 className={styles.sectionTitle}>{sectionData.title}</h2>
                  <p className={styles.sectionDescription}>{sectionData.description}</p>
                  {sectionLessons.length > 0 && (
                    <div className={styles.sectionProgress}>
                      {sectionProgress} / {sectionLessons.length} completadas
                      {sectionCompleted && <span className={styles.completedBadge}> ✅</span>}
                    </div>
                  )}
                </div>
                <div className={styles.sectionArrow}>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </Link>

            {sectionLessons.map(lesson => (
              <LessonCard 
                key={lesson.id} 
                lesson={lesson} 
                isActive={true}
                onComplete={() => { /* Handled in effect by context update */ }}
              />
            ))}
          </motion.div>
        );
      })}
      
      {/* Final Message Logic */}
      {completedLessons.length >= lessons.length && (
          <div className={styles.finalMessage} id="final-section">
              <h2>¡Lo hiciste genial! 🌟</h2>
              <img src="/cow.png" alt="Cow" style={{maxWidth: '200px', margin: '1rem auto', display: 'block'}} />
              <p>Has completado todas las lecciones disponibles. ¡Eres oficialmente una Programadora!</p>
              </div>
            )}
    </div>
  );
}
