import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Chat from "./components/Chat";
import DocumentUpload from "./components/DocumentUpload";
import Calendar from "./components/Calendar";
import FAQ from "./components/FAQ";
import ErrorBoundary from "./components/ErrorBoundary";
import { AppProvider } from "./context/AppContext";
import { Global, css } from "@emotion/react";

function App() {
  return (
    <>
      <Global
        styles={css`
          html,
          body,
          #root {
            height: 100%;
            margin: 0;
            background: #111;
            color: #fff;
            font-family: "Inter", system-ui, sans-serif;
          }
          a {
            color: #38bdf8;
            text-decoration: none;
          }
          a:hover {
            color: #0ea5e9;
          }
        `}
      />
      <ErrorBoundary>
        <AppProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/documents" element={<DocumentUpload />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </Layout>
          </Router>
        </AppProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
