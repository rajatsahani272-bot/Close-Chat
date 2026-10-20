import { useMemo, useState } from 'react';
import {
  Avatar, Badge, Box, Button, CssBaseline, Divider, IconButton,
  InputAdornment, Paper, TextField, ThemeProvider, Tooltip,
  Typography, createTheme, Snackbar, Alert
} from '@mui/material';
import {
  Add, ArrowBack, Check, CheckCircle, Delete, EmojiEmotionsOutlined,
  MoreHoriz, Search, Send, SettingsOutlined, ShieldOutlined,
  SmsOutlined, PeopleAlt, PersonAddAlt1, X, ArrowDownward
} from '@mui/icons-material';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ff795f' },
    secondary: { main: '#92efc2' },
    background: { default: '#101116', paper: '#171920' },
    text: { primary: '#f0f1f4', secondary: '#9094a2' }
  },
  typography: { fontFamily: '"Inter", "Segoe UI", sans-serif' },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 650 } } },
    MuiIconButton: { styleOverrides: { root: { transition: 'background .2s, transform .2s' } } }
  }
});

const initialChats = [
  { id: 'priya', name: 'Priya Sharma', username: 'priya_sharma', initials: 'PS', color: '#ffb3a5', preview: 'Thanks! 😊', time: '10:42 PM', unread: 2, messages: [
    { id: 1, from: 'them', text: 'Hey! How are you?', time: '10:39 PM' },
    { id: 2, from: 'me', text: 'I am good! What about you?', time: '10:40 PM', read: true },
    { id: 3, from: 'them', text: 'All good! Are you working on CloseChat?', time: '10:41 PM' },
    { id: 4, from: 'me', text: 'Yes, building something cool. 😄', time: '10:41 PM', read: true },
    { id: 5, from: 'them', text: 'It is looking great already!', time: '10:42 PM' },
    { id: 6, from: 'me', text: 'Thanks! 😊', time: '10:42 PM', read: true }
  ]},
  { id: 'rahul', name: 'Rahul Mehta', username: 'rahul_mehta', initials: 'RM', color: '#a9c8ff', preview: 'Let’s catch up tomorrow.', time: '9:18 PM', unread: 0, messages: [
    { id: 1, from: 'them', text: 'Free tomorrow evening?', time: '9:17 PM' },
    { id: 2, from: 'me', text: 'Yes, let’s catch up tomorrow.', time: '9:18 PM', read: true }
  ]},
  { id: 'sneha', name: 'Sneha Patel', username: 'sneha_patel', initials: 'SP', color: '#d6b7ff', preview: 'That sounds good!', time: 'Yesterday', unread: 0, messages: [
    { id: 1, from: 'me', text: 'Want to study together this weekend?', time: 'Yesterday', read: true },
    { id: 2, from: 'them', text: 'That sounds good!', time: 'Yesterday' }
  ]},
  { id: 'aditya', name: 'Aditya Singh', username: 'aditya_singh', initials: 'AS', color: '#f4d18b', preview: 'Okay 👍', time: 'Yesterday', unread: 0, messages: [{ id: 1, from: 'them', text: 'Okay 👍', time: 'Yesterday' }]},
  { id: 'neha', name: 'Neha Gupta', username: 'neha_gupta', initials: 'NG', color: '#92efc2', preview: 'See you soon!', time: 'Monday', unread: 0, messages: [{ id: 1, from: 'me', text: 'See you soon!', time: 'Monday', read: true }]}
];

const people = [
  { id: 'p1', name: 'Aarav Verma', username: 'aarav_verma', initials: 'AV', color: '#a9c8ff' },
  { id: 'p2', name: 'Ananya Kapoor', username: 'ananya_k', initials: 'AK', color: '#ffb3a5' },
  { id: 'p3', name: 'Kabir Joshi', username: 'kabir_joshi', initials: 'KJ', color: '#92efc2' }
];

const navItems = [
  { id: 'chats', label: 'Messages', icon: SmsOutlined },
  { id: 'friends', label: 'Friends', icon: PeopleAlt },
  { id: 'search', label: 'Find people', icon: Search },
  { id: 'requests', label: 'Requests', icon: PersonAddAlt1 }
];

function PersonAvatar({ person, size = 46 }) {
  return <Avatar sx={{ width: size, height: size, bgcolor: person.color, color: '#171920', fontWeight: 800, fontSize: size * .3, flexShrink: 0 }}>{person.initials}</Avatar>;
}

function AppContent() {
  const [chats, setChats] = useState(initialChats);
  const [selectedId, setSelectedId] = useState('priya');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [activeNav, setActiveNav] = useState('chats');
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [requests, setRequests] = useState([
    { id: 'r1', name: 'Ishita Rao', username: 'ishita_rao', initials: 'IR', color: '#d6b7ff' },
    { id: 'r2', name: 'Dev Malhotra', username: 'dev_m', initials: 'DM', color: '#f4d18b' }
  ]);
  const [friends, setFriends] = useState(chats.map(({ id, name, username, initials, color }) => ({ id, name, username, initials, color })));
  const [sentRequests, setSentRequests] = useState([]);
  const [notice, setNotice] = useState('');
  const selected = chats.find(chat => chat.id === selectedId) || null;

  const filteredChats = useMemo(() => {
    const term = search.trim().toLowerCase();
    return chats.filter(chat => `${chat.name} ${chat.username} ${chat.preview}`.toLowerCase().includes(term));
  }, [chats, search]);

  const filteredPeople = useMemo(() => {
    const term = search.trim().toLowerCase();
    return people.filter(person => `${person.name} ${person.username}`.toLowerCase().includes(term));
  }, [search]);

  function openChat(person) {
    let existing = chats.find(chat => chat.id === person.id);
    if (!existing) {
      existing = { ...person, preview: 'Start a conversation', time: '', unread: 0, messages: [] };
      setChats(current => [...current, existing]);
      setFriends(current => current.some(item => item.id === person.id) ? current : [...current, person]);
    }
    setSelectedId(person.id);
    setActiveNav('chats');
    setMobileChatOpen(true);
    setSearch('');
  }

  function sendMessage(event) {
    event.preventDefault();
    const content = message.trim();
    if (!content || !selected) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const outgoing = { id: `${Date.now()}-${Math.random()}`, from: 'me', text: content, time, read: false };
    setChats(current => current.map(chat => chat.id === selected.id
      ? { ...chat, preview: content, time, messages: [...chat.messages, outgoing] }
      : chat));
    setMessage('');
    setEmojiOpen(false);
  }

  function deleteMessage(messageId) {
    if (!selected) return;
    setChats(current => current.map(chat => chat.id === selected.id
      ? { ...chat, messages: chat.messages.filter(item => item.id !== messageId) }
      : chat));
    setNotice('Message removed from this demo.');
  }

  function handleRequest(id) {
    const person = requests.find(item => item.id === id);
    if (person) {
      setFriends(current => current.some(item => item.id === id) ? current : [...current, person]);
      setRequests(current => current.filter(item => item.id !== id));
      setNotice('Request accepted in this demo.');
    }
  }

  function showNav(id) {
    setActiveNav(id);
    setSearch('');
    if (id !== 'chats') setMobileChatOpen(false);
  }

  return (
    <Box className="cc-app">
      <Box className="cc-rail">
        <Box className="cc-logo"><SmsOutlined /></Box>
        <Divider />
        {navItems.map(({ id, label, icon: Icon }) => (
          <Tooltip title={label} placement="right" key={id}>
            <IconButton aria-label={label} onClick={() => showNav(id)} className={`cc-rail-button ${activeNav === id ? 'is-active' : ''}`}><Icon /></IconButton>
          </Tooltip>
        ))}
        <Box className="cc-rail-bottom">
          <Tooltip title="Privacy"><IconButton aria-label="Privacy" onClick={() => setNotice('Your privacy settings will be connected to your account.')}><ShieldOutlined /></IconButton></Tooltip>
          <Tooltip title="Settings"><IconButton aria-label="Settings" onClick={() => setNotice('Settings screen will be added to your account flow.')}><SettingsOutlined /></IconButton></Tooltip>
          <PersonAvatar person={{ initials: 'RS', color: '#92efc2' }} size={34} />
        </Box>
      </Box>

      <Box className={`cc-people ${mobileChatOpen ? 'cc-mobile-hide' : ''}`}>
        <Box className="cc-sidebar-heading">
          <Box><Typography variant="overline" className="cc-eyebrow">YOUR PRIVATE SPACE</Typography><Typography variant="h5" className="cc-heading">{navItems.find(item => item.id === activeNav)?.label}</Typography></Box>
          <IconButton className="cc-new-button" aria-label="New conversation" onClick={() => showNav('search')}><Add /></IconButton>
        </Box>

        <TextField fullWidth placeholder={activeNav === 'chats' ? 'Search conversations' : 'Search people'} value={search} onChange={event => setSearch(event.target.value)} className="cc-search" slotProps={{ input: { startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> } }} />

        {activeNav === 'chats' && <>
          <Typography className="cc-section-label">RECENT CONVERSATIONS <span>{filteredChats.length}</span></Typography>
          <Box className="cc-chat-list">
            {filteredChats.map(chat => <Paper elevation={0} key={chat.id} onClick={() => openChat(chat)} className={`cc-chat-row ${selectedId === chat.id ? 'is-selected' : ''}`}>
              <PersonAvatar person={chat} />
              <Box className="cc-chat-row-content">
                <Box className="cc-row-title"><Typography className="cc-person-name">{chat.name}</Typography><Typography className="cc-time">{chat.time}</Typography></Box>
                <Box className="cc-row-preview"><Typography className="cc-preview-text">{chat.preview}</Typography>{chat.unread > 0 && <Badge color="primary" badgeContent={chat.unread} />}</Box>
              </Box>
            </Paper>)}
            {!filteredChats.length && <Typography className="cc-empty">No conversations found.</Typography>}
          </Box>
          <Box className="cc-sidebar-footer"><span className="cc-status-dot" /> Your conversations stay personal.</Box>
        </>}

        {activeNav === 'friends' && <Box className="cc-results">
          <Typography className="cc-section-label">YOUR FRIENDS <span>{friends.length}</span></Typography>
          {friends.filter(person => `${person.name} ${person.username}`.toLowerCase().includes(search.toLowerCase())).map(person => <Box className="cc-person-result" key={person.id}><PersonAvatar person={person} /><Box className="cc-result-text"><Typography className="cc-person-name">{person.name}</Typography><Typography className="cc-time">@{person.username}</Typography></Box><IconButton onClick={() => openChat(person)} aria-label={`Message ${person.name}`}><SmsOutlined /></IconButton></Box>)}
          {!friends.length && <Typography className="cc-empty">Your friends will appear here.</Typography>}
        </Box>}

        {activeNav === 'search' && <Box className="cc-results">
          <Typography className="cc-section-label">DISCOVER PEOPLE</Typography>
          {filteredPeople.map(person => <Box className="cc-person-result" key={person.id}><PersonAvatar person={person} /><Box className="cc-result-text"><Typography className="cc-person-name">{person.name}</Typography><Typography className="cc-time">@{person.username}</Typography></Box><Button size="small" variant={sentRequests.includes(person.id) ? 'outlined' : 'contained'} onClick={() => { setSentRequests(current => current.includes(person.id) ? current.filter(id => id !== person.id) : [...current, person.id]); setNotice(sentRequests.includes(person.id) ? 'Demo request cancelled.' : 'Demo friend request sent.'); }}>{sentRequests.includes(person.id) ? 'Cancel' : 'Add'}</Button></Box>)}
          {!filteredPeople.length && <Typography className="cc-empty">No people match that search.</Typography>}
          <Typography className="cc-hint">Demo directory — connect user search to your API later.</Typography>
        </Box>}

        {activeNav === 'requests' && <Box className="cc-results">
          <Typography className="cc-section-label">INCOMING REQUESTS <span>{requests.length}</span></Typography>
          {requests.map(person => <Box className="cc-request" key={person.id}><Box className="cc-person-result"><PersonAvatar person={person} /><Box className="cc-result-text"><Typography className="cc-person-name">{person.name}</Typography><Typography className="cc-time">@{person.username}</Typography></Box></Box><Box className="cc-request-actions"><Button variant="contained" onClick={() => handleRequest(person.id)}>Accept</Button><Button variant="outlined" onClick={() => { setRequests(current => current.filter(item => item.id !== person.id)); setNotice('Request declined in this demo.'); }}>Decline</Button></Box></Box>)}
          {!requests.length && <Typography className="cc-empty">You’re all caught up. No pending requests.</Typography>}
        </Box>}
      </Box>

      <Box className={`cc-conversation-panel ${mobileChatOpen ? 'cc-mobile-chat-open' : ''}`}>
        {activeNav !== 'chats' || !selected ? <Box className="cc-welcome-panel">
          <Box className="cc-welcome-mark"><SmsOutlined /></Box>
          <Typography variant="h4">A little closer.</Typography>
          <Typography>Private conversations, with people who matter.</Typography>
          <Button variant="contained" onClick={() => showNav('search')}>Find your people</Button>
        </Box> : <>
          <Box className="cc-conversation-header">
            <IconButton className="cc-back-button" onClick={() => setMobileChatOpen(false)} aria-label="Back to conversations"><ArrowBack /></IconButton>
            <PersonAvatar person={selected} size={42} />
            <Box className="cc-header-person"><Typography className="cc-person-name">{selected.name}</Typography><Typography className="cc-time">@{selected.username}</Typography></Box>
            <Box className="cc-header-actions"><Tooltip title="Message options"><IconButton onClick={() => setMenuOpen(value => !value)}><MoreHoriz /></IconButton></Tooltip></Box>
          </Box>

          {menuOpen && <Paper className="cc-menu" elevation={5}>
            <Button fullWidth onClick={() => { setMenuOpen(false); setNotice('Disappearing message timer settings require server integration.'); }}>Message timer · 30 min</Button>
            <Button fullWidth color="error" onClick={() => { setMenuOpen(false); setNotice('Clear chat will be connected to the message service.'); }}>Clear conversation</Button>
          </Paper>}

          <Box className="cc-encryption-note"><ShieldOutlined fontSize="small" /><Typography>Keep it personal. Be kind to each other.</Typography></Box>

          <Box className="cc-message-list">
            <Typography className="cc-day-label"><span /> TODAY <span /></Typography>
            {selected.messages.map(item => <Box key={item.id} className={`cc-message-row ${item.from === 'me' ? 'cc-message-row--mine' : ''}`}>
              <Box className={`cc-message-bubble ${item.from === 'me' ? 'cc-message-bubble--mine' : ''}`}>
                <Typography className="cc-message-text">{item.text}</Typography>
                <Box className="cc-message-meta"><Typography>{item.time}</Typography>{item.from === 'me' && <Tooltip title={item.read ? 'Read (demo)' : 'Sent (demo)'}><span>{item.read ? <CheckCircle fontSize="inherit" /> : <Check fontSize="inherit" />}</span></Tooltip>}<IconButton className="cc-delete-message" size="small" aria-label="Delete message" onClick={() => deleteMessage(item.id)}><Delete fontSize="inherit" /></IconButton></Box>
              </Box>
            </Box>)}
            {!selected.messages.length && <Typography className="cc-empty">Say hello and start your conversation.</Typography>}
          </Box>

          <Box component="form" onSubmit={sendMessage} className="cc-composer">
            {emojiOpen && <Paper className="cc-emoji-popover" elevation={5}>{['😀','😄','😂','😊','😍','🥹','😎','🤝','❤️','✨','👍','🎉','🙏','🔥','💚','🤔'].map(emoji => <IconButton key={emoji} onClick={() => setMessage(current => current + emoji)} aria-label={`Add ${emoji}`}>{emoji}</IconButton>)}</Paper>}
            <IconButton aria-label="Emoji picker" onClick={() => setEmojiOpen(value => !value)}><EmojiEmotionsOutlined /></IconButton>
            <TextField fullWidth multiline maxRows={4} placeholder="Write something thoughtful..." value={message} onChange={event => setMessage(event.target.value)} className="cc-message-input" onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} />
            <Button type="submit" variant="contained" className="cc-send-button" disabled={!message.trim()}><Send /><span>Send</span></Button>
          </Box>
          <Typography className="cc-composer-hint">Enter to send · Shift + Enter for a new line</Typography>
        </>}
      </Box>

      <Snackbar open={Boolean(notice)} autoHideDuration={2800} onClose={() => setNotice('')} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setNotice('')} severity="info" variant="filled">{notice}</Alert>
      </Snackbar>
    </Box>
  );
}

export default function App() {
  return <ThemeProvider theme={theme}><CssBaseline /><AppContent /></ThemeProvider>;
}



