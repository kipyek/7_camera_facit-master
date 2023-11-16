import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from 'react-native-vector-icons';
import CameraScreen from './components/CameraScreen';
import SwipeScreen from './components/SwipeScreen';
import UploadScreen from './components/UploadScreen';
import LikedScreen from './components/LikedScreen';
import ProfileScreen from './components/ProfileScreen';


const Tab = createBottomTabNavigator();


const homeScreenText = "Dette er HomeScreen!"
const settingsScreenText = "Dette er SettingsScreen!"
const cameraScreenText = "Dette er CameraScreen!"


function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: [
          {
            display: "flex"
          },
          null
        ],
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Camera') {
            return (
              <Ionicons
                name={'camera-outline'}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Upload') {
            return (
              <Ionicons
                name='cloud-upload-outline'
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Swipe') {
            return (
              <MaterialIcons
                name='swipe'
                size={size}
                color={color}
              />
            );
          }
          else if (route.name === 'Liked') {
            return (
              <Ionicons
                name='albums-outline'
                size={size}
                color={color}
              />
            );
          }
          else {
            return (
              <Ionicons
                name='person-outline'
                size={size}
                color={color}
              />
            );
          }
        },
      })}
      >
        <Tab.Screen name="Camera" children={() => <CameraScreen prop={cameraScreenText} />} />
        <Tab.Screen name="Upload" children={() => <UploadScreen prop={cameraScreenText} />} />
        <Tab.Screen name="Swipe" children={() => <SwipeScreen prop={homeScreenText} />} />
        <Tab.Screen name="Liked" children={() => <LikedScreen prop={homeScreenText} />} />
        <Tab.Screen name="Profile" children={() => <ProfileScreen prop={settingsScreenText} />} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App