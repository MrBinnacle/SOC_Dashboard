from pymongo import MongoClient
from app.config import MONGO_URL

client = MongoClient(MONGO_URL)
db = client.soc_dashboard

def get_mongo_db():
    return db
