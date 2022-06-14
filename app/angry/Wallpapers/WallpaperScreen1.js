import React, {useEffect} from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, Alert, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

function WallpaperScreen1({imageUri, onChangeImage}) {

    useEffect(() => {
        requestPermission();
    }, [])

    const requestPermission = async () => {
        const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!granted) alert("Allow permission to the app to access Photos")
    }

    const handlePress = () => {
        if(!imageUri) selectImage();
        else 
        Alert.alert("Delete", "Are you sure you want to delete?",[
            {text: "Yes",  onPress: () => onChangeImage(null)}, 
            {text: "No"}
        ])
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.5,
            });
            if(!result.cancelled) onChangeImage(result.uri);
        }
        catch (error) {
            console.log("Something went wrong!", error)
        }
    }

    return (
        <TouchableWithoutFeedback onPress = {handlePress}>
            <View style = {styles.container}>
                {!imageUri && <MaterialCommunityIcons name = "camera" size = {55} color = "grey"/>}
                {imageUri && <Image source = {{uri: imageUri}} style = {styles.image}/>}
            </View>          
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 10,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden",
        width: 130,
        height: 130
    },
    image: {
        height: "100%",
        width: "100%",
    }
})

export default WallpaperScreen1;
