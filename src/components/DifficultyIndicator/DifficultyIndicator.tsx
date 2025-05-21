import React from 'react';
import styles from './DifficultyIndicator.module.scss';
import { LANGUAGE_FLAGS } from '../../utils/languages';
import unknownFlag from '../../assets/flags/unknown.svg';

export interface DifficultyIndicatorProps {
  score?: number;
  language?: string;
  showScore?: boolean;
}

export const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({
  score,
  language,
  showScore = true
}) => {
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
    if (!score) return 'Difficulty score is being calibrated.';
    return `Difficulty score: ${displayScore}`;
  };

  return (
    <div
      className={`${styles.container} ${!showScore ? styles.noScore : ''} ${!language ? styles.noLanguage : ''}`}
    >
      <div className={styles.flag} title={getFlagTooltip()}>
        {language ? (
          <img
            src={LANGUAGE_FLAGS[language]}
            alt={`${language} flag`}
            className={styles.flagIcon}
          />
        ) : (
          <div className={styles.flagIconAlert} onClick={handleSetLanguage}>
            <img src={unknownFlag} alt="Unknown flag" />
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
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <path d="M12 17h.01" />
            </svg>
          </div>
        )}
      </div>
      {showScore && (
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
      )}
    </div>
  );
};
