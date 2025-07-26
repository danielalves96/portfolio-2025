'use client';

import { useState } from 'react';

interface UseModalProps<T = unknown> {
  defaultData?: T | null;
}

interface UseModalReturn<T = unknown> {
  isOpen: boolean;
  data: T | null;
  openModal: (data?: T) => void;
  closeModal: () => void;
  setData: (data: T | null) => void;
}

export function useModal<T = unknown>({
  defaultData = null,
}: UseModalProps<T> = {}): UseModalReturn<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | null>(defaultData);

  const openModal = (modalData?: T) => {
    if (modalData !== undefined) {
      setData(modalData);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // Reset data when closing modal
    setTimeout(() => {
      setData(defaultData);
    }, 200); // Small delay to prevent visual glitch
  };

  return {
    isOpen,
    data,
    openModal,
    closeModal,
    setData,
  };
}
