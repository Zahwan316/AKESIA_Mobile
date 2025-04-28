import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LandingScreen from '../screen/Landing';
import LoginScreen from '../screen/Login';
import CompleteProfileOrangTuaScreen from '../screen/CompleteProfileOrangTua';
import CompleteProfileBidanScreen from '../screen/CompleteProfileBidan';
import HomeScreen from '../screen/Home';

const tab = createBottomTabNavigator();

const RouteNavigation = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <tab.Navigator initialRouteName="Home">
        <tab.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: {display: 'none'},
          }}
        />
        <tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: {display: 'none'},
          }}
        />
        <tab.Screen
          name="ProfileOrangTua"
          component={CompleteProfileOrangTuaScreen}
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: {display: 'none'},
          }}
        />
        <tab.Screen
          name="ProfileBidan"
          component={CompleteProfileBidanScreen}
          options={{
            headerShown: false,
            tabBarStyle: {display: 'none'},
            tabBarButton: () => null,
          }}
        />
        <tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </tab.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigation;
