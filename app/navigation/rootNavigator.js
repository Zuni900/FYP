import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import AuthNavigator from "./AuthNavigator";
import HappyNavigator from "./HappyNavigator";
import SadNavigator from "./SadNavigator";
import AngryNavigator from "./AngryNavigator";
import SurpriseNavigator from "./SurpriseNavigator";

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions = {{ headerShown: false }}
      initialRouteName="AuthNavigator"
    >
      <Stack.Screen name = "AuthNavigator" component = {AuthNavigator} />
      <Stack.Screen name = "HappyNavigator" component = {HappyNavigator} />
      <Stack.Screen name = "SadNavigator" component = {SadNavigator} />
      <Stack.Screen name = "AngryNavigator" component = {AngryNavigator} />
      <Stack.Screen name = "SurpriseNavigator" component = {SurpriseNavigator} />
    </Stack.Navigator>
  );
};
