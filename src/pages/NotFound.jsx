import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#020617",
        color: "white",
        textAlign: "center",
      }}
    >
      <div>
        <h1>404</h1>
        <p>Page Not Found</p>

        <br />

        <Link
          to="/"
          style={{
            color: "#18c8ff",
            textDecoration: "none",
          }}
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}