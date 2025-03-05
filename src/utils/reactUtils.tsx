import React from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Creates a container element and renders a React component inside it
 * @param Component The React component to render
 * @param props The props to pass to the component
 * @param containerClassName Optional class name for the container element
 * @returns A function to unmount the component
 */
export function renderComponent<P extends object>(
  Component: React.ComponentType<P>,
  props: P,
  containerClassName = 'extension-container'
): () => void {
  // Create container if it doesn't exist
  let container = document.querySelector(`.${containerClassName}`);
  
  if (!container) {
    container = document.createElement('div');
    container.className = containerClassName;
    document.body.appendChild(container);
  }
  
  // Create root and render component
  const root = createRoot(container);
  root.render(<Component {...props} />);
  
  // Return function to unmount component
  return () => {
    root.unmount();
    container?.parentNode?.removeChild(container);
  };
} 