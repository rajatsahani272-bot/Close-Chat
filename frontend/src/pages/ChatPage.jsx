
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import ChatHeader from '../components/chat/ChatHeader';
import MessageList from '../components/chat/MessageList';
import MessageComposer from '../components/chat/MessageComposer';
import FriendList from '../components/friends/FriendList';
import { useAuth } from '../hooks/useAuth';
import { useResponsive } from '../hooks/useResponsive';
import { useChat } from '../hooks/useChat';
import friendService from '../services/friendService';
import messageService from '../services/messageService';
import EmptyState from '../components/common/EmptyState';
import Loader from '../components/common/Loader';
import './ChatPage.css';

function ChatPage() {
  const { user } = useAuth();
  const { isMobile } = useResponsive();
  const { friendId } = useParams();
  const navigate = useNavigate();

  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendsLoading, setFriendsLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  const {
    messages,
    loading,
    typing,
    error,
    loadMessages,
    addMessage,
    removeMessage,
    clearChat,
  } = useChat();

  useEffect(() => {
    let active = true;

    friendService.getFriends()
      .then((result) => {
        if (active) setFriends(result);
      })
      .catch((err) => {
        if (active) setPageError(err.message || 'Could not load friends.');
      })
      .finally(() => {
        if (active) setFriendsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!friendId) {
      setSelectedFriend(null);
      clearChat();
      return;
    }

    const friend = friends.find(
      (item) => String(item._id) === String(friendId)
    );

    if (friend) setSelectedFriend(friend);
  }, [friendId, friends, clearChat]);

  useEffect(() => {
    if (!selectedFriend?._id) return;

    let active = true;

    loadMessages(async () => {
      const result = await messageService.getMessages(
        selectedFriend.conversationId || selectedFriend._id
      );

      return active ? result : [];
    });

    return () => {
      active = false;
    };
  }, [selectedFriend, loadMessages]);

  async function handleSend(content) {
    if (!selectedFriend) return;

    const result = await messageService.sendMessage(
      selectedFriend.conversationId || selectedFriend._id,
      content
    );

    const message = result?.data?.message ?? result?.message ?? result?.data;

    if (message) addMessage(message);
  }

  async function handleDelete(messageId) {
    await messageService.deleteMessage(messageId);
    removeMessage(messageId);
  }

  function openChat(friend) {
    setSelectedFriend(friend);
    navigate(`/chat/${friend._id}`);
  }

  if (friendsLoading) {
    return (
      <div className="chat-page__loading">
        <Loader />
      </div>
    );
  }

  const showConversation = Boolean(selectedFriend);

  return (
    <section className={`chat-page ${showConversation ? 'chat-page--conversation' : ''}`}>
      {(!isMobile || !showConversation) && (
        <aside className="chat-page__friends">
          <div className="chat-page__section-heading">
            <div>
              <h1>Messages</h1>
              <p>Your conversations</p>
            </div>
            <MessageCircle size={21} />
          </div>

          {pageError ? (
            <p className="chat-page__error" role="alert">{pageError}</p>
          ) : (
            <FriendList
              friends={friends}
              onOpenChat={openChat}
            />
          )}
        </aside>
      )}

      {showConversation ? (
        <div className="chat-page__conversation">
          <ChatHeader
            friend={selectedFriend}
            onBack={isMobile ? () => navigate('/chat') : undefined}
          />

          {error && (
            <p className="chat-page__error" role="alert">{error}</p>
          )}

          <MessageList
            messages={messages}
            currentUserId={user?._id}
            loading={loading}
            typing={typing}
            onDeleteMessage={handleDelete}
          />

          <MessageComposer onSend={handleSend} />
        </div>
      ) : (
        <div className="chat-page__placeholder">
          <EmptyState
            title="Select a conversation"
            description="Choose a friend to start messaging."
          />
        </div>
      )}
    </section>
  );
}

export default ChatPage;
