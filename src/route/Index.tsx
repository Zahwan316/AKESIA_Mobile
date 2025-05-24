import React, { useCallback, useEffect, useState } from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routes, { routesBottom } from '../data/route';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from '../screen/SplashScreen';

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
            listeners={item.listeners}
          />
        ))
      }
    </tab.Navigator>
  );
};

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const RouteNavigation = (): React.JSX.Element => {
  const [initialNavigationState, setInitialNavigationState] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;

        if (state !== undefined) {
          setInitialNavigationState(state);
        }
      } catch (e) {
        console.warn('Gagal mengambil navigation state:', e);
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  const handleStateChange = useCallback(
    (state) => {
      AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state));
    },
    []
  );

  if (!isReady) <SplashScreen />; // atau splash screen
  return (
    <NavigationContainer initialState={initialNavigationState} onStateChange={handleStateChange}>
      <nativetab.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }}>
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
          listeners={routesBottom.listeners}
        />
      </nativetab.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigation;
