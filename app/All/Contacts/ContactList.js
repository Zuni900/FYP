import React from "react";
import * as SMS from 'expo-sms';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";

const ContactList = ({ contact }) => {

    const [smsAvailable, setSmsAvailable] = React.useState(false);

    const onComposeSms = React.useCallback(async () => {
        if (smsAvailable) {
        await SMS.sendSMSAsync(
            [contact?.phoneNumbers[0]?.number],
            'Need Help! Contact ASAP',
        );
        }
    }, [smsAvailable]);

    React.useEffect(() => {
        SMS.isAvailableAsync().then(setSmsAvailable);
    }, []);

    return (
        <View style = {styles.contactCon}>
            <View style = {styles.imgCon}>
                <View style = {styles.placeholder}>
                    <Text style = {styles.txt}> {contact?.name[0]} </Text>
                </View>
            </View>

            <View style = {styles.contactDat}>
                <Text style = {styles.name}> {contact?.name} </Text>
                <Text style = {styles.phoneNumber}> {contact?.phoneNumbers[0]?.number} </Text>
            </View> 

            <TouchableOpacity style = {styles.noteSend} onPress = {onComposeSms} disabled = {!smsAvailable}>
                <Text> Send SMS </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    contactCon: {
        flex: 1,
        flexDirection: "row",
        padding: 5,
        borderBottomWidth: 0.5,
        borderBottomColor: "#d9d9d9",
    },
    imgCon: {},
        placeholder: {
        width: 55,
        height: 55,
        borderRadius: 30,
        overflow: "hidden",
        backgroundColor: "#d9d9d9",
        alignItems: "center",
        justifyContent: "center",
    },
    contactDat: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 5,
    },
    txt: {
        fontSize: 18,
    },
    name: {
        fontSize: 16,
    },
    phoneNumber: {
        color: "#888",
    },
    noteSend:{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a3b9fe',
        padding: 5,
        top: 10,
        bottom: 10,
        right: 10,
    }
});
export default ContactList;