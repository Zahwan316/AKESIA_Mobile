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
import PelayananIbuBersalinScreen from '../../screen/pemeriksaan/pelayanan_bayi/pelayananibubersalin';
import BayiSaatLahirScreen from '../../screen/pemeriksaan/pelayanan_bayi/bayisaatlahir';

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
];

export default routes;

