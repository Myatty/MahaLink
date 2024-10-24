import React from 'react';
import { ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import HomeScreenOrganizationList from '../HomeScreen/HomeScreenOrganizationList';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../../constants/Colors';

export default function OrgListScreen() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = () => {
        // Implement search functionality here
        console.log('Searching for:', searchQuery);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search organizations..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <FontAwesome name="search" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <HomeScreenOrganizationList />
                <HomeScreenOrganizationList />
                <HomeScreenOrganizationList />
                <HomeScreenOrganizationList />
                {/* Add more organization lists as needed */}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 15,
    },
    searchInput: {
        flex: 1,
        height: 50,
        borderColor: Colors.Gray,
        borderWidth: 1,
        marginRight: 10,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    searchContainer: {  
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 6,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 10,
        height: 50,
        borderRadius: 10,
        width: '15%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});