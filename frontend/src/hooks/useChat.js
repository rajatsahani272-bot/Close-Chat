
import { useCallback, useState } from 'react';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [error, setError] = useState('');

  const loadMessages = useCallback(async (fetchMessages) => {
    if (!fetchMessages) return;

    setLoading(true);
    setError('');

    try {
      const result = await fetchMessages();
      setMessages(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err?.message || 'Could not load messages.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addMessage = useCallback((message) => {
    if (!message) return;

    setMessages((current) => {
      const id = message._id;

      if (id && current.some((item) => item._id === id)) {
        return current;
      }

      return [...current, message];
    });
  }, []);

  const updateMessage = useCallback((messageId, updates) => {
    setMessages((current) =>
      current.map((message) =>
        message._id === messageId
          ? { ...message, ...updates }
          : message
      )
    );
  }, []);

  const removeMessage = useCallback((messageId) => {
    setMessages((current) =>
      current.filter((message) => message._id !== messageId)
    );
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setTyping(false);
    setError('');
  }, []);

  return {
    messages,
    loading,
    typing,
    error,
    setTyping,
    setError,
    loadMessages,
    addMessage,
    updateMessage,
    removeMessage,
    clearChat,
    setMessages,
  };
}

export default useChat;
