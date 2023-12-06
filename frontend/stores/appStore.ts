import { create } from "zustand";

export const userStore = create((set) => ({
  Did: "",
  setDid: async (did: string) => {
    set(() => ({ Did: did }));    
  }
}));

export const toastStore = create((set) => ({
  isLoaded: false,
  setIsLoaded: async () => {
    set(() => ({ isLoaded: true }));
    localStorage.setItem('toastLoaded', "true")
  }
}));
