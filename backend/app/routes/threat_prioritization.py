from fastapi import APIRouter, Depends, HTTPException
from typing import List
from pydantic import BaseModel, Field
from app.services import threat_model
from app.database.postgres import SessionLocal
from sqlalchemy.orm import Session

router = APIRouter()

class ThreatEvent(BaseModel):
    event_id: str = Field(..., example="evt_123")
    severity: int = Field(..., ge=1, le=10)
    user_behavior: float = Field(..., ge=0, le=1)
    historical_pattern: float = Field(..., ge=0, le=1)

class PrioritizedThreat(BaseModel):
    event_id: str
    risk_score: float

@router.post("/", response_model=List[PrioritizedThreat])
def prioritize_threats(events: List[ThreatEvent], db: Session = Depends(SessionLocal)):
    results = []
    for event in events:
        risk_score = threat_model.calculate_risk_score(
            event.severity, event.user_behavior, event.historical_pattern
        )
        results.append(PrioritizedThreat(event_id=event.event_id, risk_score=risk_score))
        threat_model.store_risk_score(db, event, risk_score)
    return results
