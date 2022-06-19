import React from 'react';
import {View, Text, Modal, Image, StyleSheet, Pressable, Dimensions, ImageBackground, TouchableOpacity} from 'react-native';
import {Ionicons, MaterialIcons, FontAwesome5} from '@expo/vector-icons';

export default function RingtonesScreen( {isVisible, onCloseModal, selectedMusic, status, 
    onPlay, onPause, onNext, onPrev} ) {
        
    return (
    <Modal
        animationType = "slide"
        visible = {isVisible}
        presentationStyle = "fullScreen">
        <ImageBackground
            style = {styles.container}
            source = { require ('../../assets/background/screen.jpg') }
        >
            <Pressable
                onPress = {onCloseModal}
                style = {styles.top}
            >
                {<Ionicons name = "arrow-back" size = {26} color = "#191970" />}
                <Text style = {{fontSize: 20, color: "#191970"}}> Music </Text>
            </Pressable>

            <Image
                style = {{width: 330, height: 280, marginTop: "30%", marginBottom: "10%"}}
                source = {selectedMusic.img}
            />

            <View style = {{marginBottom: "32%"}}>
                <Text style = {styles.boldMainText}> {selectedMusic.name} </Text>
            </View>

            <View style = {styles.timeStampHolder}>
                <TouchableOpacity onPress = {onPrev}>
                    <MaterialIcons name = "skip-previous" size = {40} color = "black" />
                </TouchableOpacity>

                <Pressable 
                    onPress = {status === false ? onPlay : onPause} 
                    style = {styles.playButtonHolder}
                >
                    {status === false ? 
                        <FontAwesome5 name = "play" size = {23} color = "black" /> : 
                        <Ionicons name = "pause" size = {30} color = "black" />
                    }
                </Pressable>

                <TouchableOpacity onPress = {onNext}>
                    <MaterialIcons name = "skip-next" size = {40} color = "black" />
                </TouchableOpacity>
            </View>

      </ImageBackground>
    </Modal>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    top: {
        position: 'absolute', 
        top: 20, 
        left: 20, 
        flexDirection: "row", 
        alignItems: "center"
    },
    boldMainText: {
        fontSize: 22,
        color: "black",
        fontWeight: '500'
    },
    timeStampHolder: {
        width: '50%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    playButtonHolder: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});