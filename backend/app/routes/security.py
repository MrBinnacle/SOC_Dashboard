from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_security_info():
    return {"message": "Security module info"}
