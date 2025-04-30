import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes from '../data/route';

const tab = createBottomTabNavigator();

const RouteNavigation = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <tab.Navigator initialRouteName="JanjiKita">
        {
          routes.map((item, index) => (
            <tab.Screen
              name={item.name}
              component={item.component}
              options={item.options}
              key={index}
            />
          ))
        }
      </tab.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigation;
