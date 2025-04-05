import { ComparisonModal } from '@/components';
import { renderComponent } from '@/utils/reactUtils';
import { WatchData } from '@/types';
import { ApiResponse, CompareResponse, ComparisonResult } from '@/types/api';

/**
 * Interface for the comparison modal props
 */
export interface ComparisonModalProps {
  currentVideo: WatchData;
  previousVideo: WatchData;
  onCompare: (result: ComparisonResult) => Promise<ApiResponse<CompareResponse>>;
}

/**
 * Class to manage the comparison modal
 */
export class ComparisonModalManager {
  private unmountModal: (() => void) | null = null;

  /**
   * Shows the comparison modal
   * @param props The props for the comparison modal
   */
  public showModal(props: ComparisonModalProps): void {
    // Unmount any existing modal
    this.hideModal();

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

export const comparisonManager = new ComparisonModalManager();
