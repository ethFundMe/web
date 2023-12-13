import { create } from 'zustand';

type ModalOptions = { hideContent: boolean } | null;

type ModalStore = {
  content: React.ReactNode | null;
  options: ModalOptions;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  setModalOptions: (options: ModalOptions) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  content: null,
  options: null,
  openModal: (content) => set(() => ({ content })),
  closeModal: () => set(() => ({ content: null })),

  setModalOptions: (options) => set(() => ({ options })),
}));
