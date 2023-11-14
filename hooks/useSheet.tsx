import { create } from "zustand";

interface useSheetInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSheet = create<useSheetInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
