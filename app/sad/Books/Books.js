import React, {useState, useEffect} from 'react';
import {ScrollView, View, LogBox, TouchableOpacity, StyleSheet, Dimensions, Text, ImageBackground} from 'react-native';
import {collection, getDocs} from "firebase/firestore"; 
import _ from 'lodash';
import {db} from "../../Home/Firebase";

function Books({navigation}) {

    LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
    LogBox.ignoreAllLogs(); // ignore all logs
    const _console = _.clone(console);
    console.warn = message => {
        if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message);
        }
    };

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllBook = async()=>{
            let note = [];
            getDocs(collection(db,"sadBooks")).then(docSnap => {
                docSnap.forEach((doc) => {
                    note.push({id:doc.id, ...doc.data()})
                }); 
                setBooks(note);   
                setLoading(false)    
            }) 
        }
        getAllBook();
    }, [])
    
    return (
    <ImageBackground
        style = {styles.background}
        source = { require ('../../assets/background/ebook.jpg') }
    >

    <View style = {styles.heading}>
        <Text style = {styles.top}> Your Recommended Books </Text>
    </View>

    <ScrollView showsVerticalScrollIndicator = {false}>
        {loading ? <Text style = {{marginTop: "250%", fontSize: 18}}> Loading... </Text> : 
        <View style = {styles.direction}>
            {books.map((doc, key) => {
            return (
                <View key = {doc.id} style = {styles.each}>
                    <TouchableOpacity
                        onPress = {() => navigation.navigate('Book', {
                            bookId: doc.id,
                        })}
                    >
                        <ImageBackground
                            style = {styles.styling}
                            source = {{ uri: doc.url }}
                        />   
                    </TouchableOpacity>

                    <View style = {styles.text}>
                        <Text style = {styles.txt}> {doc.name} </Text>
                    </View>
                </View>
            )
            })}
        </View>
        }
    </ScrollView>
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
    heading: {
        marginTop: "25%",
        marginBottom: "20%",
        marginRight: "45%"
    },
    top: {
        color: "white",
        fontSize: 16,
        textDecorationLine: 'underline'
    },
    direction: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center"
    },
    each: {
        borderRadius: 10,
        overflow: "hidden",
        margin: "6%",
        
    },
    styling: {
        width: 130,
        height: 160,
        overflow: "hidden"
    },
    text: {
        padding: 3,
        marginTop: 5,
        width: 130,
        backgroundColor: '#4040bf',
        opacity: 0.9,
        alignItems: "center",
        borderRadius: 5
    },
    txt: {
        color: "white"
    }
})

export default Books;