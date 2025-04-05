import React from 'react';
import styles from './ComparisonModal.module.scss';
import { WatchData } from '../../types';
import { ComparisonResult } from '@/types/api';
import { Info } from 'lucide-react';

interface ComparisonViewProps {
  currentVideo: WatchData;
  previousVideo: WatchData;
  onCompare: (result: ComparisonResult) => void;
}

export const ComparisonView: React.FC<ComparisonViewProps> = ({
  currentVideo,
  previousVideo,
  onCompare
}) => {
  return (
    <>
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
              onClick={() => onCompare(ComparisonResult.FIRST_HARDER)}
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
              onClick={() => onCompare(ComparisonResult.SECOND_HARDER)}
            >
              This was easier
            </button>
          </div>
        </div>

        <button className={styles.equalButton} onClick={() => onCompare(ComparisonResult.SIMILAR)}>
          Both equally difficult
        </button>
      </div>

      <div className={styles.modalFooter}>
        <button className={styles.skipButton} onClick={() => onCompare(ComparisonResult.SIMILAR)}>
          Skip for now
        </button>
      </div>
    </>
  );
};

export default ComparisonView;
