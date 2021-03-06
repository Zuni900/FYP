import * as React from 'react';
import {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, Dimensions, Image, ImageBackground} from 'react-native';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';

import QuranScreen from './QuranScreen';

const Tracks = [
    {
        id: 0,
        name: "Asma-ul-Husna",
        img : require('../../assets/Img/0.jpg'),
        track: require('../../assets/Verses/Asma-ul-Husna.mp3'),
    },
    {
        id: 1,
        name: "Verse 1",
        img : require('../../assets/Img/1.jpg'),
        track: require('../../assets/Verses/1.mp3'),
    },
    {
        id: 2,
        name: "Verse 2",
        img : require('../../assets/Img/2.jpg'),
        track: require('../../assets/Verses/2.mp3'),
    },
    {
        id: 3,
        name: "Verse 3",
        img : require('../../assets/Img/3.jpg'),
        track: require('../../assets/Verses/3.mp3'),
    },
    {
        id: 4,
        name: "Verse 4",
        img : require('../../assets/Img/4.jpg'),
        track: require('../../assets/Verses/4.mp3'),
    },
    {
        id: 5,
        name: "Verse 5",
        img : require('../../assets/Img/5.jpg'),
        track: require('../../assets/Verses/5.mp3'),
    },
    {
        id: 6,
        name: "Verse 6",
        img : require('../../assets/Img/6.jpg'),
        track: require('../../assets/Verses/6.mp3'),
    },
    {
        id: 7,
        name: "Verse 7",
        img : require('../../assets/Img/7.jpg'),
        track: require('../../assets/Verses/7.mp3'),
    },
    {
        id: 8,
        name: "Verse 8",
        img : require('../../assets/Img/8.jpg'),
        track: require('../../assets/Verses/8.mp3'),
    },
    {
        id: 9,
        name: "Verse 9",
        img : require('../../assets/Img/9.jpg'),
        track: require('../../assets/Verses/9.mp3'),
    },
    {
        id: 10,
        name: "Verse 10",
        img : require('../../assets/Img/3.jpg'),
        track: require('../../assets/Verses/10.mp3'),
    },
    {
        id: 11,
        name: "Verse 11",
        img : require('../../assets/Img/7.jpg'),
        track: require('../../assets/Verses/11.mp3'),
    },
];

function Quran (props) {

    const [Status, SetStatus] = React.useState(false);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
    const [isPlayerModalVisible, setisPlayerModalVisible] = useState(false);

    const [Loaded, SetLoaded] = React.useState(false);
    const [Loading, SetLoading] = React.useState(false);
    const [CurrentSong, SetCurrentSong] = React.useState(Tracks[0]);
    const sound = React.useRef(new Audio.Sound());

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
        if (CurrentSong.id[0] === Tracks[Tracks.length - 1].id) {
            SetCurrentSong(Tracks[0]);
        } else {
            SetCurrentSong(Tracks[CurrentSong.id + 1]);
            setSelectedMusic(
                Tracks[(selectedMusicIndex + 1) % Tracks.length],
            );
            setSelectedMusicIndex(selectedMusicIndex + 1);
        }

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
        SetCurrentSong(selectedTrack)
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
        </>
        );
    };

  return (
    <ImageBackground
        style = {styles.container}
        source = { require ('../../assets/background/islamic.jpg') }
    >
    <View style = {styles.title}>
        <Text style = {styles.titletxt}> Quran </Text>
    </View>

    <View style = {styles.container}>
        {selectedMusic && (
            <QuranScreen
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
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    title: {
        marginTop: "30%",
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

export default Quran;