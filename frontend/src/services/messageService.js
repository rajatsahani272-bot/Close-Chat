
import api from './api';

const messageService = {
  async getMessages(conversationId, { cursor, limit = 30 } = {}) {
    const params = new URLSearchParams();
    params.set('limit', String(limit));

    if (cursor) params.set('cursor', cursor);

    const response = await api.get(
      `/conversations/${encodeURIComponent(conversationId)}/messages?${params}`
    );

    return response?.data?.messages ?? response?.messages ?? response?.data ?? [];
  },

  async sendMessage(conversationId, content) {
    return api.post(
      `/conversations/${encodeURIComponent(conversationId)}/messages`,
      { content }
    );
  },

  async deleteMessage(messageId) {
    return api.delete(`/messages/${encodeURIComponent(messageId)}`);
  },
};

export default messageService;
