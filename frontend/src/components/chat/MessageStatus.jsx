
import { Check, CheckCheck, Clock } from 'lucide-react';
import './MessageStatus.css';

function MessageStatus({ status = 'sent' }) {
  const statusConfig = {
    sending: {
      icon: Clock,
      label: 'Sending',
      className: 'message-status--sending',
    },
    sent: {
      icon: Check,
      label: 'Sent',
      className: 'message-status--sent',
    },
    delivered: {
      icon: CheckCheck,
      label: 'Delivered',
      className: 'message-status--delivered',
    },
    read: {
      icon: CheckCheck,
      label: 'Read',
      className: 'message-status--read',
    },
  };

  const current = statusConfig[status] || statusConfig.sent;
  const StatusIcon = current.icon;

  return (
    <span
      className={`message-status ${current.className}`}
      aria-label={current.label}
      title={current.label}
    >
      <StatusIcon size={14} strokeWidth={2} />
    </span>
  );
}

export default MessageStatus;
