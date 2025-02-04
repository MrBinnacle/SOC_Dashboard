import random
from datetime import datetime
from app.database.mongodb import get_mongo_db

def analyze_file(file_bytes: bytes) -> dict:
    # Simulate analysis; in production integrate a deepfake detection model
    confidence = random.uniform(0, 1)
    flagged = confidence > 0.5
    return {"confidence": confidence, "flagged": flagged}

def store_detection_result(db, filename: str, result: dict):
    collection = db.deepfake_detections
    detection_record = {
        "filename": filename,
        "result": result,
        "timestamp": datetime.utcnow()
    }
    collection.insert_one(detection_record)

# get_mongo_db is provided by the database helper below.
