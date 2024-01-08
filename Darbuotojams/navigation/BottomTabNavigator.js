import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../presentation/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../authentication/presentation/LoginScreen';
import RegisterScreen from '../authentication/presentation/RegisterScreen';
import WelcomeScreen from '../authentication/presentation/WelcomeScreen';
import useAuth from '../authentication/hooks/useAuth';
import AcceptScreen from '../presentation/AcceptScreen';
import CancelScreen from '../presentation/CancelScreen';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { user } = useAuth();
  if (user) {
    return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Pagrindinis') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'Patvirtinti') {
            iconName = focused ? 'edit' : 'edit';
          } else if (route.name === 'Atšaukti') {
            iconName = focused ? 'trash' : 'trash';
          }
        return <Icon name={iconName} size={size} color={color} />;
      },
        })}
        tabBarStyle={{
          backgroundColor: '#ecf0f1',
        }}
        tabBarOptions={{
          activeTintColor: '#FBCFCD',
          inactiveTintColor: '#997070',
        }}
        >
          <Tab.Screen
          name="Pagrindinis"
          component={HomeScreen}
          options={{
            tabBarLabel: () => null,
            headerShown: false,
          }}
          />
          <Tab.Screen
          name="Patvirtinti"
          component={AcceptScreen}
          options={{
            tabBarLabel: () => null,
          }}
          />
          <Tab.Screen
          name="Atšaukti"
          component={CancelScreen}
          options={{
            tabBarLabel: () => null,
          }}
          />
    </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator >
        <Tab.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            tabBarStyle: { display: "none" },
            headerShown: false,
    
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            tabBarStyle: { display: "none" },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            tabBarStyle: { display: "none" },
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    );
  }
};

export default BottomTabNavigator;