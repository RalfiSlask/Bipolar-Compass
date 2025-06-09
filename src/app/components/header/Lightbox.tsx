'use client';

import { createPortal } from 'react-dom';

interface LightboxProps {
  onClose?: () => void;
}

const Lightbox = ({ onClose }: LightboxProps) => {
  if (typeof document === 'undefined') return null; // SSR check

  return createPortal(
    <div
      className="fixed inset-0 bg-black/30"
      onClick={onClose}
      aria-hidden="true"
      style={{ zIndex: 40 }}
    />,
    document.body
  );
};

export default Lightbox;
