import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
const todoList = [
    { id: '1', text: 'Image1' },
    { id: '2', text: 'Image2' },
    { id: '3', text: 'Image3' },
];
const Separator = () => <View style={styles.itemSeparator} />;
const LeftSwipeActions = () => {
    return (
        <View
            style={{ flex: 1, backgroundColor: 'red', justifyContent: 'center' }}
        >
            <Text
                style={{
                    color: '#40394a',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                }}
            >
                Disliked
            </Text>
        </View>
    );
};
const rightSwipeActions = () => {
    return (
        <View
            style={{ flex: 1, backgroundColor: '#ccffbd', justifyContent: 'center' }}
        >
            <Text
                style={{
                    color: '#40394a',
                    paddingHorizontal: 10,
                    fontWeight: '600',
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                }}
            >
                Liked
            </Text>
        </View>
    );
};
const swipeFromLeftOpen = () => {
    alert('You dislike this profile');
};
const swipeFromRightOpen = () => {
    alert('You like this profile');
};


const ListItem = ({ text }) => (
    <GestureHandlerRootView>
        <Swipeable
            renderLeftActions={LeftSwipeActions}
            renderRightActions={rightSwipeActions}
            onSwipeableRightOpen={swipeFromRightOpen}
            onSwipeableLeftOpen={swipeFromLeftOpen}
        >
            <View
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                    backgroundColor: 'white',
                }}
            >

                <View style={styles.image}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require("../assets/room1.jpg")} style={{
                            height: 100,
                            width: 100,
                        }} />
                    </View>
                    <View style={{ backgroundColor: 'grey', paddingVertical: 10 }}>
                        <Text>Swipe right to like or left to dislike</Text>
                    </View>

                </View>
            </View>
        </Swipeable>
    </GestureHandlerRootView>
);
const SwipeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={todoList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ListItem {...item} />}
                ItemSeparatorComponent={() => <Separator />}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        backgroundColor: "white",
        height: 160,
        borderWidth: 1
    },
    itemSeparator: {
        flex: 1,
        height: 1,
        backgroundColor: '#444',
    },
});
export default SwipeScreen;