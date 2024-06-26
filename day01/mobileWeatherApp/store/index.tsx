import {create} from "zustand";

type Store = {
  search: string;
  setSearch: (search: string) => void;
};

export const useStore = create<Store>((set, get) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
