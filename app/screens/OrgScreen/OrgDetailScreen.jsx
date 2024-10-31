import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import HomeScreenHeader from "../../screens/HomeScreen/HomeScreenHeader";
import ContributionCard from './ContributionCard';

export default function OrgDetailScreen() {

    const route = useRoute();
    const { orgName } = route.params;

    return (
        // outer container 
        <View style={{ padding: 10, }}>

            {/* Organization Header  */}
            <HomeScreenHeader name={orgName} />

            {/* button start  */}
            <View style={{
                display: 'flex', flexDirection: 'row',
                justifyContent: 'space-between', paddingHorizontal: 8,
                marginTop: 16, marginBottom: 10,
            }}>
                <View style={styles.button}>
                    <Text
                        style={styles.buttonText}
                        onPress={() => router.push('/(tabs)/map')}>
                        Message
                    </Text>
                </View>
                <View style={styles.button}>
                    <Text
                        style={styles.buttonText}
                        onPress={() => router.push('/screens/OrgScreen/OrgListScreen')}>
                        Connect
                    </Text>
                </View>
            </View>
            {/* button end  */}

            <ScrollView>
                {/* Organization Bio  */}
                <View style={{
                    paddingHorizontal: 10, marginVertical: 15,
                    display: 'flex', flexDirection: 'column', justifyContent: 'start',
                }}>
                    <Text style={{ color: Colors.Swan, fontWeight: '500', fontSize: 18, }}>Bio</Text>
                    <Text style={{
                        color: Colors.Swan, fontWeight: '400', fontSize: 15,
                        marginTop: 8, lineHeight: 20
                    }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, tenetur! Lorem ipsum dolor sit
                        amet, consectetur adipisicing elit. Architecto, a!
                    </Text>
                </View>

                {/* Block Records  */}
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    display: 'flex', marginBottom: 10, paddingHorizontal: 10,
                }}>
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
                    {/* Contribution Block  */}
                    <View style={styles.card}>
                        <FontAwesome name="users" size={24} color={Colors.Swan} style={{ marginBottom: 14, }} />
                        <View style={{
                            display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 5
                        }}>
                            <Text style={{ color: Colors.Swan, fontSize: 18, fontWeight: '500', }}>10</Text>
                            <Text style={{ color: Colors.Swan, fontSize: 18, fontWeight: '500', }}>
                                Members
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 11, textTransform: 'capitalize', }}>Team Members</Text>
                        </View>
                    </View>
                </View>
                {/* Records end  */}

                {/* Records List start  */}
                {/* Home Screen Organization List  */}
                <View style={{
                    paddingHorizontal: 10, marginVertical: 10, marginBottom: 15,
                }}>
                    <Text style={{ color: Colors.Swan, fontWeight: '500', fontSize: 18, }}>Contribution Records</Text>
                </View>

                <View style={{ paddingHorizontal: 10, marginBottom: 250, }}>
                    <ContributionCard />
                    <ContributionCard />
                    <ContributionCard />
                    <ContributionCard />
                    <ContributionCard />
                </View>
                {/* Records List end  */}
            </ScrollView>

        </View>
    )
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
        justifyContent: 'start',
        gap: 15,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 99, // This makes the image circular
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
        color: Colors.white,
        fontSize: 16,
        fontWeight: '500'
    },
    card: {
        width: '48%',
        backgroundColor: Colors.Skin,
        borderRadius: 10,
        padding: 20,
        height: 120,
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center'
    },
})