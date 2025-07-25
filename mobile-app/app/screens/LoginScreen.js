import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { loginUser, registerUser } from '@shared/api/auth';
import { useLogin } from '@shared/contexts/LoginContext';

export default function LoginScreen({ navigation }) {
    const { login } = useLogin();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [infoMessage, setInfoMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Min. 8 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAuth = async (type) => {
        setErrors({});
        setInfoMessage('');
        if (!validate()) return;

        setLoading(true);
        try {
            if (type === 'register') {
                await registerUser(formData.email, formData.password);
                setInfoMessage('Registration successful. Now sign in.');
            } else {
                const data = await loginUser(formData.email, formData.password);
                login(data.access_token);
                navigation.navigate('Home');
            }
        } catch (error) {
            setErrors({
                form: error?.response?.data?.detail || 'Operation failed',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            {errors.form && <Text style={styles.error}>{errors.form}</Text>}
            {infoMessage && <Text style={styles.info}>{infoMessage}</Text>}

            <View style={styles.buttonGroup}>
                <Button
                    title={loading ? 'Signing in...' : 'Sign In'}
                    onPress={() => handleAuth('login')}
                    disabled={loading}
                />
                <Button
                    title={loading ? 'Creating...' : 'Create Account'}
                    onPress={() => handleAuth('register')}
                    disabled={loading}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, flex: 1, justifyContent: 'center' },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: {
        borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10,
        borderRadius: 5,
    },
    error: { color: 'red', marginBottom: 10 },
    info: { color: 'green', marginBottom: 10 },
    buttonGroup: { gap: 10, marginTop: 10 },
});
