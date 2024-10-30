import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/Colors';

export default function HomeScreenRecord() {

    const router = useRouter();

    return (
        <View style={styles.container}>

            {/* Record start  */}
            <Text style={{ color: Colors.Swan, fontWeight: '500', fontSize: 18, }}>Records</Text>

            {/* Block  */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, display: 'flex', marginBottom: 0, }}>
                {/* Contribution Block  */}
                <View style={styles.card}>
                    <FontAwesome name="handshake-o" size={24} color={Colors.Swan} style={{ marginBottom: 14, }} />
                    <View style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5
                    }}>
                        <Text style={{ color: Colors.Swan, fontSize: 18, fontWeight: '500', }}>10</Text>
                        <Text style={{ color: Colors.Swan, fontSize: 18, fontWeight: '500', }}>
                            Contribution
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 11, textTransform: 'capitalize', }}>total contributions</Text>
                    </View>
                </View>
                {/* Location pined Block  */}
                <TouchableOpacity onPress={() => router.push('/screens/PinnedLocationScreen/PinnedLocationListScreen')} style={styles.card}>
                    <FontAwesome name="map-o" size={24} color={Colors.Swan} style={{ marginBottom: 14, }} />
                    <View style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5
                    }}>
                        <Text style={{ color: Colors.Swan, fontSize: 18, fontWeight: '500', }}>10</Text>
                        <Text style={{ color: Colors.Swan, fontSize: 18, fontWeight: '500', }}>
                            Location
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 11, textTransform: 'capitalize', }}>pinned location lists</Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Record end  */}

            {/* button start  */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                <View style={styles.button}>
                    <Text
                        style={styles.buttonText}
                        onPress={() => router.push('/(tabs)/map')}>
                        <FontAwesome name="compass" size={20} color={Colors.Swan} /> Explore Map
                    </Text>
                </View>
                <View style={styles.button}>
                    <Text
                        style={styles.buttonText}
                        onPress={() => router.push('/screens/OrgScreen/OrgListScreen')}>
                        <FontAwesome name="link" size={20} color={Colors.Swan} /> Start Connect
                    </Text>
                </View>
            </View>
            {/* button end  */}


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    card: {
        width: '48%',
        backgroundColor: Colors.LightYellow,
        borderRadius: 10,
        padding: 20,
        height: 120,
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: Colors.Gray,
        padding: 10,
        height: 50,
        borderRadius: 10,
        width: '48%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: Colors.primary,
        // borderWidth: 2
    },
    buttonText: {
        color: Colors.Swan,
        fontSize: 16,
        fontWeight: '500'
    }
})