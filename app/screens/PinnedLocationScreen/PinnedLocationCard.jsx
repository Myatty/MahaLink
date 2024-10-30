import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../constants/Colors';

export default function PinnedLocationCard({ state, city, org, date, supplies }) {
    return (
        <View style={styles.container}>
            <View style={styles.stateContainer}>
                <View style={styles.cityContainer}>
                    <Text style={styles.cityName}>{city}</Text>
                    <Text style={styles.orgName}>{org}</Text>
                    <Text style={styles.supplies}>
                        Supplies: {supplies.join(', ')}
                    </Text>
                    <Text style={styles.timePinned}>
                        Pinned: {moment(date).fromNow()}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    stateContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    cityContainer: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
        position: 'relative',
    },
    cityName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: Colors.Swan,
    },
    orgName: {
        fontSize: 18,
        // fontStyle: 'italic',
        marginBottom: 5,
        color: Colors.primaryGreen,
    },
    timePinned: {
        fontSize: 14,
        color: '#999',
        position: 'absolute',
        top: 10,
        right: 10,
    },
    supplies: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.Blue,
    },
});
