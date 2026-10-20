
import { MessageCircle } from "lucide-react";
import Button from "./Button.jsx";
import "./EmptyState.css";

export default function EmptyState({
  icon: Icon = MessageCircle,
  title = "Nothing here yet",
  description,
  actionLabel,
  onAction
}) {
  return (
    <section className="ui-empty-state">
      <div className="ui-empty-state__icon" aria-hidden="true">
        <Icon size={26} strokeWidth={1.7} />
      </div>

      <h2 className="ui-empty-state__title">{title}</h2>

      {description && (
        <p className="ui-empty-state__description">{description}</p>
      )}

      {actionLabel && onAction && (
        <Button onClick={onAction} size="md">
          {actionLabel}
        </Button>
      )}
    </section>
  );
}
