# 🌿 Virtual Herbal Garden

An AI-powered Virtual Herbal Garden web application that provides information about medicinal plants, their cultivation, traditional uses, and related knowledge.

The application includes an AI chatbot that can retrieve information from the plant database and use web search when recent or research-based information is required.

## 🚀 Live Demo

**Frontend:**  
https://virtual-herbal-garden-frontend.onrender.com/

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
```

### 🌱 Plant Database

The `getPlantDetails` tool retrieves plant information from the Virtual Herbal Garden database.

It is used when the requested information is available in the application's database.

### 🌐 Web Search

The `webSearch` tool searches the internet when the user requests:

- Recent information
- Current information
- Scientific research
- Research-based information
- Additional external information

The AI determines which tool is appropriate based on the user's question.

---

## 🛠️ Technology Stack

### Frontend

- **React.js** – User interface
- **Vite** – Frontend build tool
- **Tailwind CSS** – Styling and responsive design
- **React Router** – Client-side routing
- **Axios** – API communication

### Backend

- **Node.js** – Backend runtime
- **Express.js** – REST API and server
- **JWT** – Authentication
- **bcryptjs** – Password hashing
- **Multer** – File uploads

### Database

- **MongoDB** – Application database
- **Mongoose** – MongoDB ODM

### Artificial Intelligence

- **Google Gemini API** – AI language model
- **AI Agent / Tool Calling** – Intelligent tool selection and response generation

### Web Search

- **Tavily API** – Web search for current and research-based information

### Cloud & Storage

- **Cloudinary** – Image storage and management

### Development & Testing

- **Git & GitHub** – Version control
- **Postman** – API testing
- **VS Code** – Development environment

### Deployment

- **Render** – Frontend and backend deployment

---

## 📁 Project Structure

```text
virtual-herbal-garden/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── tools/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

---

## 🔌 API Structure

The backend uses versioned REST APIs.

### Base URL

```text
https://virtual-herbal-garden-api.onrender.com/api/v1
```

### Plant Routes

```text
/api/v1/plants
```

### Authentication Routes

```text
/api/v1/auth
```

### Bookmark Routes

```text
/api/v1/bookmarks
```

### User Routes

```text
/api/v1/users
```

### Admin Routes

```text
/api/v1/admin
```

### Conversation Routes

```text
/api/v1/conversations
```

### Message Routes

```text
/api/v1/messages
```

### Chat Routes

```text
/api/v1/chat
```

---

## ⚙️ Environment Variables

### Backend

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
```

Add any other environment variables required by your backend configuration.

> **Important:** Never commit actual API keys, passwords, or database credentials to GitHub.

### Frontend

For local development:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

For production, configure the following environment variable in Render:

```env
VITE_API_URL=https://virtual-herbal-garden-api.onrender.com/api/v1
```

---

## 💻 Local Development

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd virtual-herbal-garden
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create:

```text
backend/.env
```

Add the required environment variables.

### 4. Start the backend

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Configure frontend environment variables

Create:

```text
frontend/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

### 7. Start the frontend

```bash
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

---

## 🧪 Testing

The application can be tested through the web application and API endpoints using Postman.

### Plant Questions

```text
Tell me about Tulsi.
```

```text
How is Tulsi cultivated?
```

```text
What type of soil does Tulsi prefer?
```

### Structured Responses

```text
Explain the cultivation of Tulsi using a heading, a numbered list, and a short bullet-point list of important care tips.
```

The chatbot should provide readable headings, numbered steps, and separate bullet points.

### Conversation Context

Start with:

```text
Tell me about Tulsi.
```

Then ask:

```text
How is it cultivated?
```

Then:

```text
What type of soil does it prefer?
```

The chatbot should understand that **"it" refers to Tulsi**.

### Web Search

```text
What does recent scientific research say about Tulsi and stress?
```

The chatbot should use web search for recent or research-based information.

### General Web Question

```text
Who won the FIFA World Cup in 2022?
```

The chatbot should use web search when external information is required.

### Conversation Persistence

1. Open the chatbot.
2. Start a conversation.
3. Send multiple messages.
4. Close the chatbot.
5. Reopen the chatbot.
6. Refresh the page.
7. Verify that the previous conversation can be retrieved.
8. Start a new conversation.
9. Verify that it creates a separate conversation.

---

## 🌐 Deployment

The application is deployed using Render.

### Backend

```text
GitHub Repository
       │
       ▼
Render Web Service
       │
       ▼
Node.js + Express
       │
       ├── MongoDB
       ├── Gemini API
       └── Tavily API
```

### Frontend

```text
GitHub Repository
       │
       ▼
Render Static Site
       │
       ▼
React + Vite
       │
       ▼
Production Backend API
```
## 📸 Screenshots
### 🏠 Home Page
<img width="1515" height="725" alt="image" src="https://github.com/user-attachments/assets/15f0428a-624f-4ee6-a5c8-40c5dee258dc" />

### 🌱 Plants
<img width="1505" height="720" alt="image" src="https://github.com/user-attachments/assets/ea0ec3a4-359a-46fe-b983-71775147ab1e" />

### 🤖 AI Herbal Assistant
<img width="1506" height="718" alt="image" src="https://github.com/user-attachments/assets/98e80c3e-8cdb-44f6-89a5-d7d616b7f99b" />

### Admin Page
<img width="1512" height="726" alt="image" src="https://github.com/user-attachments/assets/cbb1ddc4-b168-4720-aaa8-7eec990e132c" />

### Admin Manage Page 
<img width="1505" height="720" alt="image" src="https://github.com/user-attachments/assets/2e33297a-16a3-4ef5-a8e3-9c8dbf1c61d1" />

### Admin Add plant Page 
<img width="1511" height="728" alt="image" src="https://github.com/user-attachments/assets/33f9e4f3-ffa6-48f9-942f-6082d58a40de" />






### Production Backend

https://virtual-herbal-garden-api.onrender.com

---

## 🔒 Security

- Passwords are hashed using bcrypt
- JWT is used for authentication
- Protected routes require authentication
- API keys are stored in environment variables
- `.env` files are excluded from Git
- Backend API secrets are not exposed to the frontend

---

## 🔮 Future Improvements

- Voice-based plant queries
- Multilingual chatbot
- Plant image recognition
- 3D plant models
- Audio descriptions
- Personalized virtual garden
- Advanced plant recommendations
- AI response streaming
- Automated testing using Jest or Vitest

---

## 👨‍💻 Author

**Karthik Ullal**

---

## 📄 License

This project is developed for educational and project purposes.
