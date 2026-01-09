"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import styles from "./Hero.module.css";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const phrases = useMemo(
    () => [
      "El código es la pluma con la que escribes tu libertad financiera.",
      "Aprender a programar es descubrir que puedes crear tu propia economía.",
      "Cada línea es una decisión: diseñar, automatizar y liberar tiempo.",
      "La lógica te entrena la mente; la creatividad del código impulsa tu vida.",
      "El software escala tus ideas más rápido que cualquier otro oficio."
    ],
    []
  );

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const logo = logoRef.current;

    if (!section || !card || !logo) return;

    const ctx = gsap.context(() => {
      gsap.set(section, { perspective: 800 });

      const outerRX = gsap.quickTo(card, "rotationX", {
        ease: "power3",
        duration: 0.4,
      });
      const outerRY = gsap.quickTo(card, "rotationY", {
        ease: "power3",
        duration: 0.4,
      });
      const innerX = gsap.quickTo(logo, "x", {
        ease: "power3",
        duration: 0.4,
      });
      const innerY = gsap.quickTo(logo, "y", {
        ease: "power3",
        duration: 0.4,
      });

      const handleMove = (e: PointerEvent) => {
        const bounds = section.getBoundingClientRect();
        const progressX = (e.clientX - bounds.left) / bounds.width;
        const progressY = (e.clientY - bounds.top) / bounds.height;

        outerRX(gsap.utils.interpolate(15, -15, progressY));
        outerRY(gsap.utils.interpolate(-15, 15, progressX));
        innerX(gsap.utils.interpolate(-28, 28, progressX));
        innerY(gsap.utils.interpolate(-28, 28, progressY));
      };

      const handleLeave = () => {
        outerRX(0);
        outerRY(0);
        innerX(0);
        innerY(0);
      };

      section.addEventListener("pointermove", handleMove);
      section.addEventListener("pointerleave", handleLeave);

      const selectors = {
        eyebrow: `.${styles.eyebrow}`,
        title: `.${styles.title}`,
        subtitle: `.${styles.subtitle}`,
        actions: `.${styles.actions}`,
      };

      gsap.from(
        [selectors.eyebrow, selectors.title, selectors.subtitle, selectors.actions],
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.15,
        }
      );

      gsap.from(card, {
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.2,
      });

      return () => {
        section.removeEventListener("pointermove", handleMove);
        section.removeEventListener("pointerleave", handleLeave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.backdrop} />
      <div className={styles.glowPink} />
      <div className={styles.glowPurple} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>MilitaCode</span>
          <h1 className={styles.title}>
            La magia del código también mejora tu mundo
          </h1>
          <p className={styles.subtitle}>Frases para inspirar tu camino tech:</p>

          <ul className={styles.phrases}>
            {phrases.map((phrase) => (
              <li key={phrase}>{phrase}</li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a href="#secciones" className={styles.primaryAction}>
              Ver secciones
            </a>
            <Link href="/react" className={styles.secondaryAction}>
              Ruta React
            </Link>
          </div>
          <p className={styles.hint}>Mueve el cursor sobre la tarjeta ✨</p>
        </div>

        <div className={styles.stage}>
          <div className={styles.logoOuter} ref={cardRef}>
            <div className={styles.logo} ref={logoRef}>
              <span className={styles.logoMark}>MilitaCode</span>
              <span className={styles.logoTag}>Next.js + GSAP + Amor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
