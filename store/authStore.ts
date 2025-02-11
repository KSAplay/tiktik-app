import { IUser } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  userProfile: IUser | null;
  allUsers: IUser[] | [];
  addUser: (user: IUser) => void;
  removeUser: () => void;
  fetchAllUsers: () => void;
}

const authStore = (set: (fn: (state: AuthState) => AuthState) => void): AuthState => ({
  userProfile: null,
  allUsers: [],
  addUser: (user: IUser) => set((state) => ({ ...state, userProfile: user })),
  removeUser: () => set((state) => ({ ...state, userProfile: null })),
  fetchAllUsers: async () => {
    const response = await fetch('/api/users');
    const data = await response.json();
    set((state) => ({ ...state, allUsers: data }));
  }
});



// Crea el store persistente con Zustand
const useAuthStore = create<AuthState>()(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;