import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PinnedLocationCard from './PinnedLocationCard';

// temporary raw data
const pinnedLocations = [
    {
        state: 'Yangon State',
        cities: [
            {
                name: 'City 1',
                org: 'Organization A',
                timePinned: '2023-10-01T10:00:00Z',
                supplies: ['Food', 'Water'],
            },
            {
                name: 'City 2',
                org: 'Organization B',
                timePinned: '2023-10-02T11:00:00Z',
                supplies: ['Medicine', 'Clothes'],
            },
            {
                name: 'City 2',
                org: 'Organization B',
                timePinned: '2024-10-20T11:00:00Z',
                supplies: ['Medicine', 'Clothes'],
            },
            {
                name: 'City 2',
                org: 'Organization B',
                timePinned: '2023-10-02T11:00:00Z',
                supplies: ['Medicine', 'Clothes'],
            },
        ],
    },
    {
        state: 'Mandalay State',
        cities: [
            {
                name: 'City 1',
                org: 'Organization C',
                timePinned: '2023-10-03T12:00:00Z',
                supplies: ['Shelter', 'Blankets'],
            },
            {
                name: 'City 2',
                org: 'Organization D',
                timePinned: '2023-10-04T13:00:00Z',
                supplies: ['Food', 'Medicine'],
            },
        ],
    },
];

export default function PinnedLocationListScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* rendering  */}
            {pinnedLocations.map((stateData, stateIndex) => (
                <View key={stateIndex} style={styles.stateContainer}>
                    {/* State Title  */}
                    <Text style={styles.stateTitle}>{stateData.state}</Text>
                    {/* Pinned Location from state  */}
                    {stateData.cities.map((cityData, cityIndex) => (
                        // pinned location card component 
                        <PinnedLocationCard
                            key={cityIndex}
                            state={stateData.state}
                            city={cityData.name}
                            org={cityData.org}
                            date={cityData.timePinned}
                            supplies={cityData.supplies}
                        />
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 100,
    },
    stateContainer: {
        marginBottom: 20,
    },
    stateTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});