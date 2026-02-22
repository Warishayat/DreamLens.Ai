# 🌌 DreamLens.AI

### 🧠 AI-Powered Intelligent Media Generation Platform

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React_Vite-646CFF?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Caching-Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white"/>
  <img src="https://img.shields.io/badge/Storage-AWS_S3-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/Model-AWS_BEDROCK-FF9900?style=for-the-badge&logo=amazonaws&logoColor=Blue"/>
  <img src="https://img.shields.io/badge/Container-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Deployed-Render-46E3B7?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Hackathon-Amazon_Nova-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"/>
</p>

---

## 🚀 Project Overview

**DreamLens.AI** is a full-stack AI-powered media generation platform that enables users to generate intelligent visual content through cutting-edge AI models.

This project is proudly submitted for the **Amazon Nova Hackathon** 🏆.

The platform focuses on:

* 🧠 AI-based content generation
* 🔐 Secure authentication system
* ⚡ High-performance backend
* ☁️ Cloud-based scalable architecture
* 🖼️ Media storage & retrieval
* 🚀 Production-ready deployment

---

# 🏗️ System Architecture

DreamLens follows a modular, scalable microservice-ready architecture:

```
User → React Frontend → FastAPI Backend → AI Model
                               ↓
                        PostgreSQL Database
                               ↓
                             Redis
                               ↓
                             AWS S3
```

---

# 🎨 Frontend

### ⚛ Built With:

* React (Vite)
* Modern UI components
* REST API integration
* JWT Authentication handling

### 🌟 Features:

* User Authentication (Login / Register)
* AI Prompt Submission
* Media Display Dashboard
* Responsive UI
* Secure Token Handling

The frontend communicates securely with the FastAPI backend using JWT tokens.

---

# ⚡ Backend

### 🐍 Built With:

* FastAPI
* SQLAlchemy
* PostgreSQL
* Redis
* Docker

### 🔐 Core Features:

* JWT-based authentication
* User management system
* AI model inference integration
* Rate limiting (Redis-based)
* Image/Video URL storage in S3
* Scalable API endpoints

Swagger documentation available at:

```
/docs
```

---

# 🧠 AI Model Integration

DreamLens integrates advanced AI model capabilities for media generation.

### Model Used:

* Amazon Nova Model (Hackathon Integration)
* AI-based visual generation pipeline
* Scalable inference handling

The backend processes user prompts, sends them to the AI model, and securely stores generated media in AWS S3.

---

# ☁️ Cloud & Deployment

| Component | Deployment                            |
| --------- | ------------------------------------- |
| Frontend  | Render (Web Service / Static Hosting) |
| Backend   | Render (Docker Web Service)           |
| Database  | PostgreSQL Neon-Serverless            |
| Caching   | Redis                                 |
| Model     | Aws Bedrock                           |
| Storage   | AWS S3                                |

The entire system is containerized using Docker for production-grade deployment.

---

# 🔐 Environment Configuration

Example `.env`:

```
DATABASE_URL=postgresql://user:password@host:5432/db
SECRET_KEY=your_secret_key
AWS_ACCESS_KEY=your_access_key
AWS_SECRET_KEY=your_secret_key
REDIS_URL=redis://host:6379
```

---

# 🏆 Hackathon Submission

This project is officially submitted for:

## 🚀 Amazon Nova Hackathon

DreamLens.AI demonstrates:

* Real-world AI application
* Secure backend architecture
* Cloud-native deployment
* Production-ready DevOps
* Scalable system design

---

# 👨‍💻 Team

### 💎 Waris Hayat
### 💎 Mehreen Khsn

Full Stack AI/ML Engineer
Architect & Backend Developer

---

# 📌 Why DreamLens?

✔ Production-ready architecture
✔ Secure JWT authentication
✔ Dockerized deployment
✔ Redis caching & rate limiting
✔ AWS cloud storage integration
✔ Clean frontend UX
✔ AI-powered real-world solution

---

# ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 🚀 Share it

---

# 🌌 DreamLens.AI

Building Intelligent Systems for the Future

---

