import { Link } from "react-router-dom";
import {
  ChatBubbleLeftRightIcon,
  DocumentArrowUpIcon,
  CalendarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "AI Chat Assistant",
    description: "Get instant help with your questions about life in Japan",
    icon: ChatBubbleLeftRightIcon,
    link: "/chat",
  },
  {
    name: "Document Management",
    description: "Upload and translate important documents",
    icon: DocumentArrowUpIcon,
    link: "/documents",
  },
  {
    name: "Calendar",
    description: "Manage your schedule and important dates",
    icon: CalendarIcon,
    link: "/calendar",
  },
  {
    name: "FAQ Search",
    description: "Find answers to common questions",
    icon: QuestionMarkCircleIcon,
    link: "/faq",
  },
];

const Home = () => {
  return (
    <div
      className="container-padding section-spacing"
      style={{ maxWidth: 1200, margin: "0 auto" }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Welcome to JAssist</h1>
        <p style={{ maxWidth: 600, margin: "1rem auto" }}>
          Your AI-powered assistant for a smoother life in Japan
        </p>
      </div>

      <div style={{ marginTop: 48 }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {features.map((feature) => (
            <Link
              key={feature.name}
              to={feature.link}
              className="card"
              style={{
                width: 260,
                textAlign: "center",
                textDecoration: "none",
                display: "block",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-flex",
                    padding: 16,
                    background: "#222",
                    borderRadius: 12,
                    marginBottom: 12,
                  }}
                >
                  <feature.icon
                    style={{ height: 32, width: 32, color: "#38bdf8" }}
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "#fff",
                    margin: 0,
                  }}
                >
                  {feature.name}
                </h3>
                <p style={{ color: "#ccc", margin: "0.5rem 0 0 0" }}>
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 48, textAlign: "center" }}>
        <h2>Why Choose JAssist?</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
            marginTop: 32,
          }}
        >
          <div className="card" style={{ width: 320 }}>
            <h3>AI-Powered Assistance</h3>
            <p>
              Get instant, accurate answers to your questions about life in
              Japan
            </p>
          </div>
          <div className="card" style={{ width: 320 }}>
            <h3>Document Translation</h3>
            <p>Easily translate and understand important documents</p>
          </div>
          <div className="card" style={{ width: 320 }}>
            <h3>Schedule Management</h3>
            <p>Keep track of important dates and deadlines</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
