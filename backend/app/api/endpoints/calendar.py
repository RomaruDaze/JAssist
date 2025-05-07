from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from app.core.config import settings

router = APIRouter()

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    date: datetime

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: str

# In-memory storage for events (replace with database in production)
events: List[Event] = []

@router.post("/events", response_model=Event)
async def create_event(event: EventCreate):
    try:
        new_event = Event(
            id=str(len(events) + 1),  # Simple ID generation
            **event.dict()
        )
        events.append(new_event)
        return new_event
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error creating event: {str(e)}"
        )

@router.get("/events", response_model=List[Event])
async def get_events():
    return events

@router.get("/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    event = next((e for e in events if e.id == event_id), None)
    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )
    return event

@router.delete("/events/{event_id}")
async def delete_event(event_id: str):
    global events
    event = next((e for e in events if e.id == event_id), None)
    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )
    events = [e for e in events if e.id != event_id]
    return {"message": "Event deleted successfully"} 