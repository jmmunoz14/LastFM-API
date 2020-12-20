import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import Intro from './components/Intro';
import ListsArtist from './components/ListsArtist';
import ListsSongs from './components/ListsSongs';


//se utiliza stack navigation para la navegación de la app.

const RootApp = createAppContainer(
  createStackNavigator({
    Intro: Intro,
    ListsArtist: ListsArtist,
    ListsSongs: ListsSongs,
  }, { initialRouteName: "Intro", headerMode: 'none' })
)
export default function App() {
  return (
    <RootApp />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
