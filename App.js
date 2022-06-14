import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import NavigationTheme from "./app/navigation/NavigationTheme";
import {RootNavigator} from "./app/navigation/rootNavigator";

export default function App() {
  return (
    <NavigationContainer theme = {NavigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
