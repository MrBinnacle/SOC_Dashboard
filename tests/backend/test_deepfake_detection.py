import io
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_deepfake_detection():
    file_content = b"fake file content"
    file = io.BytesIO(file_content)
    response = client.post("/api/deepfake-detection/", files={"file": ("test.jpg", file, "image/jpeg")})
    assert response.status_code == 200
    data = response.json()
    assert "result" in data and "confidence" in data["result"]
