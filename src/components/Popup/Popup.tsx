import React from 'react';
import styles from './Popup.module.scss';
import LanguageSettings from '../LanguageSettings';
import LanguageStatus from '../LanguageStatus';

const Popup: React.FC = () => {
  return (
    <div className={styles.popup}>
      <header className={styles.header}>
        <h1 className={styles.title}>Comprensi: Language Learning on Youtube</h1>
        <p className={styles.description}>Select languages to show difficulty ratings</p>
      </header>

      <main>
        <LanguageStatus />
        <LanguageSettings />
      </main>

      <footer className={styles.footer}>
        <p>v1.0.0</p>
      </footer>
    </div>
  );
};

export default Popup;
