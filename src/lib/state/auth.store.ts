import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type AuthState = {
    name?: string,
    token?: string
}

type AuthAction = {
    setName: (name: AuthState['name']) => void,
    setToken: (name: AuthState['token']) => void
    clearState: () => void
}

const initialState: AuthState = {
    name: undefined,
    token: undefined,
}

type State = AuthState & AuthAction

export const useAuthStore = create(persist<State>((set) => ({
    ...initialState,
    setName: name => set(() => ({ name })),
    setToken: token => set(() => ({ token })),
    clearState: () => set(initialState)
}), { name: 'auth-storage', storage: createJSONStorage(() => localStorage) }))