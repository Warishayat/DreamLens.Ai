from fastapi.routing import APIRouter
from fastapi import HTTPException,Depends
from Validation.validation import ContactValidation
from Database.database import get_db
from Database.Schemas import ContactAdmin
from sqlalchemy.orm import Session

contact_router = APIRouter(
    prefix="/admin",
    tags=["User Login and Signup"]
)


@contact_router.post("/contact")
async def ContactUs(data:ContactValidation,db:Session=Depends(get_db)):
    try:
        contact_entry = ContactAdmin(
            name=data.name,
            email=data.email,
            topic=data.topic,
            message=data.message

        )
        db.add(contact_entry)
        db.commit()
        db.refresh(contact_entry)
        return {
        "message": "Contact saved successfully!",
        "contact_id": contact_entry.id
    }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@contact_router.get('/all-contacts')
async def getALL(db:Session=Depends(get_db)):
    try:
        contacts = db.query(ContactAdmin).all()
        if contacts:
            return{
                "All-Contacts":contacts
            }
        else:
            return {
                "message":"No Contact Entry"
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
