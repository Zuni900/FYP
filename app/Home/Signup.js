import React, {useState} from 'react';
import {StyleSheet, TextInput, Dimensions,ImageBackground, Text, View, TouchableOpacity} from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {createUserWithEmailAndPassword} from "firebase/auth";

import {auth} from "./Firebase";

export default function App({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pswd, setPswd] = useState("");

    function signUp() {
    if (password == pswd) {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("Sign up Successful!");
            console.log("Sign up Successful!")
        })
        .catch(() => {
            alert("Invalid Email or Password");
        });
    } else {
        alert("Password doesn't matches!")
    }
    }

    return (
        <ImageBackground
            style = {styles.background}
            source = { require ('../assets/screen.jpg') }
        >
            <Text style = {styles.welcome}> Welcome </Text>
            <Text style = {styles.text}> You need to Signup first </Text>

            <View style = {styles.container}>
                <MaterialCommunityIcons 
                    name = "email"
                    size = {20} 
                    color = "#191970"
                />
                <TextInput 
                    style = {styles.txt}
                    placeholder = "Email"
                    value = {email}
                    onChangeText = { (Text) => {setEmail(Text)} }
                />
            </View>

            <View style = {styles.container} >
                <MaterialCommunityIcons 
                    name = "key"
                    size = {20} 
                    color = "#191970"
                />
                <TextInput 
                    style = {styles.txt}
                    placeholder = "Password"
                    value = {password}
                    secureTextEntry
                    onChangeText = { (Text) => {setPassword(Text)} }
                />
            </View>

            <View style = {styles.container} >
                <MaterialCommunityIcons 
                    name = "key"
                    size = {20} 
                    color = "#191970"
                />
                <TextInput 
                    style = {styles.txt}
                    placeholder = "Re-write Password"
                    value = {pswd}
                    secureTextEntry
                    onChangeText = { (Text) => {setPswd(Text)} }
                />
            </View>

            <TouchableOpacity
                style = {styles.signup} 
                onPress = {signUp}
            >
                <Text style = {styles.button}> Signup </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {() => navigation.navigate("Login")}>
                <Text style = {styles.login}> Already have an account? Login Here </Text>
            </TouchableOpacity> 

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        alignItems: "center",
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    welcome: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#191970",
        marginTop:"10%"
    },
    text: {
        color: "#191970",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: "12%",
        marginTop: "2%"
    },
    signup: {
        width: "30%",
        height: "6%",
        backgroundColor: '#4040bf',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        margin: "5%"
    },
    button: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    },
    login: {
        color: "#4040bf",
        textDecorationLine: 'underline',
        fontSize: 15,
        margin: "3%"
    },
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "70%",
        height: "6%",
        borderRadius: 30,
        margin: 6,
        alignItems: "center",
        paddingLeft: 12,
        padding: 10,
        paddingRight: "8%"
    },
    txt: {
        paddingLeft: 30,
        fontSize: 17,
        width: "100%"
    }
});

