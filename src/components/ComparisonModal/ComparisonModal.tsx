import React, { useState } from 'react';
import styles from './ComparisonModal.module.scss';
import { WatchData } from '../../types';
import { ComparisonResult, ApiResponse, CompareResponse } from '@/types/api';
import { X } from 'lucide-react';
import { ComparisonView } from './ComparisonView';
import { ThankYouView } from './ThankYouView';

interface ComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVideo?: WatchData;
  previousVideo?: WatchData;
  onCompare: (result: ComparisonResult) => Promise<ApiResponse<CompareResponse>>;
}

enum ModalStage {
  COMPARISON = 'comparison',
  THANK_YOU = 'thank_you'
}

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  isOpen,
  onClose,
  currentVideo,
  previousVideo,
  onCompare
}) => {
  const [modalStage, setModalStage] = useState<ModalStage>(ModalStage.COMPARISON);

  if (!isOpen || !currentVideo || !previousVideo) return null;

  const handleCompare = async (result: ComparisonResult) => {
    const response = await onCompare(result);
    console.log(response);
    setModalStage(ModalStage.THANK_YOU);
  };

  const handleClose = () => {
    setModalStage(ModalStage.COMPARISON);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          <X className={styles.closeIcon} size={24} />
        </button>

        {modalStage === ModalStage.COMPARISON ? (
          <ComparisonView
            currentVideo={currentVideo}
            previousVideo={previousVideo}
            onCompare={handleCompare}
          />
        ) : (
          <ThankYouView onClose={handleClose} />
        )}
      </div>
    </div>
  );
};

export default ComparisonModal;
