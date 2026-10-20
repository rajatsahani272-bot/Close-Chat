
import './EmojiPicker.css';

const EMOJI_GROUPS = [
  {
    label: 'Frequently used',
    items: ['😀', '😂', '🥹', '😍', '😊', '😭', '😎', '🙂', '😉', '🤔', '❤️', '🔥'],
  },
  {
    label: 'Reactions',
    items: ['👍', '👎', '👏', '🙌', '🙏', '💯', '🎉', '✨', '💖', '🤝', '🤗', '💪'],
  },
  {
    label: 'Expressions',
    items: ['😅', '🤣', '🥰', '😘', '😴', '🤩', '😮', '😢', '😡', '🤦', '💀', '🤍'],
  },
];

function EmojiPicker({ onSelect, onClose }) {
  return (
    <section
      className="emoji-picker"
      aria-label="Choose an emoji"
    >
      <div className="emoji-picker__header">
        <span>Choose an emoji</span>

        <button
          type="button"
          className="emoji-picker__close"
          onClick={onClose}
          aria-label="Close emoji picker"
        >
          ×
        </button>
      </div>

      <div className="emoji-picker__content">
        {EMOJI_GROUPS.map((group) => (
          <div className="emoji-picker__group" key={group.label}>
            <h3>{group.label}</h3>

            <div className="emoji-picker__grid">
              {group.items.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  className="emoji-picker__item"
                  onClick={() => onSelect?.(emoji)}
                  aria-label={`Insert ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default EmojiPicker;
