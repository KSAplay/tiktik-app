import { IUser } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userProfile: IUser | null;
  addUser: (user: IUser) => void;
  removeUser: () => void;
}

const authStore = (set: (fn: (state: AuthState) => AuthState) => void): AuthState => ({
  userProfile: null,
  addUser: (user: IUser) => set((state) => ({ ...state, userProfile: user })),
  removeUser: () => set((state) => ({ ...state, userProfile: null })),
});

// Crea el store persistente con Zustand
const useAuthStore = create<AuthState>()(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;