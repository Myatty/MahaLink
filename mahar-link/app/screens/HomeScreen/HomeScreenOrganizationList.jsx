import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/Colors';

export default function HomeScreenOrganizationList() {

    const router = useRouter();

    return (
        // outer container 
        <View style={{ paddingHorizontal: 4, marginBottom: 10 }}>
            <View style={styles.container}>
                {/* User profile and info  */}
                <View style={styles.innerContainer}>
                    <Image
                        source={require('../../../assets/images/profile.png')}
                        style={styles.image}
                    />
                    {/* user information  */}
                    <View>

                        {/* Organization name  */}
                        <Text style={{
                            color: Colors.primary, fontSize: 15,
                            fontWeight: '400', fontWeight: 'bold',
                            marginBottom: 8
                        }}>
                            Doh Eain <FontAwesome name="check-circle" size={15} color={Colors.strongGreen} style={{ marginRight: 5 }} />
                        </Text>

                        <View style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center',
                            justifyContent: 'start', gap: 5,
                        }}>
                            {/* team number  */}
                            <View style={{
                                display: 'flex', flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'start', gap: 1, color: Colors.Gray, backgroundColor: Colors.Gray,
                                padding: 3, width: 40, borderRadius: 10, paddingLeft: 8,
                            }}>
                                <FontAwesome name="user-o" size={13} color={Colors.Swan} style={{ marginRight: 5 }} />
                                <Text style={{ fontSize: 13, }}>5</Text>
                            </View>
                        </View>

                    </View>
                </View>
                {/* view and message buttons  */}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                    {/* <TouchableOpacity style={{
                        backgroundColor: Colors.Blue, padding: 10, borderRadius: 10,
                    }}>
                        <FontAwesome name="comment-o" size={15} color={Colors.white} style={styles.notificationIcon} />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        style={{
                            backgroundColor: Colors.Blue, padding: 10, borderRadius: 10,
                        }}
                        onPress={() => router.push('/screens/OrgScreen/OrgDetailScreen')}
                    >
                        <FontAwesome name="eye" size={15} color={Colors.white} style={styles.notificationIcon} />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 15,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 99, // This makes the image circular
    }
})