import { create } from 'zustand';

type action = {
  janinId: number,
  usgId: number,
  usgTitleName: string,
  riwayatKehamilanGroupId: number,
  riwayatKehamilanFotoId: number,
  riwayatKehamilanTitleName: string,
  currJanin: number,
  currUSG: number,
  currKehamilan: number,
  fotoId: number,
  setcurrJanin: (value: number) => void
  setcurrKehamilan: (value: number) => void
  setcurrUSG: (value: number) => void
  setFotoId: (value: number) => void,
  setJaninId: (value: number) => void,
  setUsgId: (value: number) => void,
  setUsgTitleName: (value: string) => void,
  setRiwayatkehamilanGroupId: (value: number) => void,
  setRiwayatkehamilanFotoId: (value: number) => void
  setRiwayatkehamilanTitleName: (value: string) => void
}

const useAlbumFotoStore = create<action>((set) => ({
  janinId: 0,
  usgId: 0,
  usgTitleName: '',
  riwayatKehamilanGroupId: 0,
  riwayatKehamilanFotoId: 0,
  riwayatKehamilanTitleName: '',
  fotoId: 0,
  currJanin: 0,
  currUSG: 0,
  currKehamilan: 0,
  setcurrKehamilan: (value) => set({currKehamilan: value}),
  setcurrJanin: (value) => set(({currJanin: value})),
  setcurrUSG: (value) => set(({currUSG: value})),
  setFotoId: (value) => set(({fotoId: value})),
  setJaninId: (value) => set(({janinId: value})),
  setUsgId: (value) => set(({usgId: value})),
  setUsgTitleName: (value) => set(({usgTitleName: value})),
  setRiwayatkehamilanGroupId: (value) => set(({riwayatKehamilanGroupId: value})),
  setRiwayatkehamilanFotoId: (value) => set(({riwayatKehamilanFotoId: value})),
  setRiwayatkehamilanTitleName: (value) => set(({riwayatKehamilanTitleName: value})),
}));

export default useAlbumFotoStore;
