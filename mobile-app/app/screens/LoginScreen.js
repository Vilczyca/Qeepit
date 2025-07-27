import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
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

            <Text>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                autoCapitalize="none"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleChange('email', text)}
            />
            {errors.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="#999"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleChange('password', text)}
            />
            {errors.password && <Text style={styles.error}>{errors.password}</Text>}

            {errors.form && <Text style={styles.error}>{errors.form}</Text>}
            {infoMessage && <Text style={styles.info}>{infoMessage}</Text>}

            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.button, styles.signInButton]}
                    onPress={() => handleAuth('login')}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.createAccountButton]}
                    onPress={() => handleAuth('register')}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Creating...' : 'Create Account'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        color: '#333',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    info: {
        color: 'green',
        marginBottom: 10,
    },
    buttonGroup: {
        gap: 10,
        marginTop: 10,
    },
    button: {
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInButton: {
        backgroundColor: 'black',
    },
    createAccountButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});