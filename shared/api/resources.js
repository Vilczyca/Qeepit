// shared/api/resources.js
import axios from 'axios';
import * as tokenStorage from '@platform/tokenStorage';

let API_URL;

if (typeof window !== 'undefined') {
    // Browser environment (Vite/React)
    API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
} else if (typeof process !== 'undefined') {
    // Node/React Native environment
    API_URL = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:8000';
} else {
    // Default fallback
    API_URL = 'http://localhost:8000';
}

const getAuthHeader = async () => {
    const token = await tokenStorage.getToken();
    return { Authorization: `Bearer ${token}` };
};

export const fetchItems = async () => {
    const headers = await getAuthHeader();
    const res = await axios.get(`${API_URL}/resources/`, { headers });
    return res.data;
};

export const addItem = async (item) => {
    const headers = await getAuthHeader();
    const res = await axios.post(`${API_URL}/resources/`, item, { headers });
    return res.data;
};

export const updateItem = async (item) => {
    const headers = await getAuthHeader();
    const res = await axios.put(`${API_URL}/resources/${item.id}`, item, { headers });
    return res.data;
};

export const deleteItem = async (id) => {
    const headers = await getAuthHeader();
    await axios.delete(`${API_URL}/resources/${id}`, { headers });
};
