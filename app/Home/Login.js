import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, ImageBackground, Text, TextInput, Dimensions} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {signInWithEmailAndPassword} from "firebase/auth";
import useEmail from '../hooks/useEmail';
import {auth} from "./Firebase";

function Login ({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setUserEmail} = useEmail();

    const login = () => {
        if (email == "") {
            alert("Email required!")
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            alert("Invalid Email!")
        } 
        else if (password == "") {
            alert("Password required!")
        }
        else {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if(user.emailVerified){
                setUserEmail(user.email)
                 navigation.navigate("FaceDetection", {"useremail":email})
                console.log("Successfully Login!")}
                else{
                    alert('Account not verified');
                }
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
            });
        }
    }

    return (
        <ImageBackground
            style = {styles.background}
            source = { require ('../assets/background/screen.jpg') }
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
        paddingLeft: 20,
        fontSize: 16,
        width: "100%"
    },
})

export default Login;