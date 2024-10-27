import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/Colors';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";

export default function HomeScreenHeader() {
    const [organizationName, setOrganizationName] = useState('Organization Name');
    const [userName, setUserName] = useState('Sam');

    // Fetch user data from Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    console.log("User is signed in:", user.uid);
                    const userRef = doc(db, "Users", user.uid); // Reference to the user's document
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        const userData = userSnap.data();
                        console.log("Fetched user data:", userData);
                        setUserName(userData.name || 'Sam'); // Use userData.name
                        setOrganizationName(userData.organization || 'Organization Name'); // Ensure organizationName is set
                    } else {
                        console.log("No such document!");
                    }
                } else {
                    console.log("No user is currently signed in.");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <View style={{ padding: 10 }}>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Image
                        source={require('../../../assets/images/profile.png')}
                        style={styles.image}
                    />
                    <View>
                        <Text style={{ color: Colors.white, fontSize: 20, fontWeight: 'bold' }}>{userName}</Text>
                        <Text style={{ color: Colors.white, fontSize: 15, fontWeight: '400' }}>{organizationName}</Text>
                    </View>
                </View>
                <FontAwesome name="bell" size={24} color={Colors.white} style={styles.notificationIcon} />
            </View>
        </View>
    );
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
