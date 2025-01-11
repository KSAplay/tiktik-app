import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

interface AuthState {
  userProfile: User | null;
  addUser: (user: User) => void;
  removeUser: () => void;
}

const authStore = (set: (fn: (state: AuthState) => AuthState) => void): AuthState => ({
  userProfile: null,
  addUser: (user: User) => set((state) => ({ ...state, userProfile: user })),
  removeUser: () => set((state) => ({ ...state, userProfile: null })),
});

// Crea el store persistente con Zustand
const useAuthStore = create<AuthState>()(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;