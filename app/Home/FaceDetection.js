import React, {useState, useEffect, useRef} from "react";
import {StyleSheet, View, TouchableOpacity, ToastAndroid} from "react-native";
import {Camera} from "expo-camera";
import {postFlaskData} from "../constants/api";
import {useIsFocused} from "@react-navigation/native";

function FaceDetection({ navigation }) {

    const [hasPermission, setHasPermission] = useState();
    const [Image, setImage] = useState("");
    const focus = useIsFocused();

    let camera = useRef();

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      })();
    }, [focus]);

    if (hasPermission === false) {
      return alert("No permisssion granted");
    }
    
    const __takePicture = async () => {
      // let res = await camera.getAvailablePictureSizesAsync("4:3");
      // console.log(res);
      const photo = await camera.takePictureAsync();
      let content = photo?.uri;
      const file = {
        uri: content,
        name: content?.slice(content?.lastIndexOf("/") + 1),
        type: "image/jpg",
      };
      setImage(file);
      await FlaskUpload(file);
      console.log("photo is ", file);
    };

    const FlaskUpload = async (Img1) => {

      const body1 = new FormData();
      body1.append("file", Img1);

      try {
        var res = await postFlaskData(body1);
        var json = JSON.stringify(res);

        if (res?.data?.dominant_emotion == "happy") 
        {
          navigation.navigate("HappyNavigator", {
            screen: "Feed",
            params: { data: res.data },
          });
          console.log("res--", res.data);
          console.log(res.data.dominant_emotion);
        }

        else if (res?.data?.dominant_emotion == "sad") 
        {
          navigation.navigate("SadNavigator", {
            screen: "Feed",
            params: { data: res.data },
          });
          console.log("res--", res.data);
          console.log(res.data.dominant_emotion);
        }

        else if (res?.data?.dominant_emotion == "angry") 
        {
          navigation.navigate("AngryNavigator", {
            screen: "Feed",
            params: { data: res.data },
          });
          console.log("res--", res.data);
          console.log(res.data.dominant_emotion);
        }

        else if (res?.data?.dominant_emotion == "surprise") 
        {
          navigation.navigate("SurpriseNavigator", {
            screen: "Feed",
            params: { data: res.data },
          });
          console.log("res--", res.data);
          console.log(res.data.dominant_emotion);
        }

        else if (
          res?.data?.dominant_emotion == "disgust" ||
          res?.data?.dominant_emotion == "fear" ||
          res?.data?.dominant_emotion == "neutral" 
        ){
          window.alert("Specify mood was not detected try again.")
        } 
        
        else {
          window.alert("Error Occured please try again.")
          ToastAndroid.show(
            "Please try again",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          //"Specify mood was not detected try again."
          console.log("else result ", res.data);
        }
      } 
      
      catch (error) {
        console.error(error);
      }
    };

    return (
      <View style = {{ flex: 1, width: "100%" }}>
          <Camera
              style = {{ flex: 1, width: "100%" }}
              pictureSize = "640x480"
              type = {Camera.Constants.Type.back}
              ref = {(r) => {camera = r}}
          ></Camera>

          <View style = {styles.v1}>
              <View style = {styles.v2}>
                  <TouchableOpacity 
                      onPress = {() => __takePicture()}
                      style = {styles.button}
                  />
              </View>
          </View>
      </View>
    );
}
const styles = StyleSheet.create({
    v1: {
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        flex: 1,
        width: "100%",
        padding: 20,
        justifyContent: "space-between"
    },
    v2: {
        flex: 1,
        alignSelf: "center",
        alignItems: "center"
    },
    button: {
        width: 70,
        height: 70,
        bottom: 0,
        borderRadius: 50,
        backgroundColor: "#fff"
    },
});

export default FaceDetection;
