import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Settings from "../sad/Home/Settings";
import Album from "../sad/Home/Album";
import Quran from "../sad/Quran/Quran";
import Musics from "../sad/Music/Musics";
import Ringtones from "../sad/Ringtones/Ringtones";
import Wallpaper from "../sad/Wallpapers/Wallpaper";
import Books from "../sad/Books/Books";
import Book from "../sad/Books/Book";
import Notepad from "../sad/Notepad/Notepad";
import Contact from "../sad/Contacts/Contact";

const Stack = createStackNavigator();

export default function SadNavigator() {
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
