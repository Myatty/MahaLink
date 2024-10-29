import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../constants/Colors';
import ChartCard from '../screens/ChatScreen/ChartCard';

export default function chat() {
    return (
        <View style={styles.container}>

            {/* Chat start  */}
            <Text style={{ color: Colors.Swan, fontWeight: '600', fontSize: 18, marginBottom: 10 }}>Chats</Text>
            <ScrollView>

                {/* Chat Crad start  */}
                {/* for the global chat  */}
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 7, marginBottom: 10 }}>
                    <FontAwesome name="globe" size={15} color={Colors.primary} style={styles.notificationIcon} />
                    <Text style={{ color: Colors.primary, fontWeight: '500', fontSize: 16, }}>Global Chat</Text>
                </View>
                <ChartCard organizationName="Global" message='mesg from globe' type="global" profileImage={require('../../assets/images/profile.png')} />

                {/* for the team group chart  */}
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 7, marginBottom: 10 }}>
                    <FontAwesome name="users" size={15} color={Colors.primary} style={styles.notificationIcon} />
                    <Text style={{ color: Colors.primary, fontWeight: '500', fontSize: 16, }}>Group Chat</Text>
                </View>
                <ChartCard organizationName="Group (Your Org Name)" message="mesg from group" teamNumber={10} type="group" profileImage={require('../../assets/images/profile.png')} />

                {/* for the chat with other organzation  */}
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'start', gap: 7, marginBottom: 10 }}>
                    <FontAwesome name="comments" size={15} color={Colors.primary} style={styles.notificationIcon} />
                    <Text style={{ color: Colors.primary, fontWeight: '500', fontSize: 16, }}>Others</Text>
                </View>
                <ChartCard organizationName="Org 1" type="individual" profileImage={require('../../assets/images/profile.png')} message='hello org 1' />
                <ChartCard organizationName="Org 2" type="individual" profileImage={require('../../assets/images/profile.png')} message='hello org 2' />
                <ChartCard organizationName="Org 3" type="individual" profileImage={require('../../assets/images/profile.png')} message='hello org 3' />

            </ScrollView>
            {/* Chart Card end  */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
})