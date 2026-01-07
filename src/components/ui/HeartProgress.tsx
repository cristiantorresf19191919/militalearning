"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useProgress } from '@/context/ProgressContext';
import styles from './HeartProgress.module.css';

export function HeartProgress() {
  const { hearts, gorillaHearts, heartsToNextGorillaHeart, isLoading, resetProgress } = useProgress();
  const [showCelebration, setShowCelebration] = useState(false);
  const [isGorillaHeartCelebration, setIsGorillaHeartCelebration] = useState(false);
  const prevHeartsRef = useRef(hearts);
  const prevGorillaHeartsRef = useRef(gorillaHearts);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    // Show celebration when hearts increase
    if (hearts > prevHeartsRef.current) {
      setShowCelebration(true);
      setIsGorillaHeartCelebration(false);
      setTimeout(() => setShowCelebration(false), 2000);
    }
    prevHeartsRef.current = hearts;

    // Show celebration when GorillaHeart increases
    if (gorillaHearts > prevGorillaHeartsRef.current) {
      setShowCelebration(true);
      setIsGorillaHeartCelebration(true);
      
      // Fire confetti for GorillaHeart!
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.3, x: 0.9 },
        colors: ['#8A54F8', '#A06AF9', '#F8549B', '#F96A88'],
      });
      
      setTimeout(() => {
        setShowCelebration(false);
        setIsGorillaHeartCelebration(false);
      }, 3000);
    }
    prevGorillaHeartsRef.current = gorillaHearts;
  }, [hearts, gorillaHearts, isLoading]);

  const progressPercentage = ((5 - heartsToNextGorillaHeart) / 5) * 100;

  const handleReset = () => {
    if (showResetConfirm) {
      resetProgress();
      setShowResetConfirm(false);
      setIsExpanded(false);
    } else {
      setShowResetConfirm(true);
      setTimeout(() => setShowResetConfirm(false), 3000);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className={styles.content}>
          {/* Hearts Display */}
          <motion.div
            className={styles.heartGroup}
            animate={showCelebration ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <i className={`fas fa-heart ${styles.heartIcon}`}></i>
            <span className={styles.count}>{hearts}</span>
          </motion.div>

          {/* GorillaHeart Display */}
          <motion.div
            className={styles.gorillaGroup}
            animate={isGorillaHeartCelebration ? { 
              scale: [1, 1.5, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.gorillaEmoji}>🦍</span>
            <i className={`fas fa-heart ${styles.gorillaHeartIcon}`}></i>
            <span className={styles.count}>{gorillaHearts}</span>
          </motion.div>

          {/* Progress Bar (shown on hover/expand) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className={styles.progressContainer}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.progressLabel}>
                  {heartsToNextGorillaHeart} corazón{heartsToNextGorillaHeart !== 1 ? 'es' : ''} para el próximo GorillaHeart 🦍
                </div>
                <div className={styles.progressBar}>
                  <motion.div
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                {/* Reset Button */}
                <button
                  className={styles.resetButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                >
                  {showResetConfirm ? (
                    <>
                      <i className="fas fa-check"></i>
                      <span>Confirmar</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-redo"></i>
                      <span>Resetear</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Celebration Particles */}
        <AnimatePresence>
          {showCelebration && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.particle}
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 1,
                    scale: 1,
                  }}
                  animate={{
                    x: Math.cos((i * Math.PI * 2) / 8) * 60,
                    y: Math.sin((i * Math.PI * 2) / 8) * 60,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                  }}
                >
                  {isGorillaHeartCelebration ? '🦍' : '💜'}
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

