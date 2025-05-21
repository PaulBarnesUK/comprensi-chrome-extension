import React from 'react';
import styles from './DifficultyIndicator.module.scss';
import { LANGUAGE_FLAGS } from '../../utils/languages';

export interface DifficultyIndicatorProps {
  score?: number;
  language?: string;
}

export const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({ score, language }) => {
  const percentage = score ? Math.round(score) : 0;
  const displayScore = score ? `${score}/100` : '??/100';

  const getColorClass = () => {
    if (!score) return styles.unknown;
    if (percentage <= 30) return styles.totalBeginner;
    if (percentage <= 44) return styles.beginner;
    if (percentage <= 60) return styles.intermediate;
    if (percentage <= 80) return styles.advanced;
    return styles.expert;
  };

  const handleSetLanguage = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Placeholder for future modal logic
    // eslint-disable-next-line no-console
    console.log('Open set language modal');
  };

  const getFlagTooltip = () => {
    if (language) return `${language} flag`;
    return 'Language not detected. This video will not be counted in your watch time tracking. Click to set language.';
  };

  const getScoreTooltip = () => {
    if (!score) return 'Difficulty score is still being calculated.';
    return `Difficulty score: ${displayScore}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.flag} title={getFlagTooltip()}>
        {language ? (
          <img
            src={LANGUAGE_FLAGS[language]}
            alt={`${language} flag`}
            className={styles.flagIcon}
          />
        ) : (
          <div className={styles.flagIconAlert} onClick={handleSetLanguage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.scoreContainer}>
        <div className={`${styles.score} ${getColorClass()}`} title={getScoreTooltip()}>
          {displayScore}
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
