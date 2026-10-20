
import { useRef, useState } from 'react';
import { Smile, Send } from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import './MessageComposer.css';

function MessageComposer({
  onSend,
  disabled = false,
  placeholder = 'Write a message...',
}) {
  const [text, setText] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const textareaRef = useRef(null);

  function insertEmoji(emoji) {
    setText((current) => `${current}${emoji}`);
    setEmojiOpen(false);
    textareaRef.current?.focus();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const content = text.trim();

    if (!content || disabled || !onSend) return;

    await onSend(content);
    setText('');
    setEmojiOpen(false);
    textareaRef.current?.focus();
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <form className="message-composer" onSubmit={handleSubmit}>
      <div className="message-composer__field">
        <div className="message-composer__emoji">
          <button
            type="button"
            className={`message-composer__icon ${emojiOpen ? 'is-active' : ''}`}
            onClick={() => setEmojiOpen((value) => !value)}
            disabled={disabled}
            aria-label="Choose emoji"
            aria-expanded={emojiOpen}
          >
            <Smile size={21} />
          </button>

          {emojiOpen && (
            <EmojiPicker
              onSelect={insertEmoji}
              onClose={() => setEmojiOpen(false)}
            />
          )}
        </div>

        <textarea
          ref={textareaRef}
          className="message-composer__input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          maxLength={4000}
          disabled={disabled}
          aria-label="Message"
        />

        <button
          type="submit"
          className="message-composer__send"
          disabled={disabled || !text.trim()}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>

      <div className="message-composer__hint">
        <span>Enter to send · Shift + Enter for a new line</span>
        <span>{text.length}/4000</span>
      </div>
    </form>
  );
}

export default MessageComposer;
