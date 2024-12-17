const handleResponse = async (response) => {
    if (!response.ok) {
        const errorBody = await response.text();
        console.error('Error response body:', errorBody);
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const fetchFromAPI = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        return await handleResponse(response);
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}; 