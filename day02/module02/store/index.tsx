import { create } from "zustand";

type Store = {
  search: string;
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
  setSearch: (search) => set({ search }),
  location: null,
  setLocation: (location) => set({ location }),
  status: "",
  setStatus: (status) => set({ status }),
}));
