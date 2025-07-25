import axios from 'axios';
import API_URL from '../config/apiConfig';


export async function checkBackendConnection() {
    try {
        const response = await axios.get(`${API_URL}/healthcheck`);
        console.log('Backend connection successful:', response.data);
        return true;
    } catch (error) {
        console.error('Cannot reach backend:', {
            url: API_URL,
            error: error.message,
            response: error.response?.status
        });
        return false;
    }
}

// Call it when your app starts


export async function loginUser(email, password) {
    try {
        print(API_URL)
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);

        const response = await axios.post(`${API_URL}/auth/login`, params.toString(), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error; // Re-throw to handle in component
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    console.log("Logged out!")
};

export async function registerUser(email, password) {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
}