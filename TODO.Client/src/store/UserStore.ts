import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UsersState{
    userName: string | null;
}

interface Actions{
    addUser(userName: string): void;
}

const initialState: UsersState = {
    userName: null
}

export const useUserStore = create<UsersState & Actions>()(
    persist(
        (set) => ({
            ...initialState,
            addUser: (userName: string) => set(
                {
                    userName: userName
                }
            )
        }),
        {
            name: 'user-storage'
        })
    );