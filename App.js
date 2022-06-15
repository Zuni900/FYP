import React, {useState} from "react";
import {NavigationContainer} from "@react-navigation/native";
import NavigationTheme from "./app/navigation/NavigationTheme";
import {RootNavigator} from "./app/navigation/rootNavigator";
import { UserContext } from "./app/context/Index";

export default function App() {

  const[userEmail,setEmail]=useState();
  return (
    <UserContext.Provider value={{userEmail,setEmail}}>
      <NavigationContainer theme = {NavigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </UserContext.Provider>
  );
}
