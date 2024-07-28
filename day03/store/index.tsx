import { create } from "zustand";

type Store = {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
  position: {
    city: string;
    country: string;
    region: string;
  } | null;
  loadingGlobal: boolean;
  setLoadingGlobal: (loading: boolean) => void;
  setPosition: (position: any) => void;
  search: string;
  error: string | null;
  setError: (error: string | null) => void;
  setSearch: (search: string) => void;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  status: string;
  setStatus: (status: string) => void;
  setLocation: (
    location: { latitude: number; longitude: number } | null
  ) => void;
};

export const useStore = create<Store>((set, get) => ({
  search: "",
  error: null,
  isDark: true,
  setIsDark: (isDark) => set({ isDark }),
  loadingGlobal: false,
  setLoadingGlobal: (loadingGlobal) => set({ loadingGlobal }),
  setError: (error) => set({ error }),
  position: null,
  setPosition: (position) => set({ position }),
  setSearch: (search) => set({ search }),
  location: null,
  setLocation: (location) => set({ location }),
  status: "",
  setStatus: (status) => set({ status }),
}));
