import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/Colors'
import HomScreenHeader from '../screens/HomeScreen/HomeScreenHeader'
import HomeScreenOrganizationList from '../screens/HomeScreen/HomeScreenOrganizationList'
import HomeScreenRecord from '../screens/HomeScreen/HomeScreenRecord'

export default function home() {

    const router = useRouter();

    return (
        // header section of the home page

        <View style={styles.container}>
            {/* Home Screen Header  */}
            <HomScreenHeader />

            <ScrollView>
                {/* Home Screen record section  */}
                <HomeScreenRecord />

                {/* Home Screen Organization List  */}
                <View style={{
                    padding: 10, paddingHorizontal: 20, display: 'flex',
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 10
                }}>
                    <Text style={{ color: Colors.Swan, fontWeight: '500', fontSize: 18, }}>Connect with others</Text>
                    <Text style={{ color: Colors.Blue, fontWeight: '500', textDecorationLine: 'underline' }} onPress={() => router.push('/screens/OrgScreen/OrgListScreen')}>View all</Text>
                </View>

                <View style={{ paddingHorizontal: 15, }}>
                    <HomeScreenOrganizationList />
                    <HomeScreenOrganizationList />
                    <HomeScreenOrganizationList />
                    <HomeScreenOrganizationList />
                </View>
            </ScrollView>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 30,
    },

    textColor: {
        color: 'red'
    }
})