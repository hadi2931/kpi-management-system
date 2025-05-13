// Authentication Service
class AuthService {
    static isAuthenticated() {
        const token = localStorage.getItem('userToken');
        if (!token) return false;
        
        // Check if token is expired
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } catch (e) {
            return false;
        }
    }

    static getToken() {
        return localStorage.getItem('userToken');
    }

    static setToken(token) {
        localStorage.setItem('userToken', token);
    }

    static clearToken() {
        localStorage.removeItem('userToken');
    }

    static async checkAuthAndRedirect() {
        if (!this.isAuthenticated()) {
            // Use relative path
            window.location.href = '../index.html';
            return false;
        }

        // Try to refresh token if it exists but might be close to expiring
        const token = this.getToken();
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                // Refresh if token will expire in less than 5 minutes
                if (payload.exp - (Date.now() / 1000) < 300) {
                    await this.refreshToken();
                }
            } catch (e) {
                console.error('Error checking token expiration:', e);
            }
        }

        return true;
    }

    static async refreshToken() {
        try {
            const response = await fetch('../api/auth/refresh', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                this.setToken(data.token);
                return true;
            }
            
            // If refresh fails, clear token and redirect to login
            this.clearToken();
            window.location.href = '../index.html';
            return false;
        } catch (error) {
            console.error('Error refreshing token:', error);
            // On error, clear token and redirect to login
            this.clearToken();
            window.location.href = '../index.html';
            return false;
        }
    }
}

// Add authentication check on page load
document.addEventListener('DOMContentLoaded', async () => {
    await AuthService.checkAuthAndRedirect();
}); 