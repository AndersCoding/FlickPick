import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
  <Tabs
  screenOptions={{
    tabBarStyle: {
      height: 50,
      paddingBottom: 4,
      paddingTop: 4,
    },
    tabBarLabelStyle: {
      fontSize: 10,
    },
  }}
>
<Tabs.Screen name="index" options={{ title: 'Home', headerShown:false}} />
  </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})