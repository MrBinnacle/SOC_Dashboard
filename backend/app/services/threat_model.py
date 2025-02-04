from app.models import ThreatAlert

def calculate_risk_score(severity: int, user_behavior: float, historical_pattern: float) -> float:
    # Weighted sum; adjust weights as needed
    risk_score = 0.5 * severity + 0.3 * user_behavior + 0.2 * historical_pattern
    return risk_score

def store_risk_score(db, event, risk_score):
    # Using SQLAlchemy ORM; parameterized via the ORM layer
    alert = ThreatAlert(event_id=event.event_id, risk_score=risk_score)
    db.add(alert)
    db.commit()
    db.refresh(alert)
    return alert
