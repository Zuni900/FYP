import React from 'react';
import {StyleSheet, TouchableOpacity, ImageBackground, Text, View, Dimensions} from 'react-native';

function Home ({navigation}) {
    return (
        <ImageBackground
            style = {styles.background}
            source = { require ('../assets/bgpic.jpg') }
        >
            <View style = {styles.container}>
                <TouchableOpacity style = {styles.login} onPress = {() => navigation.navigate("Login")}>
                    <Text style = {styles.text}> Log-In </Text>
                </TouchableOpacity>

                <TouchableOpacity style = {styles.signup} onPress = {() => navigation.navigate("Signup")}>
                    <Text style = {styles.text}> Sign-Up </Text>
                </TouchableOpacity>
            </View>

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
    container: {
        flex: 1,
        flexDirection: "row"
        // flexWrap: "wrap",
    },
    login: {
        marginTop: "185%",
        marginRight: "20%",
        width: "30%",
        height: "6%",
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
    },
    signup: {
        marginTop: "185%",
        width: "30%",
        height: "6%",
        backgroundColor: 'white',
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30
    },
    text: {
        color: "#191970",
        fontWeight: "bold",
        fontSize: 18
    }
})

export default Home;