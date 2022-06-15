import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, LogBox, Text, Dimensions, ImageBackground} from 'react-native';
import {doc, getDoc} from "firebase/firestore"; 
import _ from 'lodash';
import {db} from "../../Home/Firebase";

function Book({ route }) {
    const {bookId} = route.params;

    LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
    LogBox.ignoreAllLogs(); // ignore all logs
    const _console = _.clone(console);
    console.warn = message => {
        if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message);
        }
    };

    const [Book, setBook] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBook = async() => {
            const docRef = doc(db, "surpriseBooks", bookId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setBook(docSnap.data());
                setLoading(false)
            } else {
                console.log("No such document!");
            }
        }
        getBook();
    }, [])

    return (
    <ImageBackground
        style = {styles.background}
        source = { require ('../../assets/background/screen.jpg') }
    >

    <ScrollView showsVerticalScrollIndicator = {false}>
        {loading ? <View style = {styles.loading}><Text style = {styles.text}> Loading... </Text></View> : 
            <View>
                <View style = {styles.book}>
                    <Text style = {styles.name}> {Book.name} </Text>
                </View>

                <Text style = {styles.author}> Author:  {Book.author} </Text>

                <View style = {styles.book}>
                    <Text style = {styles.description}> Description </Text>
                </View>

                <View style = {styles.book}>
                    <Text style = {styles.desc}> {Book.description} </Text>
                </View>      
            </View>
        }
    </ScrollView>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    loading: {
        alignItems: "center",
        marginTop: 300
    },
    text: {
        fontSize: 18
    },
    book: {
        alignItems: "center",
        marginTop: 15
    },
    name: {
        marginBottom: 20,
        fontSize: 20,
        textDecorationLine: 'underline',
        fontWeight: "bold"
    },
    author: {
        marginBottom: 10,
        fontSize: 17
    },
    description: {
        fontSize: 17,
        textDecorationLine: 'underline'
    },
    desc: {
        fontSize: 17
    }
})

export default Book;