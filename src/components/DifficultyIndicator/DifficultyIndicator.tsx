import React, { useState } from 'react';
import styles from './DifficultyIndicator.module.scss';
import { LANGUAGE_FLAGS } from '../../utils/languages';
import alertIcon from '../../assets/alert.svg';

export interface DifficultyIndicatorProps {
  score?: number;
  language?: string;
  showTooltip?: boolean;
}

export const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({
  score,
  language,
  showTooltip = true
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(!language);

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
    // Placeholder for future logic
    // eslint-disable-next-line no-console
    console.log('Set language button clicked');
  };

  const shouldShowTooltip = showTooltip && (!language || tooltipVisible);

  const getScoreTooltip = () => {
    if (!score) return 'Difficulty level is being calibrated based on your watch history';
    return `Difficulty score: ${displayScore}`;
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => showTooltip && language && setTooltipVisible(true)}
      onMouseLeave={() => showTooltip && language && setTooltipVisible(false)}
    >
      <div className={styles.flag}>
        {language ? (
          <img
            src={LANGUAGE_FLAGS[language]}
            alt={`${language} flag`}
            className={styles.flagIcon}
          />
        ) : (
          <img src={alertIcon} alt="Alert: language not detected" className={styles.flagIcon} />
        )}
        {shouldShowTooltip && (
          <div className={styles.tooltip}>
            <div>
              Language not detected. This video will not be counted in your watch time tracking.
            </div>
            <button className={styles.setLanguageBtn} onClick={handleSetLanguage} type="button">
              Set language
            </button>
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
