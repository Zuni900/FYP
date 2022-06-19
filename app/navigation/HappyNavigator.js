import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import Settings from "../All/Settings";
import Album from "../happy/Home/Album";
import Quran from "../All/Quran/Quran";
import Musics from "../happy/Music/Musics";
import Ringtones from "../happy/Ringtones/Ringtones";
import Wallpaper from "../happy/Wallpapers/Wallpaper";
import Books from "../happy/Books/Books";
import Book from "../happy/Books/Book";
import Notepad from "../All/Notepad/Notepad";
import Contact from "../All/Contacts/Contact";

const Stack = createStackNavigator();

export default function HappyNavigator() {
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
