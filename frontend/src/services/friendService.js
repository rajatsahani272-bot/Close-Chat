
import api from './api';

const friendService = {
  async searchUsers(username) {
    const response = await api.get(
      `/users/search?username=${encodeURIComponent(username)}`
    );

    return response?.data?.users ?? response?.users ?? response?.data ?? [];
  },

  async getFriends() {
    const response = await api.get('/friends');
    return response?.data?.friends ?? response?.friends ?? response?.data ?? [];
  },

  async getRequests(type = 'incoming') {
    const response = await api.get(
      `/friends/requests?type=${encodeURIComponent(type)}`
    );

    return response?.data?.requests ?? response?.requests ?? response?.data ?? [];
  },

  async sendRequest(userId) {
    return api.post('/friends/requests', { userId });
  },

  async cancelRequest(requestId) {
    return api.delete(`/friends/requests/${encodeURIComponent(requestId)}`);
  },

  async acceptRequest(requestId) {
    return api.patch(
      `/friends/requests/${encodeURIComponent(requestId)}/accept`
    );
  },

  async rejectRequest(requestId) {
    return api.patch(
      `/friends/requests/${encodeURIComponent(requestId)}/reject`
    );
  },

  async removeFriend(friendId) {
    return api.delete(`/friends/${encodeURIComponent(friendId)}`);
  },
};

export default friendService;
