import React from 'react';
import styles from './ComparisonModal.module.scss';
import { WatchData } from '../../types';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVideo?: WatchData;
  previousVideo?: WatchData;
  onCompare: (result: 'current' | 'previous' | 'equal') => void;
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({ 
  isOpen, 
  onClose, 
  currentVideo, 
  previousVideo, 
  onCompare 
}) => {
  if (!isOpen || !currentVideo || !previousVideo) return null;

  const handleCompare = (result: 'current' | 'previous' | 'equal') => {
    onCompare(result);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Which video was easier to understand?</h2>
          <div className={styles.infoContainer}>
            <span className={styles.infoIcon}>ⓘ</span>
            <p className={styles.modalSubtitle}>
              Your feedback helps fellow learners find videos that match their level. Every vote counts!
            </p>
          </div>
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.comparisonContainer}>
            <div className={styles.videoCard}>
              <div className={styles.thumbnailContainer}>
                <img 
                  src={`https://i.ytimg.com/vi/${previousVideo.videoId}/mqdefault.jpg`} 
                  alt={previousVideo.title}
                  className={styles.thumbnail}
                />
                <div className={styles.channelIconContainer}>
                  <img 
                    src={`https://i.ytimg.com/vi/${previousVideo.videoId}/1.jpg`} 
                    alt={`${previousVideo.channelName} icon`}
                    className={styles.channelIcon}
                  />
                </div>
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{previousVideo.title}</h3>
                <p className={styles.channelName}>{previousVideo.channelName}</p>
              </div>
              <button 
                className={styles.comparisonButton}
                onClick={() => handleCompare('previous')}
              >
                This was easier
              </button>
            </div>
            
            <div className={styles.videoCard}>
              <div className={styles.thumbnailContainer}>
                <img 
                  src={`https://i.ytimg.com/vi/${currentVideo.videoId}/mqdefault.jpg`} 
                  alt={currentVideo.title}
                  className={styles.thumbnail}
                />
                <div className={styles.channelIconContainer}>
                  <img 
                    src={`https://i.ytimg.com/vi/${currentVideo.videoId}/1.jpg`} 
                    alt={`${currentVideo.channelName} icon`}
                    className={styles.channelIcon}
                  />
                </div>
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{currentVideo.title}</h3>
                <p className={styles.channelName}>{currentVideo.channelName}</p>
              </div>
              <button 
                className={styles.comparisonButton}
                onClick={() => handleCompare('current')}
              >
                This was easier
              </button>
            </div>
          </div>
          
          <button 
            className={styles.equalButton}
            onClick={() => handleCompare('equal')}
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