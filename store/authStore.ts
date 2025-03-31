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
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Error al obtener los usuarios');
      }
      const data = await response.json();
      set((state) => ({ ...state, allUsers: data }));
    } catch (error) {
      console.error('Error en fetchAllUsers:', error);
      set((state) => ({ ...state, allUsers: [] }));
    }
  }
});



// Crea el store persistente con Zustand
const useAuthStore = create<AuthState>()(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;