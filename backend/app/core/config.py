from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "JAssist"
    
    # Security
    SECRET_KEY: str = "your-secret-key-here"  # Change in production
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # Database
    SUPABASE_URL: Optional[str] = None
    SUPABASE_KEY: Optional[str] = None
    
    # AI Services
    DIFY_API_KEY: Optional[str] = None
    DIFY_API_URL: str = "https://api.dify.ai/v1"
    
    # Vector DB
    CHROMA_PERSIST_DIRECTORY: str = "./data/chroma"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings() 