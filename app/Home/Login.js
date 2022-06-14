import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ImageBackground, Text, TextInput, Dimensions} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {signInWithEmailAndPassword} from "firebase/auth";

import {auth} from "./Firebase";

function Login ({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
            navigation.navigate("FaceDetection",{"useremail":email})
            console.log("Successfully Login!")
        })
        .catch(() => {
            alert("Invalid email or password");
        });
    }

    return (
        <ImageBackground
            style = {styles.background}
            source = { require ('../assets/screen.jpg') }
        >

            <Text style = {styles.welcome}> Welcome </Text>
            <Text style = {styles.text}> You need to Login first </Text>

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
                    
                    {/* <TouchableOpacity>
                        <Text style = {styles.trouble}> Having Trouble? </Text>
                    </TouchableOpacity> */}
                    
                    <TouchableOpacity
                        style = {styles.login} 
                        onPress = {login}
                    >
                        <Text style = {styles.button}> Login </Text>
                    </TouchableOpacity>

            <TouchableOpacity onPress = {() => navigation.navigate("Signup")}>
                <Text style = {styles.signup}> Don't have an account? Signup Here </Text>
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
        marginTop:"15%",
    },
    login: {
        width: "30%",
        height: "6%",
        backgroundColor: '#4040bf',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        margin: "2%",
        marginTop: "10%"
    },
    button: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
    },
    text: {
        color: "#191970",
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: "20%",
        marginTop: "2%"
    },
    // trouble: {
    //     color: "#4040bf",
    //     textDecorationLine: 'underline',
    //     fontSize: 15,
    //     marginBottom: "4%",
    //     marginTop: "10%"
    // },
    signup: {
        color: "#4040bf",
        textDecorationLine: 'underline',
        fontSize: 15,
        marginTop: "10%",
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
    },
})

export default Login;