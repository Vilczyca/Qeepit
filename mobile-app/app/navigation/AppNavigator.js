import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { useLogin } from '@shared/contexts/LoginContext';
import api from '@shared/api/api';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { isAuthenticated, logout } = useLogin();
    // console.log('HomeScreen:', HomeScreen);

    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            res => res,
            err => {
                if (err.response?.status === 401) {
                    logout();
                    console.log("Logged out...");
                }
                return Promise.reject(err);
            }
        );
        return () => {
            api.interceptors.response.eject(interceptor);
        };
    }, [logout]);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
                    <Stack.Screen name="Home" component={HomeScreen} />
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
