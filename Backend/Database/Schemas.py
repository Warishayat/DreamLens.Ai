from sqlalchemy import Column,Integer,String,Boolean,ForeignKey
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text
from Database.database import Base

class UserCredentials(Base):
    __tablename__ = "user_credentials"
    user_id =  Column(Integer,primary_key=True,nullable=False,index=True)
    name = Column(String,nullable=True)
    email = Column(String,nullable=False,unique=True)
    password = Column(String,nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=True,server_default=(text("now()")))


class ImageData(Base):
    __tablename__ = "image_database"
    img_id=Column(Integer,primary_key=True,index=True)
    user_id = Column(Integer,ForeignKey("user_credentials.user_id",ondelete='CASCADE'),nullable=False)
    prompt =Column(String,nullable=False)
    image_url = Column(String,nullable=False)
    img_count = Column(Integer,nullable=False,default=0)
    created_at = Column(TIMESTAMP(timezone=True),nullable=True,server_default=(text("now()")))

class VideoData(Base):
    __tablename__ = "video_database"
    video_id = Column(Integer,primary_key=True,nullable=False,index=True)
    user_id = Column(Integer,ForeignKey('user_credentials.user_id',ondelete='CASCADE'),nullable=False)
    prompt = Column(String,nullable=False)
    video_url = Column(String,nullable=False)
    vid_count = Column(Integer,nullable=False,default=0)
    created_at = Column(TIMESTAMP(timezone=True),nullable=True,server_default=(text("now()")))


class ContactAdmin(Base):
    __tablename__ = "contact_admin"
    id = Column(Integer,primary_key=True,nullable=False,index=True)
    name = Column(String,nullable=True)
    email = Column(String,nullable=False)
    topic = Column(String,nullable=True)
    message = Column(String,nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=True,server_default=(text("now()")))
