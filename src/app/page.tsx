import React from 'react';
import { LessonList } from '@/components/lesson/LessonList';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
            <div className={styles.mascotContainer}>
                 {/* Reusing the mascot if we moved it to public/legacy or just public */}
                 {/* NOTE: I moved all images to 'legacy/' folder. I need to move them to 'public/' to use them here. */}
                 {/* I will fix the image path after this file creation. */}
                 <img src="/mascot.avif" alt="Cute Mascot" className={styles.mascotImg} />
            </div>
            <h1 className={styles.heroTitle}>Hola <span className="text-pink">Milita</span> 💜</h1>
            <p className={styles.heroSubtitle}>
                Esta página es un regalito de tu <span className="text-purple" style={{fontWeight: 600}}>Gorilín</span> 🦍<br/>
                Para que aprendas a crear cosas hermosas en la web paso a paso.<br/>
                ¡Vamos a divertirnos con JavaScript!
            </p>
            <a href="#lesson-1" className={styles.ctaButton}>
                Comenzar Aventura ✨
            </a>
        </div>
      </header>

      <div className={styles.content}>
        <LessonList />
      </div>

      <footer className={styles.footer}>
        <p>Hecho con mucho amor <i className="fas fa-heart text-pink"></i> para <strong>Milita</strong></p>
        <p style={{fontSize: '0.9rem', opacity: 0.7}}>De tu Gorilín que te adora</p>
      </footer>
    </main>
  );
}
