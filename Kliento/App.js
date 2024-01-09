import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import HomeScreen from './screens/HomeScreen';
import WebViewScreen from './screens/WebViewScreen';
import CartScreen from './screens/CartScreen'; 
import PaymentScreen from './screens/PaymentScreen';

const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyBcLO2Ve-V9SgTutchauZCw4wRcCg4TvOo",
  authDomain: "baigiamasisprojektas-f9129.firebaseapp.com",
  projectId: "baigiamasisprojektas-f9129",
  storageBucket: "baigiamasisprojektas-f9129.appspot.com",
  messagingSenderId: "447673278484",
  appId: "1:447673278484:web:bb0bc9c5fd9dbd7cbbc701"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

const AppNavigator = () => {
  useEffect(() => {
    return () => {
    };
  }, []); 

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} /> 
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
