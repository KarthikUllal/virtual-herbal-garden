# 🌿 Virtual Herbal Garden

An AI-powered Virtual Herbal Garden web application that provides information about medicinal plants, their cultivation, traditional uses, and related knowledge.

The application includes an AI chatbot that can retrieve information from the plant database and use web search when recent or research-based information is required.

## 🚀 Live Demo

**Frontend:**  
PASTE YOUR FRONTEND RENDER URL HERE

**Backend API:**  
https://virtual-herbal-garden-api.onrender.com

---

## ✨ Features

### 🌱 Plant Management
- Browse medicinal plants
- Search and filter plants
- View detailed plant information
- View cultivation methods and traditional uses

### 🤖 AI Herbal Assistant
- Ask questions about medicinal plants
- Retrieve information from the plant database
- Answer follow-up questions using conversation context
- Search the web for recent or research-based information
- Generate structured and readable responses

### 💬 Chat & Conversations
- Create conversations
- Store chat messages
- Retrieve previous conversations
- Continue previous conversations
- Start a new conversation
- Persistent chat history

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- User profile

### 🔖 Bookmarks
- Bookmark plants
- View bookmarked plants
- Remove bookmarks

### 👨‍💼 Admin
- Admin authentication
- Admin dashboard
- Add plants
- Edit plants
- Delete plants

---

## 🧠 AI Agent

The chatbot uses an AI agent with two main tools:

```text
                    User
                      │
                      ▼
               AI Herbal Assistant
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
      Plant Database       Web Search
     getPlantDetails        webSearch
             │                 │
             └────────┬────────┘
                      ▼
                 AI Response
