import { ComparisonModal } from '../components';
import { renderComponent } from '../utils/reactUtils';
import { WatchData } from '../types';

/**
 * Interface for the comparison modal props
 */
export interface ComparisonModalProps {
  currentVideo: WatchData;
  previousVideo: WatchData;
  onCompare: (result: 'current' | 'previous' | 'equal') => void;
}

/**
 * Class to manage the comparison modal
 */
export class ComparisonManager {
  private unmountModal: (() => void) | null = null;

  /**
   * Shows the comparison modal
   * @param props The props for the comparison modal
   */
  public showModal(props?: ComparisonModalProps): void {
    // Unmount any existing modal
    this.hideModal();

    // Render the modal with or without comparison props
    if (props) {
      // Full comparison modal with video data
      this.unmountModal = renderComponent(
        ComparisonModal,
        {
          isOpen: true,
          onClose: () => this.hideModal(),
          currentVideo: props.currentVideo,
          previousVideo: props.previousVideo,
          onCompare: props.onCompare
        },
        'comparison-modal-container'
      );
    } else {
      // Basic modal without comparison data
      this.unmountModal = renderComponent(
        ComparisonModal,
        {
          isOpen: true,
          onClose: () => this.hideModal(),
          // These will be handled by the component's null checks
          currentVideo: undefined,
          previousVideo: undefined,
          onCompare: () => {} // Empty function as fallback
        },
        'comparison-modal-container'
      );
    }
  }

  /**
   * Hides the comparison modal
   */
  public hideModal(): void {
    if (this.unmountModal) {
      this.unmountModal();
      this.unmountModal = null;
    }
  }
}

// Export a singleton instance
export const comparisonManager = new ComparisonManager(); 