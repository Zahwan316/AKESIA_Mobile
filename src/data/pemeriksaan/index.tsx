type dropdownItemChild = {
  name: string,
  screen: string,
}

type dropdownItem = {
  id: number,
  title: string
  child?: dropdownItemChild[],
  formId: number,
}

const dropdownItem: dropdownItem[] = [
  {
    id: 1,
    title: 'Pemeriksaan Ibu Hamil',
    formId: 2,
    child: [
      {
        name: 'Pemeriksaan Umum',
        screen: 'PemeriksaanUmum',
      },
      {
        name: 'Pemeriksaan Lab',
        screen: 'PemeriksaanLab',
      },
      {
        name: 'Pengawasan Obat',
        screen: 'PengawasanObat',
      },
    ],
  },
  {
    id: 2,
    title: 'Pemeriksaan Bersalin',
    formId: 4,
    child: [
      {
        name: 'Pelayanan Ibu Bersalin',
        screen: 'PelayananIbuBersalin',
      },
      {
        name: 'Bayi Saat Lahir',
        screen: 'BayiSaatLahir',
      },
    ],
  },
  {
    id: 3,
    title: 'Pemeriksaan Nifas',
    formId: 3,
    child: [
      {
        name: 'Pelayanan Ibu Nifas',
        screen: 'PelayananIbuNifas',
      },
      {
        name: 'Kesimpulan Akhir Nifas',
        screen: 'KesimpulanAkhirNifas',
      },
    ],
  },
  {
    id: 4,
    title: 'Pelayan Bayi',
    formId: 1,
    child: [
      {
        name: 'Pelayanan Bayi',
        screen: 'PelayananBayi',
      },
    ],
  },

];

export default dropdownItem; 