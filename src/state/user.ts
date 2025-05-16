import {create} from 'zustand';

export type action = {
  user: {
    id: number,
    username: string | null,
    nama_lengkap: string,
    email: string,
    email_verified_at: string | null,
    role: string,
    created_at: string,
    updated_at: string,
    ibu: {
      id: number,
      user_id: number,
      nik: string,
      golongan_darah: string,
      tempat_lahir: string,
      tanggal_lahir: string,
      pendidikan: number,
      pekerjaan: number,
      alamat_domisili: string,
      telepon: string,
      no_registrasi_kohort_ibu: string | null,
      Nama_Keluarga: string | null,
      berat_badan: number | null,
      tinggi_badan: number | null,
      usia_kehamilan: number | null,
      created_at: string,
      updated_at: string
    }
  }
}

type handler = {
  handleUser: (name: string, value: any) => void,
}

const useUserStore = create<action & handler>((set) => ({
  user: null,
  handleUser: (name, value) =>
    set((state) => ({
      user: {
        ...state.user,
        [name]: value,
      },
    })),
  }));

  export default useUserStore;
