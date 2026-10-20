
import { useState } from 'react';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import './MessageActions.css';

function MessageActions({ message, onDelete }) {
  const [open, setOpen] = useState(false);

  if (!message?._id || !onDelete) return null;

  function handleDelete() {
    setOpen(false);
    onDelete(message._id);
  }

  return (
    <div className="message-actions">
      <button
        type="button"
        className="message-actions__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-label="Message options"
        aria-expanded={open}
      >
        <MoreHorizontal size={17} />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="message-actions__dismiss"
            aria-label="Close message options"
            onClick={() => setOpen(false)}
          />

          <div className="message-actions__menu">
            <button
              type="button"
              className="message-actions__delete"
              onClick={handleDelete}
            >
              <Trash2 size={15} />
              <span>Delete for everyone</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MessageActions;
