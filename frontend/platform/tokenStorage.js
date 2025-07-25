export const saveToken = async (token) => {
    localStorage.setItem('token', token);
};

export const getToken = async () => {
    return localStorage.getItem('token');
};

export const removeToken = async () => {
    localStorage.removeItem('token');
};
