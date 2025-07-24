from fastapi import FastAPI, Depends
from app.api.endpoints import auth, resources
from app.db.session import SessionLocal
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Qeepit API",
    description="API for inventory management ",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(resources.router, prefix="/resources")

@app.get("/")
def read_root():
    return {"message": "Welcome to Qeepit!"}

@app.on_event("startup")
def startup_event():
    try:
        db = SessionLocal()
        db.execute(text("SELECT 1 FROM users LIMIT 1"))
        db.execute(text("SELECT 1 FROM resources LIMIT 1"))
        db.close()
        print("✅ Database connection successful")
    except Exception as e:
        print("❌ Database connection error:", e)