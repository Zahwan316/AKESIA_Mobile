import { create } from 'zustand';

type action = {
  loading: boolean
  setLoading: (val: boolean) => void
}

const useComponentStore = create<action>((set) => ({
  loading: false,
  setLoading: (val: boolean) => set({ loading: val }),
}));

export default useComponentStore;

