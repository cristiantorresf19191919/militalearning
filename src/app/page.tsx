import React from "react";
import { Hero } from "@/components/hero/Hero";
import { SectionMenu } from "@/components/section/SectionMenu";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />

      <div id="secciones" className={styles.content}>
        <SectionMenu />
      </div>

      <footer className={styles.footer}>
        <p>
          Hecho con mucho amor <i className="fas fa-heart text-pink"></i> para{" "}
          <strong>Milita</strong>
        </p>
        <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
          De tu Gorilín que te adora
        </p>
      </footer>
    </main>
  );
}
