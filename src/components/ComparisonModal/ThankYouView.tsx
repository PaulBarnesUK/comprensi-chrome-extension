import React from 'react';
import styles from './ComparisonModal.module.scss';
import { CheckCircle } from 'lucide-react';

interface ThankYouViewProps {
  onClose: () => void;
}

export const ThankYouView: React.FC<ThankYouViewProps> = ({ onClose }) => {
  return (
    <>
      <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>Thank You!</h2>
        <div className={styles.infoContainer}>
          <p className={styles.modalSubtitle}>
            <CheckCircle className={styles.infoIcon} size={14} color="#4CAF50" />
            Your feedback helps improve learning experiences for everyone.
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
