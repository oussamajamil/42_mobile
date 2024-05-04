import { create } from "zustand";

type Store = {
  position:{
    address:{
    city: string;
    country: string;
    region: string;
    };
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
