import { create } from "zustand";

interface usePremiumModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePremiumModal = create<usePremiumModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
