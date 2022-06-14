import React, {useState, useEffect} from 'react';
import {ScrollView, View, LogBox, TouchableOpacity, StyleSheet, Dimensions, Text, ImageBackground} from 'react-native';
import {collection, getDocs} from "firebase/firestore"; 

import {db} from "../../Home/Firebase";

function Books({navigation}) {

    LogBox.ignoreLogs(['Setting a timer']);

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAllBook = async()=>{
            let note = [];
            getDocs(collection(db,"books")).then(docSnap => {
                docSnap.forEach((doc) => {
                    note.push({id:doc.id, ...doc.data()})
                }); 
                console.log(note)
                setBooks(note);   
                setLoading(false)    
            }) 
        }
        getAllBook();
    }, [])
    
    return (
    <ImageBackground
        style = {styles.background}
        source = { require ('../../assets/ebook.jpg') }
    >

    <View style = {styles.heading}>
        <Text style = {styles.top}> Your Recommended Books </Text>
    </View>

    <ScrollView showsVerticalScrollIndicator = {false}>
        {loading ? <Text style = {{marginTop: "250%", fontSize: 18}}> "Loading" </Text> : 
        <View style = {styles.direction}>
            {books.map((doc, key) => {
            return (
                <View key = {doc.id} style = {styles.each}>
                    <ImageBackground
                        style = {styles.styling}
                        source = { require("../../assets/Books/harryPotter.jpg") }
                    >

                    <TouchableOpacity style = {styles.text} onPress = {() => navigation.navigate('Book', {
                        bookId: doc.id,
                    })}>
                        <Text style = {styles.txt}> {doc.name} </Text>
                    </TouchableOpacity>

                    </ImageBackground>
                </View>
            )
            })}
        </View>
        }

    {/* <View style = {styles.direction}>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/harryPotter.jpg") }
            >

            <TouchableOpacity style = {styles.text} onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> Harry Potter </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/narnia.jpg") }
            >

            <TouchableOpacity style = {styles.text} onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> Narnia </Text>
            </TouchableOpacity>
            
            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/chips.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> Mr. Chips </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/love.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> 40 rules of love </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/kite.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> Kite Runner </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/rings.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> Lord of the Rings </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/dreams.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> Men and Dreams </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/time.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> Leaving Time </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/tale.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> A tale of two cities </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/dark.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> The Dark Road </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/wilfred.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> Wilfred Owen </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>

        <View style = {styles.each}>
            <ImageBackground
                style = {styles.styling}
                source = { require("../../assets/Books/topeka.jpg") }
            >

            <TouchableOpacity style = {styles.text}  onPress = {() => navigation.navigate("HarryPotter")}>
                <Text style = {styles.txt}> Topeka school </Text>
            </TouchableOpacity>

            </ImageBackground>
        </View>        
    </View> */}

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
        flexWrap: "wrap"
    },
    each: {
        borderRadius: 10,
        overflow: "hidden",
        margin: "6%"
    },
    styling: {
        width: 130,
        height: 130,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        height: "22%",
        width: "80%",
        backgroundColor: '#4040bf',
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    txt: {
        color: "white"
    }
})

export default Books;