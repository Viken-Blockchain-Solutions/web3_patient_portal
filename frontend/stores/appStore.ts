import { handleAddContributor } from "../db/contributors";
import { create } from "zustand";

export const userStore = create((set) => ({
  Did: "",
  setDid: async (did: string) => {
    try {
      console.log("addingDID:", did);
      const result = await handleAddContributor(did);
      set(() => ({ Did: did }));
      return result;
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }
}));

export const toastStore = create((set) => ({
  isLoaded: false,
  setIsLoaded: async () => {
    set(() => ({ isLoaded: true }));
    localStorage.setItem('toastLoaded', "true")
  }
}));
