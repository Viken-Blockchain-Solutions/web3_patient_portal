import { create } from 'zustand'

export const userStore = create((set) => ({
    Did: '',
    setDid: (did: string) => set(() => ({ Did: did })),
}))
