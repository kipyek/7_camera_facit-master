import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { projectImages } from '../DummyData/Data';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [desc, setDesc] = useState('');
    const [listData, setListData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('ProfileData');
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    setListData(parsedData)
                }
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        }
        fetchData();
    }, [])
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.image}>
                <Image source={require("../assets/room1.jpg")} style={{
                    height: 100,
                    width: 100,
                }} />
            </View>
            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder='Enter your email'
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setPhone(text)}
                value={phone}
                placeholder='Enter your phone number'
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setDesc(text)}
                value={desc}
                placeholder='Enter your phone description'
            />
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: "bold" }}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center"
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        backgroundColor: 'grey',
        padding: 16,
        marginHorizontal: 12,
        alignItems: 'center',
        borderRadius: 12
    }
})