import React, {useState} from 'react';
import {StyleSheet, ImageBackground, View, Text, Modal, Dimensions, Image, TouchableOpacity, Pressable} from 'react-native';
import {AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import {signOut} from "firebase/auth";
import {auth} from "../../Home/Firebase";

const list = [
    {
      id: 1,
      text: "No matter where life brings us to, there are always those who help us remember how to smile.",
    },
    {
      id: 2,
      text: "The only thing that can make you happy is being happy with who you are.",
    },
    {
      id: 3,
      text: "There are so many beautiful reasons to smile.",
    },
    {
      id: 4,
      text: "Allah is always with you. Never forget that.",
    },
    {
      id: 5,
      text: "You are perfect just the way you are.",
    },
    {
      id: 6,
      text: "If you want to fly, give up everything that weighs you down.",
    },
    {
      id: 7,
      text: "Be patient, Allah knows what's best for you.",
    },
    {
      id: 8,
      text: "Life has no limitations except the ones you make.",
    },
    {
      id: 9,
      text: "Fear Allah and you will have no cause to fear anyone else.",
    },
    {
      id: 10,
      text: "To be the best you, must be able to handle the worst.",
    },
  ];

function Settings ({navigation}) {
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedText, setSelectedText] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    
    function modal () {
        setModalVisible(true);
        next();
    }

    const next = () => {
        setSelectedText(
            list[(selectedId) % list.length],
        );
        setSelectedId(selectedId + 1);
    };

    function logout() {
        signOut(auth)
          .then(() => {
            console.log("Logout successful.");
            navigation.navigate('Home');
        })
        .catch((error) => {
            alert(error);
        });
    }

    return (
        <ImageBackground
            style = {styles.container}
            source = { require ('../../assets/background/screen.jpg') }
        >
            <Image
                source = { require ('../../assets/background/logo.jpg') }
                style = {styles.logo}
            />

            <Modal
                animationType = "fade"
                transparent = {true}
                visible = {modalVisible}
                onRequestClose = {() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
            <View style = {styles.centeredView}>
                <View style = {styles.modalView}>
                    <Text style = {styles.modalTxt}> Keep Smiling </Text>
                    { selectedText && <Text style = {styles.modalText}> {selectedText.text} </Text>}

                    <Pressable
                        style = {styles.button}
                        onPress = {() => setModalVisible(!modalVisible)}
                    >
                        <Text style = {styles.textStyle}> Done </Text>
                    </Pressable>
                </View>
            </View>
            </Modal>

            <TouchableOpacity style = {styles.logout} onPress = {modal}>
                <MaterialCommunityIcons name = "reminder" size = {24} color = "#191970" />
                <Text style = {styles.text}> Healthy Reminder </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.logout} onPress = {logout}>
                <AntDesign name = "logout" size = {24} color = "#191970" />
                <Text style = {styles.text}> Logout </Text>
            </TouchableOpacity>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    logo: {
        width: "90%",
        height: "25%",
        borderRadius: 35,
        margin: 15
    },
    logout: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 19,
        marginTop: 10,
        width: "100%"
    },
    text: {
        fontSize: 18,
        padding: 15,
        color: "#191970"
    },
    centeredView: {
        flex: 1,
        marginTop: "20%",
        alignItems: 'center'
    },
    modalView: {
        width: "90%",
        justifyContent: "center",
        backgroundColor: "#f7d6b2",
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 7,
        padding: 5,
        elevation: 2,
        backgroundColor: '#291a87',
        alignItems: "center",
        margin: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold'
    },
    modalText: {
        margin: 5,
        fontSize: 16
    },
    modalTxt: {
        margin: 5,
        fontSize: 16,
        fontWeight: "bold"
    },
})

export default Settings;