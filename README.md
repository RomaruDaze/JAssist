### 🧠 **Project Title: JAssist – Your AI Companion for Student Life in Japan**

---

### 📌 **Project Description:**

**JAssist** is an AI-powered web assistant designed to support international university students navigating life in Japan. By combining modern AI technologies with practical student tools, JAssist provides multilingual support, document guidance, academic reminders, and cultural tips — all in one easy-to-use platform.

Built using **React** for the frontend and integrated with **Dify AI** on the backend, JAssist acts as a personalized assistant to help students overcome common challenges such as language barriers, official paperwork, and adapting to a new academic and cultural environment.

Whether it’s summarizing scholarship forms, helping write polite Japanese emails, or explaining university rules in your native language, JAssist is here to make student life smoother, smarter, and more connected.

---

### 🔧 **Key Features**:

- 💬 **Multilingual Chat Assistant**: Communicate in English, Japanese, or Indonesian. Get help writing emails, translating messages, or understanding Japanese documents.
- 📄 **Document Summarizer & Translator**: Upload city hall forms, PDFs, or screenshots — JAssist explains and translates them using OCR + AI.
- 📚 **University FAQ Bot**: Ask questions about student life, part-time work rules, or graduation requirements. Powered by a custom knowledge base and RAG (retrieval-augmented generation).
- 🗓️ **AI-Powered Life Organizer**: Add class schedules, visa reminders, or job shifts to your calendar with natural language input.
- 🌍 **Cultural and Daily Life Tips**: Learn about etiquette, customs, and do’s/don’ts in Japan from an AI trained on real-life advice.

---

### 🛠️ **Tech Stack**:

- **Frontend**: React + Tailwind CSS
- **Backend**: FastAPI (or Node.js)
- **AI Engine**: Dify + Open Source LLMs
- **Storage**: Supabase / Firebase
- **Vector DB**: ChromaDB (for semantic search on FAQs)
- **OCR**: Tesseract.js or EasyOCR

---

# Let me know if you need a shorter version or a version in Japanese or Indonesian!

# JAssist - AI Life Support Assistant for International Students

JAssist is a web application designed to support international students (particularly from Indonesia) living in Japan. It provides AI-powered assistance for daily life, studies, and administrative tasks.

## Features

- 🤖 AI-powered chat support in multiple languages
- 📄 Document translation and analysis (PDF, images)
- 📅 Schedule management and notifications
- ❓ FAQ search with RAG (Retrieval Augmented Generation)
- 📧 Japanese email composition assistance

## Tech Stack

- Frontend: React 18 + TypeScript + Tailwind CSS
- Backend: FastAPI (Python 3.11)
- AI: Dify (OpenAI GPT-4 / Mistral 7B)
- Database: Supabase
- Vector DB: ChromaDB
- OCR: Tesseract.js

## Project Structure

```
jassist/
├── frontend/           # React frontend application
├── backend/           # FastAPI backend server
├── docs/             # Documentation
└── docker/           # Docker configuration files
```

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.11+
- Docker
- Git

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/jassist.git
   cd jassist
   ```

2. Set up the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Set up the backend:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Fill in the required API keys and configuration values

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
