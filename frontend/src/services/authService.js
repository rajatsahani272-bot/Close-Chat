
import api from './api';

const authService = {
  async register(details) {
    const response = await api.post('/auth/register', details);
    return response?.data?.user ?? response?.user ?? response?.data ?? null;
  },

  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    return response?.data?.user ?? response?.user ?? response?.data ?? null;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response?.data?.user ?? response?.user ?? response?.data ?? null;
  },

  async logout() {
    return api.post('/auth/logout');
  },
};

export default authService;
