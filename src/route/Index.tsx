import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from '../screen/Landing';
import LoginScreen from '../screen/Login';

const tab = createBottomTabNavigator();

const RouteNavigation = (): React.JSX.Element => {
  return(
    <NavigationContainer>
      <tab.Navigator initialRouteName="Landing">
        <tab.Screen name="Landing" component={LandingScreen} options={{headerShown: false, tabBarStyle: {display: 'none'}}} />
        <tab.Screen name="Login" component={LoginScreen} options={{headerShown: false, tabBarStyle: {display: 'none'}}} />
      </tab.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigation;
