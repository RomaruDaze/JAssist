import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const categories = ["all", "visa", "housing", "school", "life"];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setFaqs([
        {
          id: "1",
          question: "How do I get a student visa?",
          answer: "Apply at your local embassy.",
          category: "visa",
        },
        {
          id: "2",
          question: "How do I find housing?",
          answer: "Check university listings.",
          category: "housing",
        },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredFaqs = faqs.filter(
    (faq) =>
      (selectedCategory === "" ||
        selectedCategory === "all" ||
        faq.category === selectedCategory) &&
      (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      className="container-padding section-spacing"
      style={{ maxWidth: 800, margin: "0 auto" }}
    >
      <h1>Frequently Asked Questions</h1>
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs..."
            className="input-field"
            style={{ paddingLeft: 36 }}
          />
          <MagnifyingGlassIcon
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              height: 20,
              width: 20,
              color: "#888",
            }}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field"
          style={{ maxWidth: 180 }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: 32 }}>
          <div
            style={{
              border: "4px solid #0ea5e9",
              borderRadius: "50%",
              width: 32,
              height: 32,
              borderTop: "4px solid transparent",
              margin: "0 auto",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ marginTop: 16, color: "#ccc" }}>Loading FAQs...</p>
        </div>
      ) : filteredFaqs.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filteredFaqs.map((faq) => (
            <div key={faq.id} className="card">
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
              <div style={{ marginTop: 8 }}>
                <span
                  style={{
                    display: "inline-block",
                    padding: "2px 10px",
                    borderRadius: 8,
                    fontSize: 12,
                    background: "#222",
                    color: "#38bdf8",
                  }}
                >
                  {faq.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 32 }}>
          <p style={{ color: "#ccc" }}>No FAQs found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default FAQ;
