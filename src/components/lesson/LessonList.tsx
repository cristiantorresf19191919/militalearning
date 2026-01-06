"use client";

import React, { useEffect, useState } from 'react';
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
    description: "Próximamente - La habilidad mejor pagada",
    color: "var(--teal-1)"
  }
};

export function LessonList() {
  const { completedLessons } = useProgress();
  const [maxVisibleLesson, setMaxVisibleLesson] = useState(1);

  useEffect(() => {
    // Calculate how many lessons should be visible
    let count = 1;
    for (let i = 1; i <= lessons.length; i++) {
        if (completedLessons.includes(i)) {
            count = i + 1;
        } else {
            break;
        }
    }
    if (count > lessons.length) count = lessons.length;
    
    if (count > maxVisibleLesson) {
        setMaxVisibleLesson(count);
        setTimeout(() => {
            const el = document.getElementById(`lesson-${count}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    } else if (count < maxVisibleLesson) {
        setMaxVisibleLesson(count);
    }
  }, [completedLessons, maxVisibleLesson]);

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
          <div key={section} className={styles.section}>
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
            </div>

            {section === 'react' ? (
              <div className={styles.comingSoon}>
                <div className={styles.comingSoonContent}>
                  <i className={`fas ${sectionData.icon} ${styles.comingSoonIcon}`}></i>
                  <h3 className={styles.comingSoonTitle}>¡React Próximamente! 🚀</h3>
                  <p className={styles.comingSoonText}>
                    <strong>React es la habilidad mejor pagada en el mundo del desarrollo frontend</strong>, 
                    pero ¡no te preocupes! Es más fácil de usar de lo que parece. 💪
                  </p>
                  <p className={styles.comingSoonText}>
                    Una vez que domines JavaScript, HTML, CSS y TypeScript, estarás lista para 
                    aprender React y crear aplicaciones web increíbles. ¡Estamos trabajando 
                    en las lecciones para ti! ⚛️✨
                  </p>
                  <div className={styles.comingSoonEmoji}>🎯💼🌟</div>
                </div>
              </div>
            ) : (
              sectionLessons.map(lesson => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  isActive={lesson.id <= maxVisibleLesson}
                  onComplete={() => { /* Handled in effect by context update */ }}
                />
              ))
            )}
          </div>
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
