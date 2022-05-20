import create from "zustand";

export const useStore = create((set, get) => ({
  modal: "",
  setModal: (modalName) => {
    set((store) => ({
      modal: modalName,
    }));
  },
}));
