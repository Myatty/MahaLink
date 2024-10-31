
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/Colors';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export default function HomeScreenHeader({ name }) {

    const router = useRouter();

    return (
        <View style={{ padding: 10 }}>
            <View style={styles.container} className="bg-updatedBg">
                <View style={styles.innerContainer} >
                    <Image
                        source={require('../../../assets/images/profile.png')}
                        style={styles.image}
                    />
                    <View>
                        <Text style={{ color: Colors.primaryGreen, fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
                        <Text style={{ color: Colors.primaryGreen, fontSize: 15, fontWeight: '400' }}>Organization Type</Text>
                    </View>
                </View>
                {/* nofification icon  */}
                <FontAwesome onPress={() => router.push('/screens/NotificationScreen/NotificationCenterScreen')} name="bell" size={24} color={Colors.Swan} style={styles.notificationIcon} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.tailwind.updatedBg,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingRight: 30,
        height: 130,
        width: '100%',
        borderRadius: 25,
        color: Colors.primaryGreen,
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 99, // This makes the image circular
    },
    notificationIcon: {
        marginLeft: 'auto',
    },
});
