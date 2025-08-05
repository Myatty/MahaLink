import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/Colors';

export default function GroupCard({ townshipName, profileImage, teamNumber, type, message, user }) {
    const router = useRouter();

    // Function SUPPOSE to truncate message if word count exceeds 10
    // btw this funciton doesnt work, but i won't delete it since its a relic 
    const truncateMessage = (msg) => {
        if (!msg) return ''; 
        const words = msg.split(' ');
        if (words.length > 10) {
            return words.slice(0, 10).join(' ') + '...';
        }
        return msg;
    };

    return (
        <View style={{ marginBottom: 10 }}>
            {/* Card starts here */}
            <TouchableOpacity
                style={styles.container}
                onPress={() => router.push({
                    pathname: '/screens/ChatScreen/GroupChatScreen',
                    params: { townshipName, type }
                })}
            >
                {/* User profile and info */}
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }} >
                    {/* User information */}
                    <View style={styles.innerContainer}>
                        <Image
                            source={profileImage}
                            style={styles.image}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.townshipName}>
                                {townshipName}
                            </Text>

                            {/* {type === 'group' && ( */}
                                {/* <View style={styles.teamBadgeContainer}> */}
                                    {/* Team member badge */}
                                    {/* <View style={styles.teamNumberContainer}>
                                        <FontAwesome name="user-o" size={13} color={Colors.Swan} style={{ marginRight: 5 }} />
                                        <Text style={{ fontSize: 13 }}>{teamNumber}</Text>
                                    </View> */}
                                {/* </View> */}
                            {/* )} */}

                            <View>
                                <Text style={{ fontSize: 14, color: Colors.Swan, marginTop: 5 }}>
                                    {type !== 'group' && townshipName + ': '} {truncateMessage(message)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* button  */}
                    <TouchableOpacity
                        style={{
                            padding: 10, borderRadius: 10,
                        }}
                        onPress={() => router.push({
                            pathname: '/screens/ChatScreen/GroupChatScreen',
                            params: { townshipName, type }
                        })}
                    >
                        <FontAwesome name="chevron-right" size={15} color={Colors.Swan} style={styles.notificationIcon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 1,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    townshipName: {
        color: Colors.primaryGreen,
        fontSize: 15,
        fontWeight: 'bold',
    },
    teamBadgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    teamNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: Colors.Gray,
        padding: 3,
        width: 'auto',
        borderRadius: 10,
        paddingHorizontal: 8,
    },
    notificationIcon: {
        marginRight: 5,
    },
});