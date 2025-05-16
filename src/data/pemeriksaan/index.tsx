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
    title: 'Formulir Pelayanan Ibu Hamil',
    formId: 1,
    child: [
      {
        name: 'Riwayat Kehamilan Sebelumnya',
        screen: 'RiwayatKehamilanSebelumnya',
      },
      {
        name: 'Riwayat Kehamilan Sekarang',
        screen: 'RiwayatKehamilanSekarang',
      },
      {
        name: 'Pemeriksaan Umum',
        screen: 'PemeriksaanUmum',
      },
      {
        name: 'Pemeriksaan Lab',
        screen: 'PemeriksaanLab',
      },
      {
        name: 'Pengawasan Tablet',
        screen: 'PengawasanObat',
      },
    ],
  },
  {
    id: 2,
    title: 'Formulir Pemeriksaan Bersalin',
    formId: 2,
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
    title: 'Formulir Pemeriksaan Nifas',
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
    title: 'Formulir Pelayanan Bayi',
    formId: 4,
    child: [
      {
        name: 'Pelayanan Bayi',
        screen: 'PelayananBayi',
      },
    ],
  },
  {
    id: 5,
    title: 'Formulir Pelayanan Lainnya',
    formId: 5,
    child: [
      {
        name: 'Pelayanan Lainnya',
        screen: 'PelayananLainnya',
      },
    ],
  },

];

export default dropdownItem;