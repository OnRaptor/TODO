import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

interface UsersState{
    isAuthenticated: boolean;
    token: string | null;
    tokenValidDateTime: Date | null;
    userName: string | null;
    addAuthData(token: string): void;
    addUser(userName: string): void;
}

export const useUserStore = create<UsersState>()(
    persist(
        (set) => ({
            isAuthenticated: false,
            token: null,
            tokenValidDateTime: null,
            userName: null,
            addAuthData: (token: string) => set(state => (
                {
                    token: token,
                    tokenValidDateTime: new Date(jwtDecode(token).exp ?? 0),
                    isAuthenticated: true
                }
            )),
            addUser: (userName: string) => set(state => (
                {
                    userName: userName
                }
            ))
        }),
        {
            name: 'auth-storage'
        })
    );