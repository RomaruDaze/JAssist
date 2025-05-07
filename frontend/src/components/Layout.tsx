import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <nav style={{ background: "#222", padding: "1rem 0" }}>
        <div
          className="container-padding"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#38bdf8",
              textDecoration: "none",
            }}
          >
            JAssist
          </Link>
          <div>
            <Link
              to="/chat"
              style={{
                margin: "0 1rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Chat
            </Link>
            <Link
              to="/documents"
              style={{
                margin: "0 1rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Documents
            </Link>
            <Link
              to="/calendar"
              style={{
                margin: "0 1rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Calendar
            </Link>
            <Link
              to="/faq"
              style={{
                margin: "0 1rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              FAQ
            </Link>
          </div>
        </div>
      </nav>
      <main className="container-padding section-spacing" style={{ flex: 1 }}>
        {children}
      </main>
      <footer
        style={{ background: "#222", padding: "1rem 0", marginTop: "auto" }}
      >
        <div className="container-padding">
          <p style={{ textAlign: "center", color: "#aaa", fontSize: "0.9rem" }}>
            © 2024 JAssist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
