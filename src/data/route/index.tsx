import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import CompleteProfileBidanScreen from '../../screen/CompleteProfileBidan';
import CompleteProfileOrangTuaScreen from '../../screen/CompleteProfileOrangTua';
import HomeScreen from '../../screen/Home';
import LandingScreen from '../../screen/Landing';
import LoginScreen from '../../screen/Login';
import PemeriksaanScreen from '../../screen/pemeriksaan';
import PemeriksaanUmumScreen from '../../screen/pemeriksaan/pemeriksaan_ibu/pemeriksaan_umum';
import PemeriksaanLabScreen from '../../screen/pemeriksaan/pemeriksaan_ibu/pemeriksaan_lab';
import PengawasanObatScreen from '../../screen/pemeriksaan/pemeriksaan_ibu/pengawasanobat';
import PelayananIbuBersalinScreen from '../../screen/pemeriksaan/pelayanan_bersalin/pelayananibubersalin';
import BayiSaatLahirScreen from '../../screen/pemeriksaan/pelayanan_bersalin/bayisaatlahir';
import PelayananIbuNifasScreen from '../../screen/pemeriksaan/pelayanan_nifas/pelayananibunifas';
import KesimpulanAkhirNifasScreen from '../../screen/pemeriksaan/pelayanan_nifas/kesimpulanakhirnifas';
import RiwayatKehamilanSebelumnyaScreen from '../../screen/pemeriksaan/formulir_pemeriksaan/riwayat_kehamilan_sebelumnya';
import RiwayatKehamilanSekarangScreen from '../../screen/pemeriksaan/formulir_pemeriksaan/riwayat_kehamilan_sekarang';
import PelayananBayiScreen from '../../screen/pemeriksaan/pelayanan_bayi';
import TambahAnakScreen from '../../screen/Tambah_Anak';
import JanjiKitaScreen from '../../screen/JanjiKita';
import BuatJanjiScreen from '../../screen/BuatJanji';
import BuatJanjiDetailScreen from '../../screen/BuatJanjiDetail';
import PemesananJanjiScreen from '../../screen/PemesananJanji';
import SplashScreen from '../../screen/SplashScreen';
import ProfileScreen from '../../screen/Profile';
import ListJanjiScreen from '../../screen/ListJanji';
import NotificationScreen from '../../screen/Notification';
import Icon from 'react-native-vector-icons/Feather';
import IconBrand from 'react-native-vector-icons/FontAwesome5'
import PelayananLainnyaScreen from '../../screen/pemeriksaan/pelayanan_lainnya';
import BeratMamaScreen from '../../screen/BeratMama';
import DataIbuScreen from '../../screen/DataIbu';
import AlbumFotoScreen from '../../screen/album_foto';
import AlbumFotoJaninScreen from '../../screen/album_foto/AlbumFotoJanin';
import AlbumFotoUsgScreen from '../../screen/album_foto/AlbumFotoUsg';
import AlbumFotoFormScreen from '../../screen/album_foto/AlbumFotoForm';
import RiwayatKehamilanGroupScreen from '../../screen/riwayat_kehamilan_foto/RiwayatKehamilanGroup';
import RiwayatKehamilanFotoScreen from '../../screen/riwayat_kehamilan_foto';
import RiwayatKehamilanFormScreen from '../../screen/riwayat_kehamilan_foto/RiwayatKehamilanForm';
import { openWhatsApp } from '../../function/whatsapp';
import HphtScreen from '../../screen/Hpht';
import HphtDetailScreen from '../../screen/HphtDetail';
import PrivacyPolicyScreen from '../../screen/PrivacyPolicy';

type routesType = {
  name: string,
  component: () => React.JSX.Element,
  options: BottomTabNavigationOptions,
  listeners?: any,
}

const routes: routesType[] = [
  {
    name: 'Landing',
    component: LandingScreen,
    options: {
      headerShown: false,
      tabBarButton: () => null,
      tabBarStyle: { display: 'none' },
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      headerShown: false,
      tabBarButton: () => null,
      tabBarStyle: { display: 'none' },
    },
  },
  {
    name: 'ProfileOrangTua',
    component: CompleteProfileOrangTuaScreen,
    options: {
      headerShown: false,
      tabBarButton: () => null,
      tabBarStyle: { display: 'none' },
    },
  },
  {
    name: 'ProfileBidan',
    component: CompleteProfileBidanScreen,
    options: {
      headerShown: false,
      tabBarButton: () => null,
      tabBarStyle: { display: 'none' },
    },
  },
  {
    name: 'Pemeriksaan',
    component: PemeriksaanScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'PemeriksaanUmum',
    component: PemeriksaanUmumScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'PemeriksaanLab',
    component: PemeriksaanLabScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'PengawasanObat',
    component: PengawasanObatScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'BayiSaatLahir',
    component: BayiSaatLahirScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'PelayananIbuBersalin',
    component: PelayananIbuBersalinScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'PelayananIbuNifas',
    component: PelayananIbuNifasScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'KesimpulanAkhirNifas',
    component: KesimpulanAkhirNifasScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'RiwayatKehamilanSebelumnya',
    component: RiwayatKehamilanSebelumnyaScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'RiwayatKehamilanSekarang',
    component: RiwayatKehamilanSekarangScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'PelayananBayi',
    component: PelayananBayiScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'TambahAnak',
    component: TambahAnakScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'JanjiKita',
    component: JanjiKitaScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'BuatJanji',
    component: BuatJanjiScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'BuatJanjiDetail',
    component: BuatJanjiDetailScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'PemesananJanji',
    component: PemesananJanjiScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'SplashScreen',
    component: SplashScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'ListJanji',
    component: ListJanjiScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'PelayananLainnya',
    component: PelayananLainnyaScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'Notifikasi',
    component: NotificationScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'BeratMama',
    component: BeratMamaScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'DataIbu',
    component: DataIbuScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'AlbumFoto',
    component: AlbumFotoScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'AlbumFotoJanin',
    component: AlbumFotoJaninScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'AlbumFotoUsg',
    component: AlbumFotoUsgScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'AlbumFotoForm',
    component: AlbumFotoFormScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'RiwayatKehamilanGroup',
    component: RiwayatKehamilanGroupScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'RiwayatKehamilanFoto',
    component: RiwayatKehamilanFotoScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'RiwayatKehamilanForm',
    component: RiwayatKehamilanFormScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'Hpht',
    component: HphtScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'HphtDetail',
    component: HphtDetailScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
  {
    name: 'PrivacyPolicy',
    component: PrivacyPolicyScreen,
    options: {
      headerShown: false,
      tabBarStyle: { display: 'none' },
      tabBarButton: () => null,
    },
  },
];

export const routesBottom: routesType[] = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {
      headerShown: false,
      tabBarIcon: ({}) => (
      <Icon name="home" size={22} color="#202020"/>
      ),
    },
  },
  {
    name: 'Whatsapp Kami',
    component: HomeScreen,
    listeners: {
      tabPress: (e) => {
        e.preventDefault(); // Jangan navigasi
        openWhatsApp();
      },
    },
    options: {
      headerShown: false,
      tabBarIcon: ({}) => (
      <IconBrand name="whatsapp" size={22} color="#202020"/>
      ),
    },
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    options: {
      headerShown: false,
      tabBarIcon: ({}) => (
        <Icon name="user" size={22} color="#202020"/>
      ),
    },
  },
];

export default routes;

