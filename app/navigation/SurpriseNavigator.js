import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import Settings from "../All/Settings";
import Album from "../surprise/Home/Album";
import Quran from "../All/Quran/Quran";
import Musics from "../surprise/Music/Musics";
import Ringtones from "../surprise/Ringtones/Ringtones";
import Wallpaper from "../surprise/Wallpapers/Wallpaper";
import Books from "../surprise/Books/Books";
import Book from "../surprise/Books/Book";
import Notepad from "../surprise/Notepad/Notepad";
import Contact from "../All/Contacts/Contact";

const Stack = createStackNavigator();

export default function SurpriseNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name = "Settings" component = {Settings} />
      <Stack.Screen name = "Feed" component = {Album} />
      <Stack.Screen name = "Quran" component = {Quran} />
      <Stack.Screen name = "Musics" component = {Musics} />
      <Stack.Screen name = "Ringtones" component = {Ringtones} />
      <Stack.Screen name = "Wallpaper" component = {Wallpaper} />
      <Stack.Screen name = "Books" component = {Books} />
      <Stack.Screen name = "Book" component = {Book} />
      <Stack.Screen name = "Notepad" component = {Notepad} />
      <Stack.Screen name = "Contact" component = {Contact} />
    </Stack.Navigator>
  );
}
