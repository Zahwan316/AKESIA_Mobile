type hphtdata = {
  id: number,
  img: string,
  week: number[],
  description: string,
}

export const HphtData: hphtdata[] = [
  {
    id: 1,
    img: 'week1.png',
    week: [1, 2],
    description: '1. Tubuh ibu sedang bersiap untuk ovulasi (pelepasan sel telur)',
  },
  {
    id: 2,
    img: 'week3.png',
    week: [3, 4],
    description:
      '1. Terjadi pembuahan: sel telur bertemu sperma dan membentuk zigot.\n' +
      '2. Zigot ini mulai membelah dan bergerak menuju rahim untuk menempel (implantasi).\n' +
      '3. Janin sudah menempel di dinding rahim dan mulai tumbuh.\n' +
      '4. Hormon hCG mulai diproduksi, yang membuat hasil tes kehamilan menjadi positif.\n' +
      '5. Ibu mungkin merasakan gejala awal: cepat lelah, payudara nyeri, atau telat haid.',
  },
  {
    id: 3,
    img: 'week5.png',
    week: [5, 6],
    description:
      '1. Jantung janin mulai berdetak dan berkembang sangat cepat.\n' + '\n' +
      '2. Wajah, otak, dan sumsum tulang belakang mulai terbentuk.\n' + '\n' +
      '3. Ibu mungkin mulai merasakan mual, muntah (morning sickness), dan sering buang air kecil.',
  },
  {
    id: 4,
    img: 'week7.png',
    week: [7, 8],
    description:
      '1. Tangan, kaki, dan mata janin mulai tampak.\n' + '\n' +
      '2. Embrio masih sangat kecil, tetapi pertumbuhannya cepat.\n' + '\n' +
      '3. Ibu mulai mengalami perubahan emosi, ngidam, dan perubahan selera makan.\n',
  },
  {
    id: 5,
    img: 'week9.png',
    week: [9],
    description:
      '1. Janin kini sebesar buah anggur besar, sekitar 2-3 cm.\n' + '\n' +
      '2. Bentuk tubuhnya mulai menyerupai bayi.\n' + '\n' +
      '3. Kepala janin masih terlihat besar, tapi leher sudah mulai terbentuk dan kepala bisa sedikit mengangkat.\n' + '\n' +
      '4. Mata janin tertutup kelopak dan akan tetap tertutup hingga bulan ke-6.\n' + '\n' +
      '5. Jari-jari tangan dan kaki sudah terlihat jelas, tidak lagi berselaput.\n' + '\n' +
      '6. Organ penting seperti jantung, otak, hati, ginjal, dan paru-paru terus tumbuh dan mulai bekerja.\n' + '\n' +
      '7. Janin mulai bisa bergerak, tapi gerakannya masih sangat halus, jadi ibu belum bisa merasakannya.\n',
  },
  {
    id: 6,
    img: 'week10.png',
    week: [10],
    description:
      '1. Janin sekarang hampir sebesar buah plum (sekitar 3–4 cm).\n' + '\n' +
      '2. Hampir semua organ tubuh sudah terbentuk, tinggal menyempurnakan fungsi dan bentuknya.\n' + '\n' +
      '3. Tangan dan kaki janin makin aktif, mulai bisa menekuk dan membuka.\n' + '\n' +
      '4. Wajah janin makin jelas, dengan bentuk mulut, telinga, dan hidung yang mulai menonjol.\n' + '\n' +
      '5. Sumsum tulang belakang mulai terbentuk, dan janin mulai membentuk tulang-tulang kecil.\n' + '\n' +
      '6. Jantung berdetak kuat, sekitar 170 kali per menit\n',
  },
  {
    id: 7,
    img: 'week11.png',
    week: [11],
    description:
      '1. Janin sekarang sudah sebesar buah stroberi besar (sekitar 4–5 cm) dan beratnya sekitar 8–10 gram.\n' + '\n' +
      '2. Kepala masih mendominasi tubuh, tapi tubuhnya mulai tumbuh lebih cepat sekarang.\n' + '\n' +
      '3. Kuku kecil mulai tumbuh di ujung jari tangan dan kaki.\n' + '\n' +
      '4. Mulut janin bisa membuka dan menutup, dan ia mulai bisa menelan cairan ketuban.\n',
  },
  {
    id: 8,
    img: 'week11.png',
    week: [12],
    description:
      '1. Ini adalah akhir trimester pertama. Janin sudah sekitar 5–6 cm panjangnya dan beratnya sekitar 14 gram.\n' + '\n' +
      '2. Wajah janin semakin jelas: mata bergeser ke tempat yang benar, telinga terbentuk, dan dagu sudah muncul.\n' + '\n' +
      '3. Otot-otot janin semakin kuat, dan ia bisa melakukan gerakan refleks seperti menendang atau mengepal.\n' + '\n' +
      '4. Plasenta kini mengambil alih tugas memberi makan dan oksigen ke janin.\n',
  },
  {
    id: 10,
    img: 'week11.png',
    week: [13, 14],
    description:
      '1. Selamat, Ibu kini memasuki trimester kedua! Janin di dalam kandungan sedang mengalami pertumbuhan yang sangat cepat.\n' + '\n' +
      '2. Organ-organ dalam janin semakin matang dan beberapa sudah mulai bekerja, misalnya hati, ginjal, dan kandung kemih.\n' + '\n' +
      '3. Wajah janin mulai tampak lebih jelas, dengan bentuk dahi, dagu, dan pipi yang mulai terbentuk.\n' + '\n' +
      '4. Namun, telinganya masih terlihat agak rendah di kepala.\n' + '\n' +
      '5. Janin sudah mulai bisa menghasilkan urine, dan akan membuangnya ke dalam cairan ketuban.\n',
  },
  {
    id: 11,
    img: 'week15.png',
    week: [15, 16],
    description:
      '1. Janin sekarang sudah tumbuh hingga 10–15 cm panjangnya dan beratnya bisa mencapai 113–141 gram — kira-kira sebesar alpukat besar.\n' + '\n' +
      '2. Janin masih terlihat kurus, karena lemak tubuh belum terbentuk sempurna, dan kulitnya masih sangat tipis.\n' + '\n' +
      '3. Beberapa helai rambut halus mulai tumbuh di kepala. Pada janin laki-laki, alat kelamin juga mulai tampak,\n' + '\n' +
      '4. Meski belum selalu bisa terlihat jelas di USG.\n' + '\n' +
      '5. Otot dan tulang semakin kuat, sehingga janin bisa menekuk tangan, menggenggam, atau bahkan menyedot ibu jarinya.\n' + '\n' +
      '6. Mata dan telinga semakin berkembang, dan janin sudah bisa mendengar suara dari luar rahim, meskipun masih samar.\n' + '\n' +
      '7. Sebagian ibu mungkin sudah mulai bisa merasakan gerakan janin pertama kali, terutama jika ini bukan kehamilan pertama.\n' + '\n' +
      '8. Gerakan ini disebut “quickening” dan biasanya terasa seperti gelembung kecil atau sentuhan lembut dari dalam.\n',
  },
  {
    id: 12,
    img: 'week15.png',
    week: [17, 18, 19, 20],
    description:
      '1. Rambut halus bernama lanugo mulai tumbuh dan menyelimuti seluruh tubuh janin. Rambut ini berfungsi untuk melindungi kulit janin yang masih sangat lembut.\n' + '\n' +
      '2. Janin mulai mengalami perkembangan indra dan perlindungan tubuh yang penting.\n' + '\n' +
      '3. Vernix caseosa, yaitu lapisan putih seperti krim yang lembap, mulai terbentuk dan menutupi kulit janin untuk melindunginya dari cairan ketuban.\n' + '\n' +
      '4. Alat kelamin luar janin sudah terbentuk dengan lebih jelas, sehingga bila dilakukan USG, biasanya jenis kelamin janin sudah bisa diketahui.\n' + '\n' +
      '5. Indra-indra janin mulai aktif berkembang: ia mulai belajar mendengar suara dari luar, merasakan sentuhan, bahkan mulai mencium bau dan mengecap rasa.\n' + '\n' +
      '6. Pada usia 20 minggu, janin bisa merasakan rasa makanan dari cairan ketuban.',
  },
  {
    id: 13,
    img: 'week21.png',
    week: [21],
    description:
      '1. Di minggu ini, berat badan janin kini sudah lebih berat dari plasenta. Ukurannya bisa mencapai 340 gram dan panjang sekitar 26 cm — sebesar wortel besar!\n' + '\n' +
      '2. Kelopak mata sudah terbentuk sempurna, meskipun janin masih belum membuka matanya.\n' + '\n' +
      '3. Jika janin perempuan, bagian reproduksi dalam seperti vagina mulai terbentuk dan akan terus berkembang hingga bayi lahir.\n' + '\n' +
      '4. Tubuh janin makin dipenuhi rambut halus lanugo, yang membantu menjaga suhu tubuh bayi saat di dalam kandungan.\n' + '\n' +
      '5. Paru-paru mulai terbentuk dan belajar bernapas, meski belum sempurna.'
  },
  {
    id: 14,
    img: 'week21.png',
    week: [22],
    description:
      '1. Janin kini berat sekitar 453 gram dan panjang sekitar 27 cm — kira-kira sebesar boneka kecil.\n' + '\n' +
      '2. Mata janin mulai terbentuk, namun bagian bawahnya belum memiliki warna (pigmen).\n' + '\n' +
      '3. Sistem pencernaan mulai berfungsi, sehingga janin mulai menelan cairan ketuban sebagai latihan untuk sistem pencernaannya.\n' + '\n' +
      '4. Kuku-kukunya mulai tumbuh, baik di jari tangan maupun kaki.\n' + '\n' +
      '5. Tubuh janin sekarang lebih proporsional, artinya kepala, badan, dan anggota tubuh mulai tampak seimbang — meski janin masih terlihat kurus karena belum banyak lemak.',
  },
  {
    id: 15,
    img: 'week23.png',
    week: [23],
    description:
      '1. Perkembangan indra pendengaran janin sudah semakin matang di minggu ini.\n' + '\n' +
      '2. Janin sudah bisa mendengar suara dari luar, termasuk suara ibu, musik, atau percakapan.\n' + '\n' +
      '3. Ia juga bisa mendengar suara dari dalam rahim, seperti detak jantung ibu dan suara aliran darah.\n' + '\n' +
      '4. Panjang janin sekarang sekitar 28 cm, dan terus bertambah setiap minggunya.\n' + '\n' +
      '5. Gerakan janin makin aktif.',
  },
  {
    id: 16,
    img: 'week23.png',
    week: [24],
    description:
      '1. Di minggu ke-24 ini, janin terus tumbuh dan berkembang semakin kuat. Beratnya sekitar 600 gram dan panjang tubuhnya sekitar 30 cm, hampir sebesar jagung manis besar.\n' + '\n' +
      '2. Kulit janin masih terlihat tipis dan kemerahan, namun sekarang mulai ada lapisan lemak tipis yang membuat tubuhnya mulai tampak lebih bulat.\n' + '\n' +
      '3. Paru-parunya mulai menghasilkan zat penting yang disebut surfaktan. Zat ini akan membantu paru-paru tetap mengembang saat bayi bernapas nanti setelah lahir.\n' + '\n' +
      '4. Cabang-cabang saluran pernapasan sudah mulai terbentuk — ini artinya paru-paru janin sedang mempersiapkan diri untuk bisa bernapas sendiri nanti.\n' + '\n' +
      '5. Otak janin berkembang sangat cepat di minggu ini. Sel-sel otak terus bertambah dan membuat koneksi baru yang akan membantu janin belajar, merasakan, dan mengingat hal-hal sederhana.\n' + '\n' +
      '6. Sidik jari janin mulai terbentuk dengan jelas, ini adalah identitas unik yang tidak dimiliki siapa pun di dunia.\n' + '\n' +
      '7. Organ vital lainnya, seperti hati, ginjal, dan lambung juga semakin matang.',
  },
  {
    id: 16,
    img: 'week23.png',
    week: [25, 26, 27, 28, 29, 30, 31, 32],
    description:
      '1. Janin makin besar dan mulai menyimpan lemak.\n' + '\n' +
      '2. Ibu bisa mengalami nyeri punggung, sulit tidur, dan lebih cepat lelah.\n' + '\n' +
      '3. Janin mulai menetap dalam posisi lahir (kepala ke bawah).',
  },
  {
    id: 17,
    img: 'week33.png',
    week: [33, 34, 35, 36],
    description:
      '1. Janin makin aktif, tapi ruang geraknya mulai sempit.\n' + '\n' +
      '2. Kepala bayi bisa mulai turun ke panggul (engaged).\n' + '\n' +
      '3. Ibu mulai merasa sering kencing karena tekanan janin ke kandung kemih.',
  },
  {
    id: 18,
    img: 'week37.png',
    week: [37, 38, 39, 40],
    description: 
      '1. Janin sudah matang, siap lahir kapan saja.\n' + '\n' +
      '2. Berat bisa mencapai 2,8 – 4 kg, panjang sekitar 48–51 cm.\n' + '\n' +
      '3. Tanda-tanda persalinan meliputi kontraksi teratur, keluar lendir bercampur darah, air ketuban pecah.'
  },
  {
    id: 19,
    img: 'week37.png',
    week: [41, 42],
    description:
      '1. Jika belum melahirkan, ibu akan dipantau lebih sering.\n' + '\n' +
      '2. Dokter/bidan akan periksa jumlah air ketuban dan kondisi plasenta.\n' + '\n' +
      '3. Jika perlu, akan dilakukan induksi persalinan agar bayi lahir dengan aman.',
  },
];



