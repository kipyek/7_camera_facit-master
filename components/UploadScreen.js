import React, { Fragment, useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import { Button, Image, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as MediaLibrary from "expo-media-library";

const UploadScreen = ({ navigation }) => {


    const cameraRef = useRef();
    const [hasPermission, setHasPermission] = useState(null);
    const [imagesArr, setImagesArr] = useState([]);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [loading, setLoading] = useState(false);

    /*UseEffect kører når komponenten bliver kørt ved hvert render en gang*/
    useEffect(() => {
        (async () => {
            /*Få camera permissions*/
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!');
            }

            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            /*Brug state til at styre perimissions*/
            setHasPermission(status === 'granted');
        })();
    }, []);


    useEffect(() => {
        AsyncStorage.setItem("ProfileData", JSON.stringify(imagesArr))
    }, [imagesArr])

    /*Hvis du ikke har Permission, returner nothing*/
    if (hasPermission === null) {
        return <View />;
    }

    /*Hvis du ikke har accepteret*/
    if (hasPermission === false) {
        return (
            <View style={styles.gallery}>
                <Text>No access to camera</Text>
                <Button title={"Change settings"} onPress={() => Linking.openSettings()} />
            </View>
        )
    }


    const CameraGallery = () => {
        return (
            <View style={styles.gallery}>
                <Text style={styles.buttonGallery}>Billeder taget: {imagesArr.length}</Text>
                <ScrollView horizontal={true} >
                    {
                        imagesArr.length > 0
                            ? imagesArr.map((image, index) => (
                                <TouchableOpacity key={index} style={{ paddingHorizontal: 10 }} onPress={() => navigation.navigate('image', { image: image.uri })} >
                                    <Image source={{ uri: image.uri }} style={{ width: 100, height: 200 }} />
                                </TouchableOpacity>
                            ))
                            : <Text style={{ color: "white" }}> No images taken </Text>
                    }
                </ScrollView>
            </View>
        )
    };

    /*Vælg billeder fra telefonen*/
    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImagesArr((imagesArr) => [result].concat(imagesArr));
            console.log(imagesArr[0].assets[0]?.uri)
        }
    };

    return (
        <Fragment>
            <StatusBar StatusBarStyle="dark-content" style={{ fontcolor: "white" }} backgroundColor={'rgba(255,255,255,0.4)'} />
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "column", alignContent: "center", flex: 1, padding: 20 }}>



                        {/*Gir sig selv*/}


                        {/*Skift retning på kamera*/}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={pickImage}
                        >
                            <Text style={styles.text}> Upload Profile </Text>
                        </TouchableOpacity>

                        {/**<CameraGallery /> */}
                        <View style={styles.image}>
                            <Image source={require("../assets/room1.jpg")} style={{
                                height: 100,
                                width: 100,
                            }} />
                        </View>
                    </View>
                </View>
            </View>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: "space-between",
        flexDirection: 'row',
        marginHorizontal: 5,
    },
    buttonGallery: {
        fontSize: 15,
        color: "white",
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: "grey",
        padding: 10
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    gallery: {
        flex: 0.4,
        paddingTop: 20,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 100,
        width: 100,
        borderWidth: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center"
    },
});

export default UploadScreen;