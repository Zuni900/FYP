import React from "react";
import {ScrollView, View, TouchableOpacity, StyleSheet, Text, Dimensions, ImageBackground} from "react-native";
import {Ionicons} from '@expo/vector-icons';

function Album({ navigation, route }) {

    const {useremail} = route.params

    var data = route?.params?.data;
    console.log("params", data);

    return (
      <ImageBackground
        style = {styles.background}
        source = {require("../../assets/album.jpg")}
      >
        <TouchableOpacity style = {styles.setting} onPress = {() => navigation.navigate("Settings")}>
          <Ionicons name = "settings" size = {30} color = "white" />
        </TouchableOpacity>

        <View style = {styles.moods}>
          <Text style = {styles.mood}> Mood is {data?.dominant_emotion} </Text>
        </View>

        <View style = {styles.heading}>
          <Text style = {styles.top}> Your Recommendations </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator = {false}>
          <View style = {styles.direction}>
            <View style = {styles.each}>
              <ImageBackground
                style = {styles.styling}
                source = {require("../../assets/Album/islamicVerses.jpg")}
              >
                <TouchableOpacity
                  style = {styles.text}
                  onPress = {() => navigation.navigate("Quran")}
                >
                  <Text style = {styles.txt}> Quran Verses </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style = {styles.each}>
              <ImageBackground
                style = {styles.styling}
                source = {require("../../assets/Album/music.jpg")}
              >
                <TouchableOpacity
                  style = {styles.text}
                  onPress = {() => navigation.navigate("Musics")}
                >
                  <Text style = {styles.txt}> Music </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style = {styles.each}>
              <ImageBackground
                style = {styles.styling}
                source = {require("../../assets/Album/ringtones.jpg")}
              >
                <TouchableOpacity
                  style = {styles.text}
                  onPress = {() => navigation.navigate("Ringtones")}
                >
                  <Text style = {styles.txt}> Ringtones </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style = {styles.each}>
              <ImageBackground
                style = {styles.styling}
                source = {require("../../assets/Album/wallpapers.jpg")}
              >
                <TouchableOpacity
                  style = {styles.text}
                  onPress = {() => navigation.navigate("Wallpaper")}
                >
                  <Text style = {styles.txt}> Wallpapers </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style = {styles.each}>
              <ImageBackground
                style = {styles.styling}
                source = {require("../../assets/Album/ebook.jpg")}
              >
                <TouchableOpacity
                  style = {styles.text}
                  onPress = {() => navigation.navigate("Books")}
                >
                  <Text style = {styles.txt}> eBook </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style = {styles.each}>
              <ImageBackground
                style = {styles.styling}
                source = {require("../../assets/Album/notepad.jpg")}
              >
                <TouchableOpacity
                  style = {styles.text}
                  onPress = {() => navigation.navigate("Notepad",{"useremail":useremail})}
                >
                  <Text style = {styles.txt}> Notepad </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

            <View style = {styles.each}>
              <ImageBackground
                style = {styles.styling}
                source = {require("../../assets/Album/EmgcyContacts.jpg")}
              >
                <TouchableOpacity
                  style = {styles.text}
                  onPress = {() => navigation.navigate("Contact")}
                >
                  <Text style = {styles.txt}> Contacts </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>

          </View>
        </ScrollView>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  setting: {
    marginLeft: "85%",
    marginTop: "3%",
  },  
  heading: {
    marginTop: "12%",
    marginBottom: "15%",
    marginRight: "50%",
  },
  moods: {
    alignItems: "center"
  },
  mood: {
    color: "white",
    fontSize: 18
  },
  top: {
    color: "white",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  direction: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  each: {
    borderRadius: 10,
    overflow: "hidden",
    margin: "6%",
  },
  styling: {
    width: 130,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    height: "22%",
    width: "80%",
    backgroundColor: "#4040bf",
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  txt: {
    color: "white",
  },
});

export default Album;
