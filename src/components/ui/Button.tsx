import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gradient';
  icon?: React.ReactNode;
}

export function Button({ children, variant = 'primary', icon, className, ...props }: ButtonProps) {
  return (
    <button 
      className={`${styles.button} ${styles[variant]} ${className || ''}`}
      {...props}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
}
