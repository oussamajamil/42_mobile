import { User } from "firebase/auth";
import { create } from "zustand";

type Store = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isAuthenticated: boolean | undefined;
  setIsAuthenticated: (isAuthenticated: boolean | undefined) => void;
};

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  isAuthenticated: undefined,
  setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
