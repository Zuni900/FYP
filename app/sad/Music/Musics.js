import * as React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, Image, ImageBackground} from 'react-native';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';
import MusicPlayerScreen from './MusicPlayerScreen';

const Tracks = [
  {
    id: 0,
    name: "Sajan Dasna - Coke Studio 14",
    img : require('../../assets/MusicImg/sajan.jpg'),
    track: require('../../assets/Songs/Sajan_Dasna.mp3'),
  },
  {
    id: 1,
    name: "Pasoori - Coke Studio 14",
    img : require('../../assets/MusicImg/pasoori.jpg'),
    track: require('../../assets/Songs/Pasoori.mp3'),
  },
  {
    id: 2,
    name: "Peechy Hat - Coke Studio 14",
    img : require('../../assets/MusicImg/peechyhat.jpg'),
    track: require('../../assets/Songs/Peechy_Hat.mp3'),
  },
];


function Musics (props) {

    const [Status, SetStatus] = React.useState(false);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
    const [isPlayerModalVisible, setisPlayerModalVisible] = useState(false);

    const [Loaded, SetLoaded] = React.useState(false);
    const [Loading, SetLoading] = React.useState(false);
    const [CurrentSong, SetCurrentSong] = React.useState(Tracks[0]);
    const sound = React.useRef(new Audio.Sound());

    // function song (){
    //     LoadAudio();
    //     return () => Unload();
    // }

    React.useEffect(() => {
        LoadAudio();
        return () => Unload();
    }, [CurrentSong, selectedMusic]);

    const Unload = async () => {
        await sound.current.unloadAsync();
    };

    const PlayAudio = async () => {
        try {
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
            if (result.isPlaying === false) {
                console.log('Playing Sound');
                sound.current.playAsync();
                SetStatus(true);
            }
        }
        } catch (error) {
        console.log(error);
        }
    };

    const PauseAudio = async () => {
        try {
        const result = await sound.current.getStatusAsync();
        if (result.isLoaded) {
            if (result.isPlaying === true) {
                sound.current.pauseAsync();
                SetStatus(false);
                console.log('Sound Paused');
            }
        }
        } catch (error) {
        console.log(error);
        }
    };

    const LoadAudio = async () => {
        SetLoaded(false);
        SetLoading(true);
        const checkLoading = await sound.current.getStatusAsync();
        if (checkLoading.isLoaded === false) {
        try {
            const result = await sound.current.loadAsync(
                CurrentSong.track,
                {},
                true
            );
            if (result.isLoaded === false) {
                SetLoading(false);
                console.log('Error in Loading Audio');
            } else {
                SetLoading(false);
                PlayAudio();
                SetLoaded(true);
            }
        } catch (error) {
            console.log(error);
            SetLoading(false);
        }
        } else {
        SetLoading(false);
        }
    };

    const NextSong = () => {
        if (selectedMusicIndex === 0) {
            return;
        }
        setSelectedMusic(
            Tracks[(selectedMusicIndex + 1) % Tracks.length],
        );
        setSelectedMusicIndex(selectedMusicIndex + 1);

        if (CurrentSong.id === Tracks[Tracks.length - 1].id) {
        SetCurrentSong(Tracks[0]);
        } else {
        SetCurrentSong(Tracks[CurrentSong.id + 1]);
        }
    };

    const PrevSong = () => {
        if (selectedMusicIndex === 0) {
            return;
        }
        setSelectedMusic(
            Tracks[(selectedMusicIndex - 1) % Tracks.length],
        );
        setSelectedMusicIndex(selectedMusicIndex - 1);

        if (CurrentSong.id === 0) {
        SetCurrentSong(Tracks[Tracks.length - 1]);
        } else {
        SetCurrentSong(Tracks[CurrentSong.id - 1]);
        }
    };

    const onSelectTrack = async (selectedTrack, index) => { 
        setSelectedMusic(selectedTrack);
        setSelectedMusicIndex(index);
    };

    const renderSingleMusic = ({item, index}) => {
        return (
        <>
            {index === 0}
            <Pressable 
                onPress = {() => onSelectTrack(item, index)} 
                style = {styles.line}
            > 
                <Image
                    resizeMode = "cover"
                    source = {item.img}
                    style = {styles.widgetImageStyle} 
                />
                <Text style = {styles.musicTitle}> {item.name} </Text>
            </Pressable>
            {/* <Text>Currently Playing : {CurrentSong.id}</Text> */}
        </>
        );
    };

  return (
    <ImageBackground
        style = {styles.container}
        source = { require ('../../assets/music.jpg') }
    >
    <View style = {styles.title}>
        <Text style = {styles.titletxt}> Music </Text>
    </View>

    <View style = {styles.container}>
        {selectedMusic && (
            <MusicPlayerScreen
            onCloseModal = {() => setisPlayerModalVisible(false)}
            isVisible = {isPlayerModalVisible}
            selectedMusic = {selectedMusic}
            status = {Status}
            onPlay = {PlayAudio}
            onPause = {PauseAudio}
            onNext = {NextSong}
            onPrev = {PrevSong}
        />
        )}

        <FlatList
            data = {Tracks}
            keyExtractor = {item => item.id}
            renderItem = {renderSingleMusic}
        />

        {selectedMusic && (
            <Pressable onPress = {() => setisPlayerModalVisible(true)}>
            <View style = {[styles.widgetContainer, {}]}>
                <View style = {{flexDirection: 'row'}}>
                    <Image
                        resizeMode = "cover"
                        source = {selectedMusic.img}
                        style = {styles.widgetImageStyle}
                    />
                    <View>
                        <Text style = {styles.musicTitle}>
                            {selectedMusic.name}
                        </Text>
                    </View>
                </View>

                <Pressable 
                    onPress = {Status === false ? () => PlayAudio() : () => PauseAudio()} 
                    style = {{paddingRight: 15}}
                >
                    {Status === false ? <FontAwesome5 name = "play" size = {23} color = "black" /> : <Ionicons name = "pause" size = {30} color = "black" />}
                </Pressable>
            </View>
            </Pressable>
        )}
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: "23%",
        marginBottom: "15%"
    },
    titletxt: {
        fontSize: 22,
        color: "white",
        marginLeft: "5%",
        textDecorationLine: "underline"
    },
    musicTitle: {
        fontSize: 17,
        color: 'black',
        marginTop: 15,
        marginHorizontal: 10
    },
    line: {
        position: 'relative',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#191970',
        flexDirection: "row"
    },
    widgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        width: '100%',
        backgroundColor: '#a995e8'
    },
    widgetImageStyle: {
        width: 55,
        height: 60
    }
});

export default Musics;