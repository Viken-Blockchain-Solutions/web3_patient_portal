import { create } from 'zustand'

type userProps = {
    isLoggedin: boolean,
    DID: string,
    Credentials: string[]
}

const initialState: userProps = {
    isLoggedin: false,
    DID: '0',
    Credentials: [],
}

export const userStore = create((set) => ({
    ...initialState,
    setLogin: (logeddin: boolean) => set((state: any) => ({ isLoogedin: logeddin })),
    setDID: (did: string) => set((state: any) => ({ DID: did })),
    setCredentials: (credentials: string[]) => set((state: any) => ({ Credentials: credentials })),

}))

// const appState = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
// }))