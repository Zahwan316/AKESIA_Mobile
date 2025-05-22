import { create } from 'zustand';

type action = {
  loading: boolean,
  popup: boolean,
  popup_img: string,
  setLoading: (val: boolean) => void
  setPopup: (val: boolean) => void,
  setPopupImg: (val: string) => void
}

const useComponentStore = create<action>((set) => ({
  loading: false,
  popup: false,
  popup_img: '',
  setLoading: (val: boolean) => set({ loading: val }),
  setPopup: (val: boolean) => set({ popup: val }),
  setPopupImg: (val: string) => set({ popup_img: val }),
}));

export default useComponentStore;

