import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/Colors';

export default function HomeScreenHeader() {
    return (
        // outer container 
        <View style={{ padding: 10, }}>
            <View style={styles.container}>
                {/* User profile and info  */}
                <View style={styles.innerContainer}>
                    <Image
                        source={require('../../../assets/images/profile.png')}
                        style={styles.image}
                    />
                    {/* user information  */}
                    <View>
                        <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold', }}>Sam</Text>
                        <Text style={{ color: Colors.white, fontSize: 15, fontWeight: '400' }}>Organization Name</Text>
                    </View>
                </View>
                {/* nofification icon  */}
                <FontAwesome name="bell" size={24} color={Colors.white} style={styles.notificationIcon} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingRight: 30,
        height: 130,
        width: '100%',
        borderRadius: 25,
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 15,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 99, // This makes the image circular
    }
})