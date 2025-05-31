export const jadwalPelayananTime = (jenis_pelayanan: string) => {
  const jadwalLayanan: Record<string, { days: number[], jam: [string, string][] }> = {
    'Baby Spa dan Message': {
      days: [new Date().getDay()], // hanya hari ini
      jam: [
        ['10:00', '11:30'],
        ['13:00', '15:00'],
      ],
    },
    BidanBunda: {
      days: [1, 2, 3, 4, 5], // Senin–Jumat
      jam: [['13:00', '19:00']],
    },
    PemeriksaanHamilNyaman: {
      days: [1, 2, 3, 4, 5], // Senin–Jumat
      jam: [['13:00', '19:00']],
    },
    PemeriksaanHamilNyamanSabtu: {
      days: [6],
      jam: [['10:00', '23:59']],
    },
  };

  const parseJamToDate = (jam: string): Date => {
    const [hour, minute] = jam.split(':').map(Number);
    const now = new Date();
    now.setHours(hour, minute, 0, 0);
    return now;
  };

  const layanan = 'BidanBunda'; // atau dapat dari props
  const now = new Date();
  const hariIni = now.getDay();

  const jadwal = jadwalLayanan[layanan];
  const waktuHariIni = jadwal.days.includes(hariIni)
    ? jadwal.jam.map(([mulai, selesai]) => ({
        start: parseJamToDate(mulai),
        end: parseJamToDate(selesai),
      }))
    : [];

  return {waktuHariIni};
};
