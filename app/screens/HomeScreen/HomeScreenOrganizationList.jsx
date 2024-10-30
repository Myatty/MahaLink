import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/Colors';

export default function HomeScreenOrganizationList({ name, teamNumber }) { // Accept props for name and teamNumber
    const router = useRouter();

    return (
        <View style={{ paddingHorizontal: 4, marginBottom: 10 }}>
            <View style={styles.container}>

                <View style={styles.innerContainer}>
                    <Image
                        source={require('../../../assets/images/profile.png')}
                        style={styles.image}
                    />
                    <View>

                        <Text style={styles.orgName}>
                            {name} <FontAwesome name="check-circle" size={15} color={Colors.strongGreen} />
                        </Text>
                        {/* <View style={styles.teamContainer}>
                            
                            <View style={styles.teamNumberContainer}>
                                <FontAwesome name="user-o" size={13} color={Colors.Swan} style={{ marginRight: 5 }} />
                                <Text style={{ fontSize: 13 }}>{16}</Text>
                            </View>
                        </View> */}
                    </View>
                </View>

                {/* View button */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => router.push('/screens/OrgScreen/OrgDetailScreen')}
                    >
                        <FontAwesome name="eye" size={15} color={Colors.Swan} style={styles.notificationIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.LightGray,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 17,
        paddingRight: 20,
        height: 90,
        width: '100%',
        borderRadius: 20,
        borderColor: Colors.Gray,
        borderWidth: 1,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 99,
    },
    orgName: {
        color: Colors.Swan,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    teamContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    teamNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.Gray,
        padding: 3,
        width: 40,
        borderRadius: 10,
        paddingLeft: 8,
    },
    viewButton: {
        backgroundColor: Colors.Gray,
        padding: 10,
        borderRadius: 10,
    },
});
