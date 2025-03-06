import React from 'react';
import styles from './DifficultyIndicator.module.scss';

import frFlag from '@/assets/flags/fr.svg';
import esFlag from '@/assets/flags/es.svg';
import itFlag from '@/assets/flags/it.svg';
import ptFlag from '@/assets/flags/pt.svg';
import deFlag from '@/assets/flags/de.svg';

const FLAGS: Record<string, string> = {
  fr: frFlag,
  es: esFlag,
  it: itFlag,
  pt: ptFlag,
  de: deFlag,
};

export interface DifficultyIndicatorProps {
  score: number;
  language: string;
}

export const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({
  score,
  language,
}) => {
    
  const percentage = Math.round(score);

  const getColorClass = () => {
    if (percentage <= 30) return styles.totalBeginner;
    if (percentage <= 44) return styles.beginner;
    if (percentage <= 60) return styles.intermediate;
    if (percentage <= 80) return styles.advanced;
    return styles.expert;
  };

  return (
    <div className={`${styles.container}`}>
      <div className={styles.flag}>
        {FLAGS[language] && (
          <img 
            src={FLAGS[language]} 
            alt={`${language} flag`} 
            className={styles.flagIcon} 
          />
        )}
      </div>
      <div className={styles.scoreContainer}>
        <div className={`${styles.score} ${getColorClass()}`}>
          {score}/100
        </div>
        <div className={styles.progressBar}>
          <div 
            className={`${styles.progress} ${getColorClass()}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}; 