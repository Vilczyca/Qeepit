// mobile-app/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLogin } from '@shared/contexts/LoginContext';

export default function HomeScreen() {
    const { logout } = useLogin();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is the Home Screen</Text>
            <View style={styles.buttonContainer}>
                <Button title="Logout" onPress={logout} color="#d9534f" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    text: {
        fontSize: 24,
        marginBottom: 24,
    },
    buttonContainer: {
        marginTop: 16,
        width: '60%',
    },
});
