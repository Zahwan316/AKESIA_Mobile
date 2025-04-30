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

type routesType = {
  name: string,
  component: () => React.JSX.Element,
  options: BottomTabNavigationOptions
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
    name: 'Home',
    component: HomeScreen,
    options: { headerShown: false },
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
];

export default routes;

