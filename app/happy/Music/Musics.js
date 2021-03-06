import * as React from 'react';
import {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, Dimensions, Image, ImageBackground} from 'react-native';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';
import MusicPlayerScreen from './MusicPlayerScreen';

const Tracks = [
    {
        id: 0,
        name: "Sajan Dasna - Atif Aslam",
        img : require('../../assets/Img/sajan.jpg'),
        track: require('../../assets/Songs/Sajan_Dasna.mp3'),
    },
    {
        id: 1,
        name: "Perfect - Ed Sheeran",
        img : require('../../assets/Img/perfect.jpg'),
        track: require('../../assets/Songs/Perfect.mp3'),
    },
    {
        id: 2,
        name: "Iraaday - Abdul Hanan",
        img : require('../../assets/Img/iraady.jpg'),
        track: require('../../assets/Songs/Iraaday.mp3'),
    },
    {
        id: 3,
        name: "Away - Markvard",
        img : require('../../assets/Img/away.jpg'),
        track: require('../../assets/Songs/Away.mp3'),
    },
    {
        id: 4,
        name: "Pasoori - Ali Sethi & Shae Gill",
        img : require('../../assets/Img/pasoori.jpg'),
        track: require('../../assets/Songs/Pasoori.mp3'),
    },
    {
        id: 5,
        name: "Hymn For The Weekend - Coldplay",
        img : require('../../assets/Img/hymn.jpg'),
        track: require('../../assets/Songs/Hymn.mp3'),
    },
    {
        id: 6,
        name: "Love Nwantiti - Ckay",
        img : require('../../assets/Img/love.jpg'),
        track: require('../../assets/Songs/Ckay.mp3'),
    },
    {
        id: 7,
        name: "Happier - Marshmello",
        img : require('../../assets/Img/happier.jpg'),
        track: require('../../assets/Songs/Happier.mp3'),
    },
    {
        id: 8,
        name: "Peechy Hat - Hassan Raheem",
        img : require('../../assets/Img/peechyhat.jpg'),
        track: require('../../assets/Songs/Peechy_Hat.mp3'),
    },
    {
        id: 9,
        name: "Dark Horse - Katy Perry",
        img : require('../../assets/Img/dark.jpg'),
        track: require('../../assets/Songs/DarkHorse.mp3'),
    },
    {
        id: 10,
        name: "Why not? - Young Stunners",
        img : require('../../assets/Img/why.jpg'),
        track: require('../../assets/Songs/WhyNot.mp3'),
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
        source = { require ('../../assets/background/music.jpg') }
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

export default Musics;