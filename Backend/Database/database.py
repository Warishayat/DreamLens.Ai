from sqlalchemy.engine import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URI = os.getenv('DATABASE_URI')
engine = create_engine(DATABASE_URI,connect_args={"sslmode": "require"})
SessionLocal = sessionmaker(autoflush=False,autocommit=False,bind=engine)
Base = declarative_base()


#to get the session of database
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
