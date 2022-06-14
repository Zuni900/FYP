import React, {useEffect, useState} from "react";
import * as Contacts from "expo-contacts";
import {FlatList, StyleSheet, ImageBackground, View, Dimensions, Text} from "react-native";

import ContactList from "./ContactList";

const Contact = () => {

    const [contacts, setContacts] = useState([]);
    useEffect(() => {
        (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
            const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.PHONE_NUMBERS],
            });
            if (data.length > 0) {
                setContacts(data);
            }
        }
        })();
    }, []);

    const keyExtractor = (item, idx) => {
        return item?.id?.toString() || idx.toString();
    };

    const renderItem = ({ item, index }) => {
        return <ContactList contact = {item} />;
    };

    return (
        <ImageBackground
          style = {styles.container}
          source = { require ('../../assets/contacts.jpg') }
        >

            <View style = {styles.heading}>
                <Text style = {styles.top}> Emergency Contacts </Text>
            </View>

            <FlatList
              data = {contacts}
              renderItem = {renderItem}
              keyExtractor = {keyExtractor}
              style = {styles.list}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    heading: {
        marginTop: "30%",
        marginBottom: "18%",
        marginLeft: "4%"
    },
    top: {
        color: "white",
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    searchBar: {
        backgroundColor: '#f0eded',
        paddingHorizontal: 30,
        paddingVertical: Platform.OS === 'android' ? undefined : 15,
    },
    list: {
        flex: 1,
    },
});

export default Contact;