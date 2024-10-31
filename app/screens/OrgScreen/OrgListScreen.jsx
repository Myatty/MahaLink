import { FontAwesome } from '@expo/vector-icons';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { db } from '../../../firebaseConfig';
import HomeScreenOrganizationList from '../HomeScreen/HomeScreenOrganizationList';
import { useNavigation } from '@react-navigation/native';

export default function OrgListScreen() {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [organizationNames, setOrganizationNames] = useState([]);
    const [filteredOrganizations, setFilteredOrganizations] = useState([]);
    const navigation = useNavigation();

    // Filter organizations based on search query
    useEffect(() => {
        const filtered = organizationNames.filter((name) =>
            name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredOrganizations(filtered);
    }, [searchQuery, organizationNames]);

    // fetch all usernames in firestore
    useEffect(() => {
        const fetchOrganizationNames = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Users"));
                const names = querySnapshot.docs.map(doc => doc.data().name || "Unknown");
                setOrganizationNames(names);
            } catch (error) {
                console.error("Error fetching organization names:", error);
            }
        };
        fetchOrganizationNames();
    }, []);

    // screen title
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Organizations',
            headerLeft: () => (
                <Button title="Back" onPress={() => navigation.goBack()} />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search organizations..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity onPress={() => console.log('Searching for:', searchQuery)} style={styles.searchBtn}>
                    <FontAwesome name="search" size={20} color={Colors.primaryGreen} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredOrganizations}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <HomeScreenOrganizationList name={item} />
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: Colors.white,
    },
    searchContainer: {
        display: 'flex',
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor:  Colors.primaryGreen,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },  
    itemText: {
        fontSize: 16,
    },
    searchBtn: {
        padding: 10,
        backgroundColor: Colors.tailwind.updatedBg,
        borderRadius: 5,
    }
});