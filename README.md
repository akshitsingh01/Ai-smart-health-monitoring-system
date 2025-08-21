# Smart Health Monitoring System using AI

## Project Overview
A comprehensive healthcare platform that enables secure patient monitoring, medical record management, and automated health insights using AI. The system provides a seamless interface for both healthcare providers and patients.

## Features
  - Secure Authentication System
  - JWT-based authentication
  - OTP verification
  - Email notifications
  - User Management
  - Separate portals for patients and healthcare providers
  - Profile management
  - Medical history tracking
  - Medical Records
  - Secure file upload for medical reports
  - Support for PDF and image formats
  - Encrypted storage
  - Modern UI/UX
  - Responsive design
  - Animated components
  - Intuitive navigation

## Tech Stack
### Frontend
- React.js
- Tailwind CSS
- Framer Motion
- Axios

### Backend
- Python
- FastAPI
- MongoDB
- JWT Authentication

## Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/smart-health-monitoring.git
cd smart-health-monitoring
```

2. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

4. Environment Setup
Create `.env` files in both frontend and backend directories:

Backend `.env`:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USERNAME=your_email
EMAIL_PASSWORD=your_email_password
```

Frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:8000
```

5. Start the Application
Backend:
```bash
cd backend
uvicorn main:app --reload
```

Frontend:
```bash
cd frontend
npm start
```

## API Documentation
Access the API documentation at `http://localhost:8000/docs` after starting the backend server.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

