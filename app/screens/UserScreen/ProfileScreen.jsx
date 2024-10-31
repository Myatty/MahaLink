import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../../constants/Colors';
import HomeScreenHeader from '../HomeScreen/HomeScreenHeader';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            {/* profile header  */}
            <HomeScreenHeader />

            {/* edit and loguot start  */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 11, gap: 10 }}>
                <View style={styles.button}>
                    <Text
                        style={styles.buttonText}
                        onPress={() => { }}>
                        Edit
                    </Text>
                </View>
                <View style={styles.logoutButton}>
                    <Text
                        style={styles.logoutText}
                        onPress={() => { }}>
                        Logout
                    </Text>
                </View>
            </View>
            {/* edit and logout end  */}

            <View style={styles.descriptionWrapper}>
                {/* bio information  */}
                <Text style={{ color: Colors.Swan, fontWeight: 'bold', fontSize: 18, }}>Bio</Text>
                <Text style={styles.description}>
                    This is a brief description of the organization. It provides an overview of the mission, vision, and values.
                </Text>

                {/* contact information  */}
                {/* email  */}
                <Text style={{ color: Colors.Swan, fontWeight: 'bold', fontSize: 18, marginBottom: 7, }}>Contact</Text>
                <Text style={styles.contact}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <FontAwesome name="envelope" size={18} color={Colors.primary} style={{ marginRight: 20 }} />
                        <Text>contact@organization.com</Text>
                    </View>
                </Text>
                {/* facebook  */}
                <Text style={styles.contact}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <FontAwesome name="facebook" size={18} color={Colors.primary} style={{ marginRight: 20 }} />
                        <Text style={{ marginLeft: 6.6, }}>https://www.facebook.com/org.com</Text>
                    </View>
                </Text>
                {/* linkedin  */}
                <Text style={styles.contact}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <FontAwesome name="linkedin" size={18} color={Colors.primary} style={{ marginRight: 20 }} />
                        <Text style={{ marginLeft: 4, }}>https://www.likedin.com/org.com</Text>
                    </View>
                </Text>
                {/* website  */}
                <Text style={styles.contact}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <FontAwesome name="link" size={18} color={Colors.primary} style={{ marginRight: 20 }} />
                        <Text style={{ marginLeft: 3, }}>https://www.org.com</Text>
                    </View>
                </Text>
            </View>



            {/* just for further upgrade  */}
            <View style={{ padding: 12, }}>
                {/* export contribution data button  */}
                <View style={styles.exportButton}>
                    <Text
                        style={styles.exportText}
                        onPress={() => { }}>
                        <FontAwesome name="file" size={18} color={Colors.tailwind.primary} style={{ marginRight: 10 }} /> Export Contribution Records
                    </Text>
                </View>

                <Text style={{
                    paddingHorizontal: 5, fontSize: 15, color: Colors.Red,
                    fontWeight: 'bold', marginTop: 20, marginBottom: 10,
                }}>Danger Zone</Text>

                {/* delete account button  */}
                <View style={styles.deleteButton}>
                    <Text
                        style={styles.deleteText}
                        onPress={() => { }}>
                        <FontAwesome name="ban" size={18} color={Colors.Red} style={{ marginRight: 10 }} /> Delete Account
                    </Text>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        padding: 7,
        marginTop: 40,
    },
    descriptionWrapper: {
        padding: 14,
    },
    description: {
        fontSize: 16,
        textAlign: 'justify',
        marginVertical: 10,
        color: Colors.Swan,
        marginBottom: 20,
    },
    contact: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: 'bold',
        marginVertical: 5,
        width: '100%',
    },
    button: {
        backgroundColor: Colors.Blue,
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
        color: Colors.Gray,
        fontSize: 16,
        fontWeight: '500'
    }
    ,
    logoutButton: {
        backgroundColor: Colors.LightRed,
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
    logoutText: {
        color: Colors.Red,
        fontSize: 16,
        fontWeight: '500'
    },
    exportButton: {
        width: '100%',
        // backgroundColor: Colors.LightGreen,
        // borderColor: Colors.tailwind.primary,
        padding: 10,
        textAlign: 'center',
        borderRadius: 10,
        marginBottom: 10,
        // backgroundColor: Colors.Gray,
    },
    exportText: {
        color: Colors.tailwind.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        width: '100%',
        // borderColor: Colors.Red,
        // backgroundColor: Colors.Gray,
        padding: 10,
        textAlign: 'center',
        // borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
    },
    deleteText: {
        color: Colors.Red,
        fontSize: 16,
        fontWeight: 'bold',
    },
});