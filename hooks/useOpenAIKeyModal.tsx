import { create } from "zustand";

interface useOpenAIKeyModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useOpenAIKeyModal = create<useOpenAIKeyModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
