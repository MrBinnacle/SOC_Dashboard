from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.services import deepfake_model
from app.config import MAX_FILE_SIZE, ALLOWED_FILE_TYPES
from starlette.requests import Request

router = APIRouter()

@router.post("/")
async def analyze_deepfake(file: UploadFile = File(...)):
    # Validate file type
    if file.content_type not in ALLOWED_FILE_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    contents = await file.read()
    # Validate file size
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large")
    
    try:
        result = deepfake_model.analyze_file(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing file")
    
    # Store result in MongoDB
    db = deepfake_model.get_mongo_db()
    deepfake_model.store_detection_result(db, file.filename, result)
    return {"filename": file.filename, "result": result}
