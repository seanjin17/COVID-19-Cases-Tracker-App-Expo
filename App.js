import React from 'react';
// import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import CountryWiseResults from './Views/CountryBasedView'
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import AboutView from './Views/AboutView'
import Home from './Views/Home'
import NewsView from './Views/NewsView'
import ErrorBoundary from'./components/ErrorBoundry'
// import ReadNews from './Views/ReadNews'
import FaqView from './Views/FaqView'

import { PushLogToServer } from './data-access/request-layer'

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


// const Stack = createStackNavigator();
const Stack = createMaterialBottomTabNavigator();

export default function App() {

  const PUSH_REGISTRATION_ENDPOINT = '<Your notification server endpoint>';

  const registerForPushNotificationsAsync = async () => {
    try{
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      return fetch(PUSH_REGISTRATION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: {
            value: token,
          },
          user: {
            username: 'warly',
          },
        }),
      })
    }catch(e){
      PushLogToServer("error", "Ask for push notification failed")
    }
  }

  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, [])
  return(
  <ErrorBoundary>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size=20 }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'md-home';
        } else if (route.name === 'Overall') {
          iconName = 'ios-globe'
        }else if (route.name === 'FAQ') {
          iconName = 'md-chatbubbles';        
        }else if (route.name === 'About') {
            iconName = 'md-thumbs-up';
        }else if (route.name === 'News') {
          iconName = 'ios-filing';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
      <Stack.Screen name="Overall" component={CountryWiseResults} initialParams={null} />
        <Stack.Screen name="News" component={NewsView} initialParams={null} />
        <Stack.Screen name="Home" component={Home} initialParams={null}/>
        <Stack.Screen name="FAQ" component={FaqView} initialParams={null} />
        <Stack.Screen name="About" component={AboutView} initialParams={null} />
      </Stack.Navigator>
    </NavigationContainer>
  </ErrorBoundary >
  )
}
