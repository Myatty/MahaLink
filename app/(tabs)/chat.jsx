import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';
import { auth, db } from '../../firebaseConfig'; // Ensure you have Firebase initialized and configured
import ChartCard from '../screens/ChatScreen/ChartCard';
import GroupCard from '../screens/ChatScreen/GroupCard';

export default function Chat() {
    const [userName, setUserName] = useState("");
    const [townshipChats, setTownshipChats] = useState([]);
    const [selectedTownship, setSelectedTownship] = useState("");

    // Fetch user data and set userName
    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "Users", user.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    setUserName(userData.name || "Loading");
                    fetchUserTownships(userData.name);
                    console.log('Fetched user:', userData.name);
                }
            }
        };
        fetchUserData();
    }, []);

    const fetchUserTownships = async (userName) => {
        console.log('Fetching townships for user:', userName);

        try {
            const markersQuery = query(
                collection(db, "Markers"),
                where("pinnedBy", "==", userName)
            );

            const querySnapshot = await getDocs(markersQuery);
            if (querySnapshot.empty) {
                console.log("No matching documents found.");
            } else {
                const townships = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    console.log("Document data:", data);

                    if (data.township && !townships.includes(data.township)) {
                        townships.push(data.township);
                    }
                });

                console.log("Final list of townships:", townships);
                setTownshipChats(townships);
                if (townships.length > 0) setSelectedTownship(townships[0]);
            }
        } catch (error) {
            console.error("Error fetching townships:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ color: Colors.Swan, fontWeight: '600', fontSize: 18, marginBottom: 10 }}>Chats</Text>
            <ScrollView>

                {/* Global Chat */}
                <View style={styles.sectionHeader}>
                    <FontAwesome name="globe" size={15} color={Colors.Swan} style={styles.notificationIcon} />
                    <Text style={styles.sectionText}>Global Chat</Text>
                </View>
                <ChartCard organizationName="Global" message="Message from Global Chat" type="global" profileImage={require('../../assets/images/profile.png')} />
                {/* Dynamic Township Group Chats */}
                <View style={styles.sectionHeader}>
                    <FontAwesome name="users" size={15} color={Colors.Swan} style={styles.notificationIcon} />
                    <Text style={styles.sectionText}>Group Chat</Text>
                </View>
                {townshipChats && townshipChats.length > 0 ? (
                    townshipChats.map((township, index) => (
                        <GroupCard
                            key={index}
                            organizationName={`Group: ${township}`}
                            message={`Message from ${township} group`}
                            teamNumber={10} // Adjust this number as needed
                            type="group"
                            profileImage={require('../../assets/images/profile.png')}
                        />
                    ))
                ) : (
                    <Text style={styles.noTownshipText}>No township groups available</Text>
                )}

                {/* Individual Chats */}
                <View style={styles.sectionHeader}>
                    <FontAwesome name="comments" size={15} color={Colors.Swan} style={styles.notificationIcon} />
                    <Text style={styles.sectionText}>Others</Text>
                </View>
                <ChartCard organizationName="Org 1" type="individual" profileImage={require('../../assets/images/profile.png')} message="Hello Org 1" />
                <ChartCard organizationName="Org 2" type="individual" profileImage={require('../../assets/images/profile.png')} message="Hello Org 2" />
                <ChartCard organizationName="Org 3" type="individual" profileImage={require('../../assets/images/profile.png')} message="Hello Org 3" />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 7,
        marginBottom: 10,
    },
    sectionText: {
        color: Colors.Swan,
        fontWeight: '500',
        fontSize: 16,
    },
    noTownshipText: {
        color: Colors.Swan,
        fontStyle: 'italic',
        fontSize: 14,
        marginBottom: 10,
    },
});
