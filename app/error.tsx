"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "50vh",
      gap: "16px",
      textAlign: "center",
      padding: "48px 24px",
    }}>
      <h1 style={{ fontSize: "20px", fontWeight: 700 }}>Something went wrong</h1>
      <p style={{ color: "#555555", fontSize: "14px", maxWidth: "420px" }}>
        We were unable to load the products right now. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        style={{
          background: "#000000",
          color: "#ffffff",
          border: "none",
          padding: "12px 32px",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          cursor: "pointer",
        }}
      >
        TRY AGAIN
      </button>
      <span className="visually-hidden">{error.name}</span>
    </div>
  );
}
