import React from 'react';
import styles from './ComparisonModal.module.scss';
import { CheckCircle } from 'lucide-react';
import { CompareResponse } from '@/types/api';

interface ThankYouViewProps {
  onClose: () => void;
  compareResponse: CompareResponse;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({ onClose, compareResponse }) => {
  return (
    <>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Thanks for contributing!</h2>
        <div className={styles.infoContainer}>
          <p className={styles.modalSubtitle}>
            <CheckCircle className={styles.infoIcon} size={14} color="#4CAF50" />
            You're helping build a better resource for language learners!
          </p>
        </div>
      </div>

      <div className={styles.modalBody}>
        <div className={styles.thankYouContent}>
          <p className={styles.thankYouText}>
            Your comparison has been recorded. This helps us understand which videos are easier to
            understand for different learners.
          </p>
          <div>
            changes:
            <br />
            first vid old level: {compareResponse.firstVideo.difficulty.previous.score}
            <br />
            first vid new level: {compareResponse.firstVideo.difficulty.current.score}
            <br />
            second vid old level: {compareResponse.secondVideo.difficulty.previous.score}
            <br />
            second vid new level: {compareResponse.secondVideo.difficulty.current.score}
            <br />
            confidence:
            <br />
            first vid old confidence: {compareResponse.firstVideo.difficulty.previous.confidence}
            <br />
            first vid new confidence: {compareResponse.firstVideo.difficulty.current.confidence}
            <br />
            second vid old confidence: {compareResponse.secondVideo.difficulty.previous.confidence}
            <br />
            second vid new confidence: {compareResponse.secondVideo.difficulty.current.confidence}
          </div>
          <button onClick={onClose} className={styles.equalButton} style={{ marginTop: '16px' }}>
            Continue watching
          </button>
        </div>
      </div>
    </>
  );
};

export default ThankYouView;
