# 🌙 DreamLens.AI

### *Full Stack Generative AI Creative Suite*

<p align="center">

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Async%20API-green?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-blue?logo=postgresql)
![Redis](https://img.shields.io/badge/Redis-Rate%20Limiter-red?logo=redis)
![AWS](https://img.shields.io/badge/AWS-Bedrock-orange?logo=amazonaws)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue?logo=docker)
![React](https://img.shields.io/badge/React-Vite-61DAFB?logo=react)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

</p>

---

> ✨ Turning imagination into cinematic AI visuals using AWS Bedrock Nova models.

DreamLens.AI is a production-ready full stack AI platform built with scalable architecture, secure authentication, and controlled AI generation pipelines.

---

# 🚀 Live Architecture Overview

```
User
  ↓
React (Vite + Tailwind)
  ↓
FastAPI Backend
  ↓
Redis (Rate Limiting + Credits)
  ↓
AWS Bedrock (Nova Models)
  ↓
AWS S3 (Media Storage)
  ↓
Neon PostgreSQL (Persistent Data)
```

---

# 🛠 Tech Stack

## 🔹 Backend

* ⚡ FastAPI (Async API Engine)
* 🔐 Custom JWT Authentication
* 🧱 SQLAlchemy ORM
* 🗄 Neon PostgreSQL
* ⚡ Redis (Sliding Window Rate Limiter)
* 🧠 LangChain Prompt Orchestration
* 🐳 Dockerized Deployment

---

## 🔹 Frontend

* ⚡ Vite (Ultra-fast bundler)
* ⚛ React
* 🎨 Tailwind CSS (Glass UI)
* 🔄 Real-time generation states

---

## ☁ AI Infrastructure

| Component               | Purpose                       |
| ----------------------- | ----------------------------- |
| `amazon.nova-lite-v1:0` | Aws Bedrock Prompt Optimizer  |
| `nova-canvas`           | Aws bedrock Image Generation  |
| `nova-reel`             | Aws bedrock Video Generation  |
| AWS S3                  | Media Storage                 |

---

# 🎁 Free Credit Policy

Every new user receives:

* 🖼 **6 Free Image Generations**
* 🎬 **2 Free Video Generations**

After credits are exhausted:

* Generation access is paused
* User must contact us via email for additional credits
* Manual extension system (temporary — automated billing planned)

This ensures:

* 💰 Controlled AWS costs
* 🛡 Abuse prevention
* ⚡ Stable infrastructure performance

---

# 🧠 Core AI Workflow

## 1️⃣ Optimizer Layer

User prompt → LangChain → Nova Lite → Enhanced artistic prompt

## 2️⃣ Generation Layer

Enhanced prompt →

* Nova Canvas (Images)
* Nova Reel (Videos)

## 3️⃣ Storage Layer

Generated media → AWS S3 → URL saved in PostgreSQL

---

# 🗄 Database Schema Overview

## Users Table

* id
* email
* hashed_password
* subscription_tier
* created_at

## Generations Table

* request_id
* user_id
* model_type (canvas / reel)
* prompt_used
* s3_url
* created_at

## Credits

* Managed via Redis (real-time)
* Synced to PostgreSQL (persistent tracking)

---

# 🔐 Security Architecture

### Password Security

* Bcrypt hashing
* Salted storage

### JWT Flow

* Short-lived Access Tokens
* Refresh Token system
* Protected routes via dependency injection

### Redis Rate Limiter

```python
if await redis.get(user_id) > LIMIT:
    raise HTTPException(status_code=429, detail="Too many requests")
```

Protects against:

* Abuse
* Cost spikes
* Bedrock overuse

---

# 🚀 API Endpoints

## 🔑 Authentication

| Method | Endpoint         |
| ------ | ---------------- |
| POST   | `/auth/register` |
| POST   | `/auth/login`    |

---

## 🎨 AI Generation

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/generate/image`    |
| POST   | `/generate/video`    |
| GET    | `/gallery/my-dreams` |

---

# 🐳 Docker Deployment

## Backend Image

```
warishayat/dreamlens
```

## Frontend Image

```
warishayat/dreamlens-app
```

---

## Run Locally

```bash
git clone https://github.com/warishayat/dreamlens.git
cd dreamlens
docker-compose up --build
```

---

## Required Environment Variables

```
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
DATABASE_URL=
REDIS_URL=
SECRET_KEY=
```

---

# 📈 Production Highlights

✔ Fully containerized
✔ Async scalable backend
✔ Cost-controlled AI usage
✔ Secure JWT auth
✔ Modular architecture
✔ Cloud-ready (Render / AWS compatible)

---

# 🛣 Roadmap

* 💳 Automated credit billing
* 📊 Admin analytics dashboard
* 🌍 Multi-region deployment
* 📱 Mobile app version
* 🤖 Fine-tuned AI pipelines

---

# 👨‍💻 Author

**Waris Hayat**
Full Stack AI/ML Engineer

🔗 GitHub: [https://github.com/warishayat](https://github.com/warishayat)
🔗 LinkedIn: [https://linkedin.com/in/warishayat](https://linkedin.com/in/warishayat)

---

<p align="center">
⭐ If you like this project, consider giving it a star.
</p>

---
