from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_prioritize_threats():
    payload = [{
        "event_id": "evt_test",
        "severity": 8,
        "user_behavior": 0.7,
        "historical_pattern": 0.5
    }]
    response = client.post("/api/threat-prioritization/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "risk_score" in data[0]
