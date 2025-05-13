// KPI Data Service
class KPIService {
    static async getAllKPIs() {
        try {
            const response = await fetch('/api/kpis', {
                headers: {
                    'Authorization': `Bearer ${AuthService.getToken()}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to fetch KPIs');
            return await response.json();
        } catch (error) {
            console.error('Error fetching KPIs:', error);
            throw error;
        }
    }

    static async getKPIById(id) {
        try {
            const response = await fetch(`/api/kpis/${id}`, {
                headers: {
                    'Authorization': `Bearer ${AuthService.getToken()}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to fetch KPI');
            return await response.json();
        } catch (error) {
            console.error(`Error fetching KPI ${id}:`, error);
            throw error;
        }
    }

    static async createKPI(kpiData) {
        try {
            const response = await fetch('/api/kpis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthService.getToken()}`
                },
                body: JSON.stringify(kpiData)
            });
            
            if (!response.ok) throw new Error('Failed to create KPI');
            return await response.json();
        } catch (error) {
            console.error('Error creating KPI:', error);
            throw error;
        }
    }

    static async updateKPI(id, kpiData) {
        try {
            const response = await fetch(`/api/kpis/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${AuthService.getToken()}`
                },
                body: JSON.stringify(kpiData)
            });
            
            if (!response.ok) throw new Error('Failed to update KPI');
            return await response.json();
        } catch (error) {
            console.error(`Error updating KPI ${id}:`, error);
            throw error;
        }
    }

    static async deleteKPI(id) {
        try {
            const response = await fetch(`/api/kpis/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${AuthService.getToken()}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to delete KPI');
            return true;
        } catch (error) {
            console.error(`Error deleting KPI ${id}:`, error);
            throw error;
        }
    }
} 