from fastapi import FastAPI
from app.routes import dashboard, security, threat_prioritization, deepfake_detection
from app.database import postgres, mongodb
from app.services import auth
from app.config import DEBUG

app = FastAPI(title="SOC Dashboard API", debug=DEBUG, version="1.0.0")

# Register routers
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(security.router, prefix="/api/security", tags=["Security"])
app.include_router(threat_prioritization.router, prefix="/api/threat-prioritization", tags=["Threat Prioritization"])
app.include_router(deepfake_detection.router, prefix="/api/deepfake-detection", tags=["Deepfake Detection"])

@app.get("/health")
async def health_check():
    return {"status": "OK"}
