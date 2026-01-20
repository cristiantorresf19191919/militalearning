"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { LessonSection, lessons } from '@/data/lessons';
import { useProgress } from '@/context/ProgressContext';
import styles from './SectionMenu.module.css';

const sectionInfo: Record<LessonSection, { 
  title: string; 
  icon: string; 
  description: string; 
  color: string;
  gradient: string;
  emoji: string;
  bgPattern: string;
}> = {
  javascript: {
    title: "JavaScript",
    icon: "fa-code",
    description: "Aprende la base de la programación web",
    color: "#8A54F8",
    gradient: "linear-gradient(135deg, #8A54F8 0%, #A06AF9 50%, #8A54F8 100%)",
    emoji: "⚡",
    bgPattern: "✨"
  },
  html: {
    title: "HTML",
    icon: "fa-file-code",
    description: "Construye la estructura de tus páginas",
    color: "#20c997",
    gradient: "linear-gradient(135deg, #20c997 0%, #2EDC9B 50%, #20c997 100%)",
    emoji: "🏗️",
    bgPattern: "💚"
  },
  css: {
    title: "CSS",
    icon: "fa-paint-brush",
    description: "Dale estilo y belleza a tus creaciones",
    color: "#ff69b4",
    gradient: "linear-gradient(135deg, #F8549B 0%, #F96A88 50%, #F8549B 100%)",
    emoji: "🎨",
    bgPattern: "💖"
  },
  typescript: {
    title: "TypeScript",
    icon: "fa-shield-alt",
    description: "JavaScript con superpoderes de tipos",
    color: "#8A54F8",
    gradient: "linear-gradient(135deg, #8A54F8 0%, #A06AF9 50%, #8A54F8 100%)",
    emoji: "🛡️",
    bgPattern: "🌟"
  },
  react: {
    title: "React",
    icon: "fa-atom",
    description: "La habilidad mejor pagada",
    color: "#20c997",
    gradient: "linear-gradient(135deg, #20c997 0%, #2EDC9B 50%, #20c997 100%)",
    emoji: "⚛️",
    bgPattern: "🚀"
  }
};

export function SectionMenu() {
  const { completedLessons } = useProgress();
  const sectionOrder: LessonSection[] = ['javascript', 'html', 'css', 'typescript', 'react'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div 
      className={styles.menuContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className={styles.welcomeMessage}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className={styles.welcomeTitle}>
          🌟 Elige tu Aventura 🌟
        </h2>
        <p className={styles.welcomeText}>
          Querida <strong>Milita</strong>, cada sección es un paso más cerca de convertirte en una 
          <strong className={styles.highlight}> súper poderosa ingeniera frontend</strong>! 💜
        </p>
        <p className={styles.welcomeSubtext}>
          Haz clic en cualquier sección para comenzar tu aprendizaje. ¡Tu <span className="text-purple" style={{fontWeight: 600}}>Gorilín</span> 🦍 está aquí para ayudarte!
        </p>
      </motion.div>

      <div className={styles.grid}>
        {sectionOrder.map((section, index) => {
          const sectionLessons = lessons.filter(l => l.section === section);
          const sectionData = sectionInfo[section];
          const sectionProgress = sectionLessons.filter(l => completedLessons.includes(l.id)).length;
          const sectionCompleted = sectionLessons.length > 0 && sectionLessons.every(l => completedLessons.includes(l.id));
          const progressPercentage = sectionLessons.length > 0 ? (sectionProgress / sectionLessons.length) * 100 : 0;
          const isComingSoon = sectionLessons.length === 0;

          const cardContent = (
            <>
              <div className={styles.cardBackground} />
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  <motion.div
                    className={styles.iconContainer}
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <i className={`fas ${sectionData.icon} ${styles.icon}`}></i>
                    <span className={styles.emoji}>{sectionData.emoji}</span>
                  </motion.div>
                </div>

                <h3 className={styles.cardTitle}>{sectionData.title}</h3>
                <p className={styles.cardDescription}>{sectionData.description}</p>

                {!isComingSoon && sectionLessons.length > 0 && (
                  <div className={styles.progressSection}>
                    <div className={styles.progressBar}>
                      <motion.div
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.3 + index * 0.1 }}
                      />
                    </div>
                    <div className={styles.progressText}>
                      <span>{sectionProgress} / {sectionLessons.length}</span>
                      {sectionCompleted && (
                        <span className={styles.completedBadge}>✅</span>
                      )}
                    </div>
                  </div>
                )}

                {isComingSoon && (
                  <div className={styles.comingSoonBadge}>
                    <span>Próximamente</span>
                  </div>
                )}

                <div className={styles.cardArrow}>
                  <i className="fas fa-arrow-right"></i>
                </div>
              </div>

              <div className={styles.decorativePattern}>
                {sectionData.bgPattern}
              </div>
            </>
          );

          return (
            <motion.div
              key={section}
              variants={cardVariants}
              whileHover={!isComingSoon ? { 
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 }
              } : {}}
              whileTap={!isComingSoon ? { scale: 0.98 } : {}}
            >
              {isComingSoon ? (
                <div
                  className={`${styles.sectionCard} ${styles.comingSoon}`}
                  style={{ 
                    '--section-gradient': sectionData.gradient,
                    '--section-color': sectionData.color,
                  } as React.CSSProperties}
                >
                  {cardContent}
                </div>
              ) : (
                <Link
                  href={`/${section}`}
                  className={styles.sectionCard}
                  style={{ 
                    '--section-gradient': sectionData.gradient,
                    '--section-color': sectionData.color,
                  } as React.CSSProperties}
                >
                  {cardContent}
                </Link>
              )}
            </motion.div>
          );
        })}

        <motion.div
          key="playground"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            y: -8,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/playground"
            className={`${styles.sectionCard} ${styles.playgroundCard}`}
            style={{ 
              '--section-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #8A54F8 100%)',
              '--section-color': '#8A54F8',
            } as React.CSSProperties}
          >
            <div className={styles.cardBackground} />
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <i className={`fas fa-flask ${styles.icon}`}></i>
                  <span className={styles.emoji}>🧪</span>
                </div>
              </div>
              <div className={styles.playgroundLabel}>
                <span>Nuevo</span>
              </div>
              <h3 className={styles.cardTitle}>Playground</h3>
              <p className={styles.cardDescription}>
                Escribe y ejecuta JavaScript con autocompletado estilo VS Code.
              </p>
              <div className={styles.cardArrow}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <div className={styles.decorativePattern}>⚡️</div>
          </Link>
        </motion.div>

        <motion.div
          key="react-live"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            y: -8,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/react-live"
            className={`${styles.sectionCard} ${styles.playgroundCard}`}
            style={{ 
              '--section-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)',
              '--section-color': '#14b8a6',
            } as React.CSSProperties}
          >
            <div className={styles.cardBackground} />
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <i className={`fas fa-code ${styles.icon}`}></i>
                  <span className={styles.emoji}>⚛️</span>
                </div>
              </div>
              <div className={styles.playgroundLabel}>
                <span>React Live</span>
              </div>
              <h3 className={styles.cardTitle}>React en vivo</h3>
              <p className={styles.cardDescription}>
                Edita JSX/TSX y ve el preview React al instante en la derecha.
              </p>
              <div className={styles.cardArrow}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <div className={styles.decorativePattern}>✨</div>
          </Link>
        </motion.div>

        <motion.div
          key="kotlin"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            y: -8,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/kotlin"
            className={`${styles.sectionCard} ${styles.playgroundCard}`}
            style={{ 
              '--section-gradient': 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)',
              '--section-color': '#7c3aed',
            } as React.CSSProperties}
          >
            <div className={styles.cardBackground} />
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <i className={`fas fa-code ${styles.icon}`}></i>
                  <span className={styles.emoji}>🧩</span>
                </div>
              </div>
              <div className={styles.playgroundLabel}>
                <span>Kotlin</span>
              </div>
              <h3 className={styles.cardTitle}>Kotlin Basics</h3>
              <p className={styles.cardDescription}>
                Practica Kotlin con autocompletado y snippets educativos.
              </p>
              <div className={styles.cardArrow}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <div className={styles.decorativePattern}>🟣</div>
          </Link>
        </motion.div>

        <motion.div
          key="backend"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.05,
            y: -8,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/backend"
            className={`${styles.sectionCard} ${styles.playgroundCard}`}
            style={{ 
              '--section-gradient': 'linear-gradient(135deg, #0ea5e9 0%, #8a54f8 100%)',
              '--section-color': '#0ea5e9',
            } as React.CSSProperties}
          >
            <div className={styles.cardBackground} />
            <div className={styles.cardContent}>
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <i className={`fas fa-server ${styles.icon}`}></i>
                  <span className={styles.emoji}>🔌</span>
                </div>
              </div>
              <div className={styles.playgroundLabel}>
                <span>Backend & API</span>
              </div>
              <h3 className={styles.cardTitle}>Frontend ↔ Backend</h3>
              <p className={styles.cardDescription}>
                Aprende endpoints, REST API, GET, POST, PUT, DELETE con Node.js.
              </p>
              <div className={styles.cardArrow}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <div className={styles.decorativePattern}>🌐</div>
          </Link>
        </motion.div>
      </div>

      <motion.div 
        className={styles.encouragement}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className={styles.encouragementText}>
          💜 <strong>Recuerda:</strong> Cada paso cuenta. ¡Tú puedes hacerlo! 🚀✨
        </p>
      </motion.div>
    </motion.div>
  );
}

