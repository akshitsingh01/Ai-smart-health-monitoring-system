from fastapi import APIRouter, HTTPException, Body, Depends
from fastapi.security import OAuth2PasswordRequestForm
from models.user import User
from database.db import collection_name
from schema.schemas import individual_serial, list_serial
from bson import ObjectId
import secrets
from services.sendEmailOtp import EmailSender
from utils.auth import get_password_hash, verify_password, create_access_token
from datetime import timedelta
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pathlib import  Path

router = APIRouter(prefix="/auth", tags=["Authentication"])
UPLOAD_DIR = Path() / 'uploads'

def generate_otp(username, email):
    random_number = secrets.randbelow(900000) + 100000
    print("Secure 6-digit random number:", random_number)
    sendemail = EmailSender("singhakshit91@gmail.com", "sqtd fisu utbl tgtu")
    sendemail.send_welcome_email(email, username, random_number)
    return random_number

@router.get("/users")
async def get_users():
    users = list(list_serial(collection_name.find()))
    return {"users": users}

@router.post("/register")
async def register_user(user: User = Body(...)):
    existing_user = await collection_name.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered!")

    hashed_password = get_password_hash(user.password)
    user.password = hashed_password
    new_user = user.dict()
    inserted_user = await collection_name.insert_one(new_user)
    new_user["_id"] = str(inserted_user.inserted_id)
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"message": "User registered successfully!", "access_token": access_token, "token_type": "bearer"}

@router.post("/login")
async def login_user(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await collection_name.find_one({"email": form_data.username})
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    hashed_password = user.get("password")
    if not verify_password(form_data.password, hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": user.get("email")}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/otp")
async def get_otp_registration(user: User = Body(...)):
    existing_user = await collection_name.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered!")
    else:
        otp = generate_otp(user.username, user.email)
        return otp

@router.post("/login-otp")
async def login_otp_request(user: User = Body(...)):
    user_data = await collection_name.find_one({"email": user.email})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")
    otp = generate_otp(user_data["username"], user_data["email"])
    return otp

@router.post("/verify-otp")
async def verify_otp(email: str = Body(...), otp: str = Body(...)):
    # In a real application, you would store the generated OTP in a temporary storage
    # (like Redis) associated with the email and then verify it here.
    # For this example, we'll just return a success message.
    print("Verify OTP route was hit!")
    print(f"Verifying OTP: {otp} for email: {email}")
    # Replace this with your actual OTP verification logic
    return {"message": "OTP Verified Successfully"}

@router.post("/check_user")
async def check_user(user: User = Body(...)):
    human = await collection_name.find_one({"email": user.email, "password": user.password}) # We will not rely on password here for login OTP
    if human:
        otp = generate_otp(human.get("username"), human.get("email"))
        return {"exists": True, "username": human.get("username"), "email": human.get("email"), "otp": otp}
    return {"exists": False, "username": user.username, "email": user.email}


@router.post("/upload")
async def upload_file(file: UploadFile):
    print("upload route")
    data = await file.read()
    save_to = UPLOAD_DIR / file.filename
    with open(save_to,'wb') as f:
        f.write(data)

    return {"filename":file.filename}