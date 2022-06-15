import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ScrollView, LogBox, Dimensions, Text, Image, ImageBackground} from 'react-native';
import { getDocs, collection } from 'firebase/firestore'; 
import _ from 'lodash';
import {db} from "../../Home/Firebase";

function Wallpaper() {

    LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
    LogBox.ignoreAllLogs(); // ignore all logs
    const _console = _.clone(console);
    console.warn = message => {
        if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message);
        }
    };

    const [wallpaper, setWallpaper] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWallpaper = async()=>{
            let images = [];
            await getDocs(collection(db,"images")).then(docSnap => {
                docSnap.forEach((doc) => {
                    images.push({id:doc.id, ...doc.data()})
                }); 
                setWallpaper(images);   
                setLoading(false)    
            }) 
        }
        getWallpaper();
    }, [])

    return (
        <ImageBackground
            style = {styles.background}
            source = { require ('../../assets/background/ebook.jpg') }
        >

        <View style = {styles.heading}>
            <Text style = {styles.top}> Wallpapers </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator = {false}>
            {loading ? <Text style = {{marginTop: "250%", fontSize: 18}}> Loading... </Text> : 
            <View style = {styles.direction}>
            {wallpaper.map((obj) => {
                return(
                    <View key = {obj.url} style = {styles.each} >
                        <Image
                            style = {styles.styling}
                            source = {{ uri: obj.url }}
                        />
                    </View>
                )
            })}
            </View>
            }
        </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center",
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    heading: {
        marginTop: "25%",
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