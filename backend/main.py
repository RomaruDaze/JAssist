from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import chat, documents, calendar, faq

app = FastAPI(
    title="JAssist API",
    description="AI-powered assistant for international students in Japan",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat.router, prefix=settings.API_V1_STR)
app.include_router(documents.router, prefix=f"{settings.API_V1_STR}/documents")
app.include_router(calendar.router, prefix=f"{settings.API_V1_STR}/calendar")
app.include_router(faq.router, prefix=f"{settings.API_V1_STR}/faq")

@app.get("/")
async def root():
    return {
        "message": "Welcome to JAssist API",
        "status": "operational",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
