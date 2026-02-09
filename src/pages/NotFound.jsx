import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <p className="empty">That page doesn’t exist.</p>
      <Link className="btn" to="/">
        Back to Characters
      </Link>
    </div>
  );
}