import React from 'react';
import styles from './DifficultyIndicator.module.scss';
import LANGUAGE_FLAGS from './languageFlags';

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
        {LANGUAGE_FLAGS[language] && (
          <img 
            src={LANGUAGE_FLAGS[language]} 
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