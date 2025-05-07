from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
import chromadb
from chromadb.config import Settings
from app.core.config import settings

router = APIRouter()

class FAQItem(BaseModel):
    id: str
    question: str
    answer: str
    category: str

# Initialize ChromaDB client
chroma_client = chromadb.Client(Settings(
    persist_directory=settings.CHROMA_PERSIST_DIRECTORY
))

# Create or get collection
try:
    faq_collection = chroma_client.get_collection("faqs")
except:
    faq_collection = chroma_client.create_collection("faqs")

# Sample FAQ data (replace with database in production)
SAMPLE_FAQS = [
    {
        "id": "1",
        "question": "How do I apply for a student visa?",
        "answer": "To apply for a student visa, you need to: 1) Get accepted to a Japanese educational institution, 2) Receive a Certificate of Eligibility (COE), 3) Apply for the visa at a Japanese embassy or consulate in your country.",
        "category": "visa"
    },
    {
        "id": "2",
        "question": "What documents do I need for student housing?",
        "answer": "Common documents required for student housing include: passport, student ID, proof of enrollment, guarantor information, and proof of financial ability.",
        "category": "housing"
    },
    # Add more sample FAQs here
]

# Initialize collection with sample data
if len(faq_collection.get()["ids"]) == 0:
    faq_collection.add(
        documents=[faq["question"] + " " + faq["answer"] for faq in SAMPLE_FAQS],
        metadatas=[{"category": faq["category"]} for faq in SAMPLE_FAQS],
        ids=[faq["id"] for faq in SAMPLE_FAQS]
    )

@router.get("/", response_model=List[FAQItem])
async def search_faqs(
    query: Optional[str] = Query(None, description="Search query"),
    category: Optional[str] = Query("all", description="FAQ category")
):
    try:
        if query:
            # Search using ChromaDB
            results = faq_collection.query(
                query_texts=[query],
                n_results=10,
                where={"category": category} if category != "all" else None
            )
            
            # Map results back to FAQ items
            faqs = []
            for i, doc_id in enumerate(results["ids"][0]):
                faq = next((f for f in SAMPLE_FAQS if f["id"] == doc_id), None)
                if faq:
                    faqs.append(faq)
            return faqs
        else:
            # Return all FAQs or filter by category
            if category == "all":
                return SAMPLE_FAQS
            return [f for f in SAMPLE_FAQS if f["category"] == category]
            
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error searching FAQs: {str(e)}"
        ) 