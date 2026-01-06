import React from 'react';
import { SectionMenu } from '@/components/section/SectionMenu';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
            <div className={styles.mascotContainer}>
                 <img src="/mascot.avif" alt="Cute Mascot" className={styles.mascotImg} />
            </div>
            <h1 className={styles.heroTitle}>Hola <span className="text-pink">Milita</span> 💜</h1>
            <p className={styles.heroSubtitle}>
                Esta página es un regalito de tu <span className="text-purple" style={{fontWeight: 600}}>Gorilín</span> 🦍<br/>
                Para que aprendas a crear cosas hermosas en la web paso a paso.<br/>
                ¡Elige una sección y comienza tu aventura!
            </p>
        </div>
      </header>

      <div className={styles.content}>
        <SectionMenu />
      </div>

      <footer className={styles.footer}>
        <p>Hecho con mucho amor <i className="fas fa-heart text-pink"></i> para <strong>Milita</strong></p>
        <p style={{fontSize: '0.9rem', opacity: 0.7}}>De tu Gorilín que te adora</p>
      </footer>
    </main>
  );
}
