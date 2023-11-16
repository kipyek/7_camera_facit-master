import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const LikedScreen = () => {
    return (
        <View>
            <View
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                    backgroundColor: 'white',
                }}
            >

                <View style={styles.image}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require("../assets/room2.jpg")} style={{
                            height: 300,
                            width: 300,
                        }} />
                    </View>

                </View>
            </View>
        </View>
    )
}

export default LikedScreen

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: "center"
    },
})