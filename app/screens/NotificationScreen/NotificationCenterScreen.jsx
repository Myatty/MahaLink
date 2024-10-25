import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import NotificationCard from './NotificationCard';

const notifications = [
    { id: '1', type: 'message', content: 'This is the first notification', timestamp: '2023-10-01T10:00:00Z', sender: 'User1' },
    { id: '2', type: 'system', content: 'This is the second notification', timestamp: '2023-10-02T11:00:00Z' },
    { id: '3', type: 'message', content: 'This is the third notification', timestamp: '2023-10-03T12:00:00Z', sender: 'User2' },
];

export default function NotificationCenterScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* rendering notification  */}
            {notifications.map(notification => (
                <NotificationCard
                    key={notification.id}
                    type={notification.type}
                    content={notification.content}
                    timestamp={notification.timestamp}
                    sender={notification.sender}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginBottom: 50,
    },
});