import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { LoginProvider } from '@shared/contexts/LoginContext';
import AppNavigator from './app/navigation/AppNavigator';
import {checkBackendConnection} from "../shared/api/auth";
import { setApiUrl } from '@shared/config/apiConfig';

import { setTokenGetter } from '@shared/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

setApiUrl(process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8000');
setTokenGetter(() => AsyncStorage.getItem('token')); // dla React Native

export default function App() {
    // checkBackendConnection();

    setApiUrl(process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8000');

    return (
        <LoginProvider>
            <AppNavigator />
        </LoginProvider>
    );
}
