import os
from dotenv import load_dotenv

load_dotenv()  # load environment variables from a .env file if present

# Server config
DEBUG = os.getenv("DEBUG", "False") == "True"

# JWT Config
JWT_SECRET = os.getenv("JWT_SECRET", "change_me_in_production")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
JWT_EXPIRE_MINUTES = int(os.getenv("JWT_EXPIRE_MINUTES", "30"))

# Database URLs
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@postgres:5432/soc_dashboard")
MONGO_URL = os.getenv("MONGO_URL", "mongodb://mongodb:27017")

# File upload limits (in bytes)
MAX_FILE_SIZE = int(os.getenv("MAX_FILE_SIZE", "10485760"))  # 10MB
ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "video/mp4"]
