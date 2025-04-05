import React from 'react';
import styles from './ComparisonModal.module.scss';
import { WatchData } from '../../types';
import { ComparisonResult, ApiResponse, CompareResponse } from '@/types/api';
import { Info, X } from 'lucide-react';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVideo?: WatchData;
  previousVideo?: WatchData;
  onCompare: (result: ComparisonResult) => Promise<ApiResponse<CompareResponse>>;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  currentVideo,
  previousVideo,
  onCompare
}) => {
  if (!isOpen || !currentVideo || !previousVideo) return null;

  const handleCompare = async (result: ComparisonResult) => {
    const response = await onCompare(result);
    console.log(response);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X className={styles.closeIcon} size={24} />
        </button>

        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Which video was easier to understand?</h2>
          <div className={styles.infoContainer}>
            <p className={styles.modalSubtitle}>
              <Info className={styles.infoIcon} size={14} />
              Your feedback helps fellow learners find videos that match their level. Every vote
              counts!
            </p>
          </div>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.comparisonContainer}>
            <div className={styles.videoCard}>
              <div className={styles.thumbnailContainer}>
                <img
                  src={`https://i.ytimg.com/vi/${previousVideo.id}/mqdefault.jpg`}
                  alt={previousVideo.title}
                  className={styles.thumbnail}
                />
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{previousVideo.title}</h3>
                <p className={styles.channelName}>{previousVideo.channelName}</p>
              </div>
              <button
                className={styles.comparisonButton}
                onClick={() => handleCompare(ComparisonResult.FIRST_HARDER)}
              >
                This was easier
              </button>
            </div>

            <div className={styles.videoCard}>
              <div className={styles.thumbnailContainer}>
                <img
                  src={`https://i.ytimg.com/vi/${currentVideo.id}/mqdefault.jpg`}
                  alt={currentVideo.title}
                  className={styles.thumbnail}
                />
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{currentVideo.title}</h3>
                <p className={styles.channelName}>{currentVideo.channelName}</p>
              </div>
              <button
                className={styles.comparisonButton}
                onClick={() => handleCompare(ComparisonResult.SECOND_HARDER)}
              >
                This was easier
              </button>
            </div>
          </div>

          <button
            className={styles.equalButton}
            onClick={() => handleCompare(ComparisonResult.SIMILAR)}
          >
            Both equally difficult
          </button>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.skipButton} onClick={onClose}>
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
