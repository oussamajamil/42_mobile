import {create} from "zustand";

type Store = {
  search: string;
  setSearch: (search: string) => void;
  geolocation:string,
  setGeoloaction: (geolocation:string)=>void
};

export const useStore = create<Store>((set, get) => ({
  search: "",
  setSearch: (search) => set({ search }),
  geolocation:"",
  setGeoloaction: (geolocation)=>set({geolocation})
}));
