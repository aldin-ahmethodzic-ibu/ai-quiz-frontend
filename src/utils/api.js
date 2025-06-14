const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const api = {
    get: async (endpoint) => {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('token_type') || 'Bearer';
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `${tokenType} ${token}`
            },
            credentials: 'include',
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.detail || 'Request failed');
        }

        return data;
    },
    
    post: async (endpoint, data) => {
        const token = localStorage.getItem('token');
        const tokenType = localStorage.getItem('token_type') || 'Bearer';
        
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${tokenType} ${token}`
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.detail || 'Request failed');
        }

        return responseData;
    }
}; 