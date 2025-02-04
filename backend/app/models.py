from sqlalchemy import Column, String, Float, Integer
from app.database.postgres import Base

# Example existing model(s) would be here…

class ThreatAlert(Base):
    __tablename__ = "threat_alerts"
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(String, unique=True, index=True)
    risk_score = Column(Float)
