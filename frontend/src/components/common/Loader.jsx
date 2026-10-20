
import "./Loader.css";

export default function Loader({ label = "Loading...", fullPage = false }) {
  return (
    <div
      className={`ui-loader ${fullPage ? "ui-loader--page" : ""}`}
      role="status"
      aria-label={label}
    >
      <span className="ui-loader__spinner" aria-hidden="true" />
      <span className="ui-loader__label">{label}</span>
    </div>
  );
}
