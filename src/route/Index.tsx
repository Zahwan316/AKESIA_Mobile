import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes, { routesBottom } from '../data/route';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const tab = createBottomTabNavigator();
const nativetab = createNativeStackNavigator();

const BottomTabs = (): React.JSX.Element => {
  return(
    <tab.Navigator>
      {
        routesBottom.map((item, index) => (
          <tab.Screen
            name={item.name}
            component={item.component}
            options={item.options}
            key={index}
          />
        ))
      }
    </tab.Navigator>
  );
};

const RouteNavigation = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <nativetab.Navigator initialRouteName="BottomTabs" screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
        {
          routes.map((item, index) => (
            <nativetab.Screen
              name={item.name}
              component={item.component}
              // options={item.options}
              key={index}
            />
          ))
        }
        <nativetab.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
      </nativetab.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigation;
