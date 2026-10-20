
import "./Avatar.css";

export default function Avatar({
  name = "User",
  src,
  size = "md",
  status,
  className = ""
}) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

  return (
    <span
      className={`ui-avatar ui-avatar--${size} ${className}`}
      aria-label={name}
      title={name}
    >
      {src ? (
        <img className="ui-avatar__image" src={src} alt="" />
      ) : (
        <span aria-hidden="true">{initials || "U"}</span>
      )}

      {status && (
        <span
          className={`ui-avatar__status ui-avatar__status--${status}`}
          aria-label={status}
        />
      )}
    </span>
  );
}
