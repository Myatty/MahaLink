import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

export default function ContributionCard() {
    return (
        // outer container 
        <View style={{ marginBottom: 10 }}>
            <View style={styles.container}>
                {/* Date and Time start */}
                <View style={{
                    display: 'flex', flexDirection: 'row', alignItems: 'start',
                    justifyContent: 'space-between', width: '100%', marginBottom: 20
                }}>
                    <Text style={styles.dateAndTimeText}>
                        <FontAwesome name="calendar" size={14} color={Colors.Swan} /> 12/12/2021
                    </Text>
                    <Text style={styles.dateAndTimeText}>
                        <FontAwesome name="clock-o" size={14} color={Colors.Swan} /> 12:00 PM
                    </Text>
                </View>
                {/* Date and Time end  */}
                {/* Location and Supplies start  */}
                <View style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'start',
                    justifyContent: 'space-between', width: '100%', gap: 10
                }}>
                    {/* Locatin section  */}
                    <View style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'start',
                        width: '100%', gap: 10, flexWrap: 'wrap',
                    }}>
                        <Text style={styles.locationAndSupplies}>
                            Location :
                        </Text>
                        <Text style={{ color: Colors.Swan, fontSize: 15, fontWeight: 'bold', }}>
                            Yangon
                        </Text>
                    </View>
                    {/* Location Section end  */}
                    {/* Supplies section start  */}
                    <View style={{
                        display: 'flex', flexDirection: 'row', alignItems: 'start',
                        width: '100%', gap: 10, flexWrap: 'wrap'
                    }}>
                        <Text style={styles.locationAndSupplies}>
                            Supplies
                        </Text>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 5, flexWrap: 'wrap' }}>
                            <Text style={styles.supplies}>
                                Medicine
                            </Text>
                            <Text style={styles.supplies}>
                                Water
                            </Text>
                            <Text style={styles.supplies}>
                                Medicine
                            </Text>
                            <Text style={styles.supplies}>
                                Medicine
                            </Text>
                            <Text style={styles.supplies}>
                                Medicine
                            </Text>
                        </View>
                    </View>
                    {/* Supplies section end  */}
                </View>
                {/* Location and Supplies end  */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: Colors.white,
        alignItems: 'start',
        justifyContent: 'start',
        paddingHorizontal: 17,
        paddingVertical: 20,
        height: 'auto',
        width: '100%',
        borderRadius: 20,
        borderColor: Colors.Gray,
        borderWidth: 1,
    },
    dateAndTimeText: {
        color: Colors.Swan,
        fontSize: 13,
        fontWeight: '400',
        fontWeight: '400',
    },
    locationAndSupplies: {
        color: Colors.Blue,
        fontSize: 17,
        fontWeight: '500',
        marginBottom: 4
    },
    supplies: {
        color: Colors.Swan,
        fontSize: 15,
        fontWeight: '500',
        backgroundColor: Colors.LightGray,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 10,
    }

})