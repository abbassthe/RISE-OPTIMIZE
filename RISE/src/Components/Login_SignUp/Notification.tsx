import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen: React.FC = () => {
    const navigation = useNavigation();

    // Function to navigate back to Friends screen
    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Back button */}
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                {/* Title wrapper */}
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Notifications</Text>
                </View>
            </View>

            {/* Search bar */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchBarInput}
                    placeholder="Search notifications..."
                    placeholderTextColor="#aaa"
                />
            </View>

            {/* Content */}
            <View style={styles.content}>
                {/* If no notifications are present, display message */}
                <Text style={styles.noNotificationsText}>You have no new notifications.</Text>
                {/* Otherwise, display notifications list */}
                {/* Add your notifications list here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 40, // Added padding to move content below status bar
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center', // Align elements vertically
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    backButton: {
        marginRight: 10,
    },
    backText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 5, // Lower "Back" slightly
    },
    titleWrapper: {
        flex: 1, // Make this view take up remaining space
        justifyContent: 'center', // Center content horizontally within this view
        alignItems: 'center', // Center content vertically within this view
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 55,
    },
    searchBar: {
        marginTop: 0, // Add margin to position below title
        marginBottom: 10, // Add margin for spacing
        marginHorizontal: 20, // Add horizontal margin
        paddingHorizontal: 10, // Add padding for text input
        backgroundColor: 'white', // Light background for search bar
        borderRadius: 5, // Rounded corners for search bar
        borderWidth: 1,
        borderColor: 'grey',
        height: 40,
    },
    searchBarInput: {
        marginTop: 9,
        fontSize: 16,
        color: 'black',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noNotificationsText: {
        fontSize: 18,
        color: 'gray',
    },
});

export default NotificationsScreen;
