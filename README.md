# MERN Stack Purchase Order Project
**1. Project Overview**

Goal: A web application to Create, Read, Update, and Delete (CRUD) Purchase Orders.

Logic: Automatically calculates Total Price (Quantity * Unit Price) on the backend.

Tech Stack:

Frontend: React (Vite)

Backend: Node.js (Express)

Database: MongoDB

Infrastructure: Docker & Docker Compose

**2. Project Structure**

purchase-order-app/

├── client/                 # React Frontend (Node 22)

│   ├── Dockerfile       

│   ├── vite.config.js      # Configured for Docker network

│   ├── package.json

│   └── src/

│       └── App.jsx         # Main UI & Logic (Fixed hooks)

├── server/                 # Express Backend (Node 22)

│   ├── Dockerfile

│   ├── index.js            # Routes & Error Handling

│   ├── package.json

│   └── models/

│       └── Order.js        # Schema & Calculation Hook

└── docker-compose.yml      # Orchestration

**3. Cheat Sheet Commands**

Action	Command

Start / Restart	docker-compose up

Start Clean (Rebuild)	docker-compose up --build

Stop	Ctrl + C (in terminal)

Stop & Remove Containers	docker-compose down

Stop & DELETE Data	docker-compose down -v (Careful!)

Check Backend Logs	docker logs mern_server

Check Frontend Logs	docker logs mern_client

URLs:

Frontend: http://localhost:5173

Backend API: http://localhost:5000/orders

<img width="1118" height="732" alt="image" src="https://github.com/user-attachments/assets/8f89769d-637d-424e-b928-084a9519257c" />


