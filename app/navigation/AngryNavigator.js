import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import Settings from "../All/Settings";
import Album from "../angry/Home/Album";
import Quran from "../All/Quran/Quran";
import Musics from "../angry/Music/Musics";
import Ringtones from "../angry/Ringtones/Ringtones";
import Wallpaper from "../angry/Wallpapers/Wallpaper";
import Books from "../angry/Books/Books";
import Book from "../angry/Books/Book";
import Notepad from "../angry/Notepad/Notepad";
import Contact from "../All/Contacts/Contact";

const Stack = createStackNavigator();

export default function AngryNavigator() {
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
