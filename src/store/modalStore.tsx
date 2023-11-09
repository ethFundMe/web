import { create } from 'zustand';

type ModalStore = {
  content: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  content: null,
  openModal: (content) => set(() => ({ content: content })),
  closeModal: () => set(() => ({ content: null })),
}));
