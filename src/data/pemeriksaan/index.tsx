type dropdownItemChild = {
  name: string,
  screen: string,
}

type dropdownItem = {
  id: number,
  title: string
  child?: dropdownItemChild[]
}

const dropdownItem: dropdownItem[] = [
  {
    id: 1,
    title: 'Pemeriksaan Ibu Hamil',
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
    child: [
      {
        name: 'Pelayanan Bayi',
        screen: 'PelayananBayi',
      },
    ],
  },

];

export default dropdownItem; 