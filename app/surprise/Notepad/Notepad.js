import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ImageBackground, ScrollView, TouchableOpacity, LogBox, TextInput, Text, Dimensions} from 'react-native';
import {collection, addDoc, getDocs, deleteDoc, doc, where, query} from "firebase/firestore"; 
import {Ionicons} from '@expo/vector-icons';
import _ from 'lodash';

import {db} from "../../Home/Firebase";
import useEmail from '../../hooks/useEmail';

function Notepad () {

    LogBox.ignoreLogs(['Warning:...']); // ignore specific logs
    LogBox.ignoreAllLogs(); // ignore all logs
    const _console = _.clone(console);
    console.warn = message => {
        if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message);
        }
    };
    
    const {userEmail} = useEmail();
    const [text, setText] = useState('');
    const [txt, setTxt] = useState([]);
    const [loading, setLoading] = useState(true);

    function add () {
        addDoc(collection(db, "notepad"), {     
            text: text,
            email: userEmail
        }).then(() => { 
            alert("Saved Successfully!")    
            setText('');
        }).catch((error) => {
            console.log(error);
        });        
    }

    useEffect (async() => {
        const getAlldata = async()=> {
            let note = [];
            const q = query(collection(db, "notepad"), where ("email", "==", userEmail));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                note.push({ id:doc.id, ...doc.data() })
                setLoading(false)
            });
            setTxt(note)
            if (note == 0)
            {
                setLoading(false)
            }
        }
        getAlldata();
    }, [txt])

    const Delete = (id) => {
        const newArray = txt.filter((item)=>{
            return item.id !== id
        })

        deleteDoc(doc(db,'notepad',id)).then(res=>{
            alert("Deleted Successfully!");
        })
        setTxt(newArray);
    };

    return (
        <ImageBackground
            style = {styles.container}
            source = { require ('../../assets/background/notepad.jpg') }
        >

        <View style = {styles.heading}>
            <Text style = {styles.top}> Notepad </Text>
        </View>

        <ScrollView style = {styles.scrollContainer}>
        {loading ? <View style = {styles.loading}><Text style = {styles.text}> Loading... </Text></View> : 
        <View>
            {txt == 0 ? <View style = {styles.loading}><Text style = {styles.text}> No data! </Text></View> :
                <View>
                    {txt.map ((doc, key) => {
                    return (
                        <View key = {key} style = {styles.note}>
                            <Text style = {styles.noteText}> {doc.text} </Text>
                                
                            <TouchableOpacity style = {styles.noteDelete} onPress = {() => {Delete(doc.id)}}>
                                <Ionicons name = "trash-bin" size = {20} color = "white" /> 
                            </TouchableOpacity>
                        </View>
                    )
                    })}
                </View>
            }
        </View>}
        </ScrollView>

        <View style = {styles.footer}>
            <TouchableOpacity onPress = {add} style = {styles.addButtom}>
                <Text style = {styles.addButtomText}> + </Text>
            </TouchableOpacity>

            <TextInput style = {styles.textInput}
                onChangeText = {(text) => {setText(text)}} 
                value = {text}
                placeholder = '+ Add Notes' 
                placeholderTextColor = 'white' 
                underlineColor = 'transparent'>
            </TextInput>
        </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    heading: {
        marginTop: "28%",
        marginBottom: "18%",
        marginLeft: "7%"
    },
    top: {
        color: "white",
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0
    },
    addButtom: {
        backgroundColor: '#a3b9fe',
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: -45,
        zIndex: 10
    },
    addButtomText: {
        color: '#010b65',
        fontSize: 35
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        paddingTop: 46,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#010b65'
    },
    note:{
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#191970',
    },
    noteText:{
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#E19E63',
    },
    noteDelete:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191970',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    loading: {
        alignItems: "center",
        marginTop: 150
    },
    text: {
        fontSize: 18
    },
})

export default Notepad;