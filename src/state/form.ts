import {create} from 'zustand';

type action = {
  form: {
    [key:string]: any
  },
}

type handler = {
  setForm: (name: string, value: any) => void,
  resetForm: () => void,
}

const handleFormStore = create<action & handler>((set) => ({
    form: {},
    setForm: (name, value) =>
      set((state) => ({
        form: {
          ...state.form,
          [name]: value,
        },
      })),
    resetForm: () => set({form:{}}),
  }));

  export default handleFormStore;
