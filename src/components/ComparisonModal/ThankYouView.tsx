import React from 'react';
import styles from './ComparisonModal.module.scss';
import { CheckCircle } from 'lucide-react';
import { CompareResponse } from '@/types/api';

interface ThankYouViewProps {
  onClose: () => void;
  compareResponse: CompareResponse;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({ onClose, compareResponse }) => {
  console.log(compareResponse);
  return (
    <>
      <div className={styles.modalHeader}>
        <div className={styles.successIcon}>
          <CheckCircle size={30} color="#4CAF50" />
        </div>
        <h2 className={styles.modalTitle}>Thanks for contributing!</h2>
        <div className={styles.infoContainer}>
          <p className={styles.modalSubtitle}>
            You're helping build a better resource for language learners.
          </p>
        </div>
      </div>

      <div className={styles.modalBody}>
        <div className={styles.thankYouContent}>
          <p className={styles.thankYouText}>
            Your comparison has been recorded. This helps us understand which videos are easier to
            understand for different learners.
          </p>
          <button onClick={onClose} className={styles.equalButton} style={{ marginTop: '16px' }}>
            Continue watching
          </button>
        </div>
      </div>
    </>
  );
};

export default ThankYouView;
