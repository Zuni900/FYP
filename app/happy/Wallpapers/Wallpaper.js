import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, LogBox, Text, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { getStorage, ref, getDownloadURL } from 'firebase/storage'; 

function Wallpaper() {

  LogBox.ignoreLogs(['Setting a timer']);

  // const [url, setUrl] = useState();

  // useEffect(() => {
  //   const func = async () => {
  //     const storage = getStorage();
  //     const reference = ref(storage, '/happy/shocked1.jpg');
  //     await getDownloadURL(reference).then((x) => {
  //       setUrl(x);
  //     })
  //   }

  //   if (url == undefined) {func()};
  // }, []);

    return (
        <ImageBackground
            style = {styles.background}
            source = { require ('../../assets/ebook.jpg') }
        >

        <View style = {styles.heading}>
            <Text style = {styles.top}> Wallpapers </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator = {false}>

        <View style = {styles.direction}>
            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    // source = {{ uri: url }}
                    source = { require("../../assets/Wallpapers/1.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/2.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/3.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/4.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/5.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/6.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/7.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/8.jpg") }
                />  
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/9.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/10.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/11.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/12.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/13.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/14.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/15.jpg") }
                />
            </TouchableOpacity>

            <TouchableOpacity style = {styles.each} >
                <Image
                    style = {styles.styling}
                    source = { require("../../assets/Wallpapers/16.jpg") }
                />
            </TouchableOpacity>
        </View>

        </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center"
    },
    heading: {
        marginTop: "21%",
        marginBottom: "18%",
        marginRight: "62%"
    },
    top: {
        color: "white",
        fontSize: 21,
        textDecorationLine: 'underline'
    },
    direction: {
        flexDirection: "row",
        flexWrap: "wrap"
    },      
    styling: {
        width: 170,
        height: 170,
    },
    each: {
        borderRadius: 10,
        overflow: "hidden",
        margin: "6%"
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
        backgroundColor: '#4040bf',
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    txt: {
        color: "white"
    },
    gallery: {
        flexDirection: "row",
        flexWrap: "wrap"
    }
});

export default Wallpaper;