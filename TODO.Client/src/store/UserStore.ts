import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AppClient } from "../api/AppClient";

interface UsersState{
    isAuthenticated: boolean;
    token: string | null;
    tokenValidDateTime: Date | null;
    userName: string | null;
}

const useUserStore = create<UsersState>()(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            token: null,
            tokenValidDateTime: null,
            userName: null,
            addAuthData: (token: string, tokenValidDateTime: Date) => set(state => (
                {
                    token: token,
                    tokenValidDateTime: tokenValidDateTime ,
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