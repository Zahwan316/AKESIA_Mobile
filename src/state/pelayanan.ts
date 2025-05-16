import { create } from 'zustand';

type action = {
  pelayananPeriksaHamilId: number,
}

type handler = {
  setPelayananPeriksaHamilId: (value: number) => void,
}

const usePelayananStore = create<action & handler>((set) => ({
  pelayananPeriksaHamilId: 0,
  setPelayananPeriksaHamilId: (value) =>
    set(() => ({
      pelayananPeriksaHamilId: value,
    })),
}));

export default usePelayananStore;
