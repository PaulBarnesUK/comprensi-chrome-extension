import React from 'react';
import styles from './LanguageToggle.module.scss';
import { Language } from '../../utils/languages';

interface LanguageToggleProps {
  language: Language;
  isSelected: boolean;
  onToggle: (code: string, isSelected: boolean) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, isSelected, onToggle }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onToggle(language.code, e.target.checked);
  };

  return (
    <div className={styles.languageItem}>
      <img src={language.flag} alt={`${language.name} flag`} className={styles.flag} />
      <span className={styles.name}>{language.name}</span>
      <label className={styles.toggleSwitch}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleChange}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};

export default LanguageToggle; 