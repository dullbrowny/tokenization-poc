import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const tokenizeData = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/tokenize`, { data });
        return response.data;
    } catch (error) {
        console.error("Error tokenizing data:", error);
        throw error;
    }
};

export const detokenizeData = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/detokenize`, { token });
        return response.data;
    } catch (error) {
        console.error("Error detokenizing data:", error);
        throw error;
    }
};

