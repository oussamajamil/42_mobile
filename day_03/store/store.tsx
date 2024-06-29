import { create } from "zustand";
import * as Location from "expo-location";
import { InformationCity, Positions } from "@/utils/types";

type Store = {
  currentPosition: Location.LocationObject | null;
  setCurrentPosition: (currentPosition: Location.LocationObject) => void;
  error: string | null;
  setError: (error: string) => void;
  informationCity: InformationCity | null;
  setInformationCity: (informationCity: InformationCity) => void;
  selectPosition: Positions | null;
  setSelectPosition: (selectPosition: Positions | null) => void;
};

export const useStore = create<Store>((set) => ({
  currentPosition: null,
  setCurrentPosition: (currentPosition: Location.LocationObject) =>
    set({ currentPosition }),
  selectPosition: null,
  setSelectPosition: (selectPosition) => set({ selectPosition }),
  error: null,
  setError: (error) => set({ error }),
  informationCity: null,
  setInformationCity: (informationCity) => set({ informationCity }),
}));
