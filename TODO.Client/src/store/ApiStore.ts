import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppClient } from "../api";

interface ApiStoreState{
    tokenValidDateTime: Date | null;
    client: AppClient;
    isAuthenticated: boolean;
    token: string | null;
}

interface ApiStoreActions{
    addAuthData(token: string): void;
    logout(): void;
    init(token: string): void;
}

const initialState: ApiStoreState = {
    isAuthenticated: false,
    tokenValidDateTime: null,
    token: "",
    client: new AppClient({
        BASE: "https://localhost:44337"
    }),
  }

export const useApiStore = create<ApiStoreState & ApiStoreActions>()(
    persist(
        (set, get) => ({
            ...initialState,
            addAuthData: (token: string) => {
                const client = get().client;
                client.request.config.TOKEN = token;
                set({
                    client: client,
                    isAuthenticated: true,
                    token: token
                });
            },
            logout: () => {
                set(initialState);
                location.reload();
            },
            init: (token: string) => {
                get().addAuthData(token);
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ 
                token: state.token,
                isAuthenticated: state.isAuthenticated
            })
        })
    );