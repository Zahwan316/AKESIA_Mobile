import { JSX } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { MAIN_COLOR } from "../../../constants/color";

const PrivacyPolicySection = (): JSX.Element => {
  return(
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={Style.mainContainer}>
          <View style={Style.headerContainer}>
            <Text style={{fontSize: 24, fontWeight: 'bold', color: '#fff'}}>Kebijakan dan Privasi</Text>
          </View>
          <ScrollView style={Style.contentContainer}>
            <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Kebijakan Privasi</Text>
            <Text style={Style.subJudul}>Terakhir diperbarui: 10 Juni 2025</Text>
            <Text style={Style.judul}>Kebijakan Privasi ini</Text>
            <Text style={Style.text}>menjelaskan kebijakan dan prosedur Kami mengenai pengumpulan, penggunaan, dan pengungkapan informasi Anda saat Anda menggunakan Layanan dan memberi tahu Anda tentang hak privasi Anda dan bagaimana hukum melindungi Anda. Kami menggunakan Data Pribadi Anda untuk menyediakan dan meningkatkan Layanan. Dengan menggunakan Layanan, Anda menyetujui pengumpulan dan penggunaan informasi sesuai dengan Kebijakan Privasi ini. Kebijakan Privasi ini dibuat dengan bantuan Pembuat Kebijakan Privasi.</Text>
            <Text style={Style.judul}>Interpretasi dan Definisi</Text>
            <Text style={Style.subJudul}>Interpretasi</Text>
            <Text style={Style.text}>Kata-kata yang huruf awalnya diawali dengan huruf kapital memiliki makna yang ditetapkan berdasarkan ketentuan berikut. Definisi berikut akan memiliki makna yang sama terlepas dari apakah kata-kata tersebut muncul dalam bentuk tunggal atau jamak.</Text>
            <Text style={Style.subJudul}>Definisi</Text>
            <Text style={Style.text}>Untuk tujuan Kebijakan Privasi ini:</Text>
            <Text style={Style.text}>Akun berarti akun unik yang dibuat bagi Anda untuk mengakses Layanan kami atau bagian Layanan kami.</Text>
            <Text style={Style.text}>Afiliasi berarti suatu badan usaha yang mengendalikan, dikendalikan oleh, atau berada di bawah pengendalian bersama dengan suatu pihak, di mana "kendali" berarti kepemilikan 50% atau lebih saham, kepentingan ekuitas, atau sekuritas lain yang berhak memberikan suara dalam pemilihan direktur atau otoritas pengelola lainnya.</Text>
            <Text style={Style.text}>Aplikasi mengacu pada AKESIA, program perangkat lunak yang disediakan oleh Perusahaan.</Text>
            <Text style={Style.text}>Perusahaan (disebut sebagai "Perusahaan", "Kami", "Kami" atau "Milik Kami" dalam Perjanjian ini) mengacu pada Politeknik Negeri Jember, Jl. Mastrip, Krajan Timur, Sumbersari, Kec. Sumbersari, Kabupaten Jember, Jawa Timur.</Text>
            <Text style={Style.text}>Negara mengacu pada: Indonesia</Text>
            <Text style={Style.text}>Perangkat berarti perangkat apa pun yang dapat mengakses Layanan seperti komputer, ponsel, atau tablet digital.</Text>
            <Text style={Style.text}>Data Pribadi adalah informasi apa pun yang terkait dengan individu yang teridentifikasi atau dapat diidentifikasi.</Text>
            <Text style={Style.text}>Melayani mengacu pada Aplikasi.</Text>
            <Text style={Style.text}>Penyedia Layanan berarti setiap orang atau badan hukum yang memproses data atas nama Perusahaan. Ini merujuk pada perusahaan atau individu pihak ketiga yang dipekerjakan oleh Perusahaan untuk memfasilitasi Layanan, menyediakan Layanan atas nama Perusahaan, melakukan layanan yang terkait dengan Layanan, atau membantu Perusahaan dalam menganalisis cara penggunaan Layanan.</Text>
            <Text style={Style.text}>Data Penggunaan merujuk pada data yang dikumpulkan secara otomatis, baik yang dihasilkan oleh penggunaan Layanan atau dari infrastruktur Layanan itu sendiri (misalnya, durasi kunjungan halaman).</Text>
            <Text style={Style.text}>Anda berarti individu yang mengakses atau menggunakan Layanan, atau perusahaan, atau badan hukum lain yang atas namanya individu tersebut mengakses atau menggunakan Layanan, sebagaimana berlaku.</Text>
            <Text style={Style.judul}>Pengumpulan dan Penggunaan Data Pribadi Anda</Text>
            <Text style={Style.subJudul}>Jenis Data yang Dikumpulkan</Text>
            <Text style={Style.text}>Data Pribadi</Text>
            <Text style={Style.text}>Saat menggunakan Layanan Kami, Kami mungkin meminta Anda untuk memberikan Kami informasi pengenal pribadi tertentu yang dapat digunakan untuk menghubungi atau mengidentifikasi Anda. Informasi pengenal pribadi dapat mencakup, tetapi tidak terbatas pada:</Text>
            <Text style={Style.text}>Alamat email</Text>
            <Text style={Style.text}>Nama depan dan nama belakang</Text>
            <Text style={Style.text}>Nomor telepon</Text>
            <Text style={Style.text}>Alamat, Negara Bagian, Provinsi, Kode Pos, Kota</Text>
            <Text style={Style.judul}>Data Penggunaan</Text>
            <Text style={Style.subJudul}>Data Penggunaan dikumpulkan secara otomatis saat menggunakan Layanan.</Text>
            <Text style={Style.text}>Data Penggunaan dapat mencakup informasi seperti alamat Protokol Internet Perangkat Anda (misalnya alamat IP), jenis browser, versi browser, halaman Layanan kami yang Anda kunjungi, waktu dan tanggal kunjungan Anda, waktu yang dihabiskan di halaman tersebut, pengenal perangkat unik, dan data diagnostik lainnya.</Text>
            <Text style={Style.text}>Saat Anda mengakses Layanan melalui perangkat seluler, Kami dapat mengumpulkan informasi tertentu secara otomatis, termasuk, namun tidak terbatas pada, jenis perangkat seluler yang Anda gunakan, ID unik perangkat seluler Anda, alamat IP perangkat seluler Anda, sistem operasi seluler Anda, jenis browser internet seluler yang Anda gunakan, pengenal perangkat unik, dan data diagnostik lainnya.</Text>
            <Text style={Style.text}>Kami juga dapat mengumpulkan informasi yang dikirimkan browser Anda setiap kali Anda mengunjungi Layanan kami atau ketika Anda mengakses Layanan melalui perangkat seluler.</Text>

            <Text style={Style.judul}>Informasi yang Dikumpulkan saat Menggunakan Aplikasi</Text>
            <Text style={Style.subJudul}>Saat menggunakan Aplikasi Kami, untuk menyediakan fitur-fitur Aplikasi Kami, Kami dapat mengumpulkan, dengan izin Anda sebelumnya:</Text>
            <Text style={Style.text}>Gambar dan informasi lainnya dari kamera dan perpustakaan foto Perangkat Anda</Text>
            <Text style={Style.text}>Kami menggunakan informasi ini untuk menyediakan fitur Layanan Kami, untuk meningkatkan dan menyesuaikan Layanan Kami. Informasi tersebut dapat diunggah ke server Perusahaan dan/atau server Penyedia Layanan atau dapat disimpan di perangkat Anda.</Text>
            <Text style={Style.text}>Anda dapat mengaktifkan atau menonaktifkan akses ke informasi ini kapan saja, melalui pengaturan Perangkat Anda.</Text>

            <Text style={Style.judul}>Penggunaan Data Pribadi Anda</Text>
            <Text style={Style.subJudul}>Perusahaan dapat menggunakan Data Pribadi untuk tujuan berikut:</Text>
            <Text style={Style.text}>Untuk menyediakan dan memelihara Layanan kami, termasuk untuk memantau penggunaan Layanan kami.</Text>
            <Text style={Style.text}>Untuk mengelola Akun Anda: untuk mengelola pendaftaran Anda sebagai pengguna Layanan. Data Pribadi yang Anda berikan dapat memberi Anda akses ke berbagai fungsi Layanan yang tersedia bagi Anda sebagai pengguna terdaftar.</Text>
            <Text style={Style.text}>Untuk pelaksanaan kontrak: pengembangan, kepatuhan, dan pelaksanaan kontrak pembelian untuk produk, barang, atau layanan yang telah Anda beli atau kontrak lainnya dengan Kami melalui Layanan.</Text>
            <Text style={Style.text}>Untuk menghubungi Anda: Untuk menghubungi Anda melalui email, panggilan telepon, SMS, atau bentuk komunikasi elektronik setara lainnya, seperti pemberitahuan push aplikasi seluler mengenai pembaruan atau komunikasi informatif terkait dengan fungsionalitas, produk atau layanan yang dikontrak, termasuk pembaruan keamanan, jika diperlukan atau wajar untuk penerapannya.</Text>
            <Text style={Style.text}>Untuk menyediakan Anda dengan berita, penawaran khusus, dan informasi umum tentang barang, layanan, dan acara lain yang kami tawarkan yang serupa dengan yang telah Anda beli atau tanyakan kecuali Anda telah memilih untuk tidak menerima informasi tersebut.</Text>
            <Text style={Style.text}>Untuk mengelola permintaan Anda: Untuk menghadiri dan mengelola permintaan Anda kepada Kami.</Text>
            <Text style={Style.text}>Untuk transfer bisnis: Kami dapat menggunakan Informasi Anda untuk mengevaluasi atau melakukan penggabungan, divestasi, restrukturisasi, reorganisasi, pembubaran, atau penjualan atau pengalihan lain atas beberapa atau semua aset Kami, baik sebagai usaha yang masih berjalan atau sebagai bagian dari kebangkrutan, likuidasi, atau proses serupa, di mana Data Pribadi yang Kami miliki tentang pengguna Layanan kami termasuk ke dalam aset yang dialihkan.</Text>
            <Text style={Style.text}>Untuk tujuan lain: Kami dapat menggunakan Informasi Anda untuk tujuan lain, seperti analisis data, mengidentifikasi tren penggunaan, menentukan efektivitas kampanye promosi kami, dan untuk mengevaluasi serta meningkatkan Layanan, produk, layanan, pemasaran, dan pengalaman Anda.</Text>

            <Text style={Style.judul}>Berbagi Informasi Pribadi Anda</Text>
            <Text style={Style.subJudul}>Kami dapat membagikan informasi pribadi Anda dalam situasi berikut:</Text>
            <Text style={Style.text}>Dengan Penyedia Layanan: Kami dapat membagikan informasi pribadi Anda dengan Penyedia Layanan untuk memantau dan menganalisis penggunaan Layanan kami, untuk menghubungi Anda.</Text>
            <Text style={Style.text}>Untuk transfer bisnis: Kami dapat membagikan atau mentransfer informasi pribadi Anda sehubungan dengan, atau selama negosiasi, penggabungan, penjualan aset Perusahaan, pembiayaan, atau akuisisi semua atau sebagian bisnis Kami ke perusahaan lain.</Text>
            <Text style={Style.text}>Dengan Afiliasi: Kami dapat membagikan informasi Anda dengan afiliasi Kami, dan dalam hal ini kami akan meminta afiliasi tersebut untuk mematuhi Kebijakan Privasi ini. Afiliasi meliputi perusahaan induk Kami dan anak perusahaan lainnya, mitra usaha patungan, atau perusahaan lain yang Kami kendalikan atau yang berada di bawah kendali bersama Kami.</Text>
            <Text style={Style.text}>Dengan mitra bisnis: Kami dapat membagikan informasi Anda dengan mitra bisnis Kami untuk menawarkan Anda produk, layanan, atau promosi tertentu.</Text>
            <Text style={Style.text}>Dengan pengguna lain: Ketika Anda membagikan informasi pribadi atau berinteraksi dengan pengguna lain di area publik, informasi tersebut dapat dilihat oleh semua pengguna dan dapat didistribusikan ke publik di luar.</Text>
            <Text style={Style.text}>Dengan persetujuan Anda: Kami dapat mengungkapkan informasi pribadi Anda untuk tujuan lain dengan persetujuan Anda.</Text>

            <Text style={Style.judul}>Penyimpanan Data Pribadi Anda</Text>
            <Text style={Style.subJudul}>Perusahaan akan menyimpan Data Pribadi Anda hanya selama diperlukan untuk tujuan yang ditetapkan dalam Kebijakan Privasi ini. Kami akan menyimpan dan menggunakan Data Pribadi Anda sejauh yang diperlukan untuk mematuhi kewajiban hukum kami (misalnya, jika kami diharuskan menyimpan data Anda untuk mematuhi hukum yang berlaku), menyelesaikan perselisihan, dan menegakkan perjanjian dan kebijakan hukum kami.</Text>
            <Text style={Style.subJudul}>Perusahaan juga akan menyimpan Data Penggunaan untuk keperluan analisis internal. Data Penggunaan umumnya disimpan untuk jangka waktu yang lebih pendek, kecuali jika data ini digunakan untuk memperkuat keamanan atau meningkatkan fungsionalitas Layanan Kami, atau Kami secara hukum diwajibkan untuk menyimpan data ini untuk jangka waktu yang lebih lama.</Text>
            <Text style={Style.judul}>Informasi Anda</Text>
            <Text style={Style.text}>Termasuk Data Pribadi, diproses di kantor operasional Perusahaan dan di tempat lain tempat pihak yang terlibat dalam pemrosesan berada. Artinya, informasi ini dapat ditransfer ke — dan disimpan di — komputer yang berlokasi di luar negara bagian, provinsi, negara, atau yurisdiksi pemerintahan Anda yang undang-undang perlindungan datanya mungkin berbeda dari yurisdiksi Anda.</Text>
            <Text style={Style.text}>Persetujuan Anda terhadap Kebijakan Privasi ini diikuti dengan penyerahan informasi tersebut merupakan persetujuan Anda terhadap pengalihan tersebut.</Text>
            <Text style={Style.text}>Perusahaan akan mengambil semua langkah yang diperlukan secara wajar untuk memastikan bahwa data Anda diperlakukan dengan aman dan sesuai dengan Kebijakan Privasi ini dan tidak ada pengalihan Data Pribadi Anda yang akan dilakukan ke organisasi atau negara mana pun kecuali ada kontrol yang memadai termasuk keamanan data Anda dan informasi pribadi lainnya.</Text>

            <Text style={Style.judul}>Hapus Data Pribadi Anda</Text>
            <Text style={Style.text}>Anda memiliki hak untuk menghapus atau meminta Kami membantu menghapus Data Pribadi yang telah Kami kumpulkan tentang Anda.</Text>
            <Text style={Style.text}>Layanan kami dapat memberi Anda kemampuan untuk menghapus informasi tertentu tentang Anda dari dalam Layanan.</Text>
            <Text style={Style.text}>Anda dapat memperbarui, mengubah, atau menghapus informasi Anda kapan saja dengan masuk ke Akun Anda, jika Anda memilikinya, dan mengunjungi bagian pengaturan akun yang memungkinkan Anda mengelola informasi pribadi Anda. Anda juga dapat menghubungi Kami untuk meminta akses, memperbaiki, atau menghapus informasi pribadi apa pun yang telah Anda berikan kepada Kami.</Text>
            <Text style={Style.text}>Namun, perlu dicatat bahwa Kami mungkin perlu menyimpan informasi tertentu apabila Kami memiliki kewajiban hukum atau dasar hukum untuk melakukannya.</Text>

            <Text style={Style.judul}>Pengungkapan Data Pribadi Anda</Text>
            <Text style={Style.subJudul}>Transaksi Bisnis</Text>
            <Text style={Style.text}>Jika Perusahaan terlibat dalam penggabungan, akuisisi, atau penjualan aset, Data Pribadi Anda dapat ditransfer. Kami akan memberikan pemberitahuan sebelum Data Pribadi Anda ditransfer dan menjadi subjek Kebijakan Privasi yang berbeda.</Text>

            <Text style={Style.subJudul}>Penegakan hukum</Text>
            <Text style={Style.text}>Dalam keadaan tertentu, Perusahaan mungkin diharuskan untuk mengungkapkan Data Pribadi Anda jika diharuskan oleh hukum atau sebagai tanggapan atas permintaan yang sah oleh otoritas publik (misalnya pengadilan atau lembaga pemerintah).</Text>

            <Text style={Style.subJudul}>Persyaratan hukum lainnya</Text>
            <Text style={Style.text}>Perusahaan dapat mengungkapkan Data Pribadi Anda dengan keyakinan yang itikad baik bahwa tindakan tersebut diperlukan untuk:</Text>
            <Text style={Style.text}>Mematuhi kewajiban hukum</Text>
            <Text style={Style.text}>Melindungi dan mempertahankan hak atau properti Perusahaan</Text>
            <Text style={Style.text}>Mencegah atau menyelidiki kemungkinan kesalahan sehubungan dengan Layanan</Text>
            <Text style={Style.text}>Melindungi keselamatan pribadi Pengguna Layanan atau masyarakat umum</Text>
            <Text style={Style.text}>Melindungi dari tanggung jawab hukum</Text>

            <Text style={Style.judul}>Keamanan Data Pribadi Anda</Text>
            <Text style={Style.text}>Keamanan Data Pribadi Anda penting bagi Kami, tetapi ingatlah bahwa tidak ada metode transmisi melalui Internet, atau metode penyimpanan elektronik yang 100% aman. Meskipun Kami berupaya menggunakan cara yang dapat diterima secara komersial untuk melindungi Data Pribadi Anda, Kami tidak dapat menjamin keamanannya secara mutlak.</Text>
            <Text style={Style.subJudul}>Privasi Anak</Text>
            <Text style={Style.text}>Layanan kami tidak ditujukan untuk siapa pun yang berusia di bawah 13 tahun. Kami tidak dengan sengaja mengumpulkan informasi identitas pribadi dari siapa pun yang berusia di bawah 13 tahun. Jika Anda adalah orang tua atau wali dan Anda mengetahui bahwa anak Anda telah memberikan Data Pribadi kepada Kami, silakan hubungi Kami. Jika Kami mengetahui bahwa Kami telah mengumpulkan Data Pribadi dari siapa pun yang berusia di bawah 13 tahun tanpa verifikasi persetujuan orang tua, Kami mengambil langkah-langkah untuk menghapus informasi tersebut dari server Kami.</Text>
            <Text style={Style.text}>Jika Kami perlu mengandalkan persetujuan sebagai dasar hukum untuk memproses informasi Anda dan negara Anda mengharuskan persetujuan dari orang tua, Kami mungkin memerlukan persetujuan orang tua Anda sebelum Kami mengumpulkan dan menggunakan informasi tersebut.</Text>

            <Text style={Style.subJudul}>Tautan ke Situs Web Lain</Text>
            <Text style={Style.text}>Layanan kami mungkin berisi tautan ke situs web lain yang tidak dioperasikan oleh kami. Jika Anda mengeklik tautan pihak ketiga, Anda akan diarahkan ke situs pihak ketiga tersebut. Kami sangat menyarankan Anda untuk meninjau Kebijakan Privasi setiap situs yang Anda kunjungi.</Text>
            <Text style={Style.text}>Kami tidak memiliki kendali atas dan tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs atau layanan pihak ketiga mana pun.</Text>

            <Text style={Style.subJudul}>Perubahan pada Kebijakan Privasi ini</Text>
            <Text style={Style.text}>Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan mengeposkan Kebijakan Privasi baru di halaman ini.</Text>
            <Text style={Style.text}>Kami akan memberi tahu Anda melalui email dan/atau pemberitahuan yang menonjol pada Layanan Kami, sebelum perubahan berlaku efektif dan memperbarui tanggal "Terakhir diperbarui" di bagian atas Kebijakan Privasi ini.</Text>
            <Text style={Style.text}>Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala untuk mengetahui perubahan apa pun. Perubahan pada Kebijakan Privasi ini berlaku efektif setelah dipublikasikan di halaman ini.</Text>

            <Text style={Style.subJudul}>Hubungi Kami</Text>
            <Text style={Style.text}>Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, Anda dapat menghubungi kami:</Text>
            <Text style={Style.text}>Melalui email: workshoppolije1@gmail.com</Text>
            <Text style={Style.text}>Dengan mengunjungi halaman ini di situs web kami: https://akesia.my.id/login</Text>
          </ScrollView>
          <View style={Style.bottomContainer}></View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const Style = StyleSheet.create({
  mainContainer: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
  },
  headerContainer: {
    width: '100%',
    height: verticalScale(160),
    backgroundColor: MAIN_COLOR,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    padding: 12,
  },
  contentContainer: {
    width: '100%',
    height: verticalScale(220),
    padding: 12,
  },
  bottomContainer: {
    width: '100%',
    height: verticalScale(60),
  },
  judul: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subJudul: {
    fontSize: 18,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'justify',
  },
});

export default PrivacyPolicySection;
