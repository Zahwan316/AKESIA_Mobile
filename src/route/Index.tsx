import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screen/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const tab = createBottomTabNavigator();

const RouteNavigation = (): React.JSX.Element => {
  return(
    <NavigationContainer>
      <tab.Navigator initialRouteName="Login">
        <tab.Screen name="Login" component={LoginScreen} options={{headerShown: false, tabBarStyle: {display: 'none'}}} />
      </tab.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigation;
