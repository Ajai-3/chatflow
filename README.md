ChatFlow – Real-time Chat Application
A modern, responsive real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

Features
Real-time messaging using Socket.IO

User authentication with JWT

Fully responsive design for desktop and mobile

Online/offline user status indicators

User search and chat initiation

Emoji picker support

Light/Dark theme switching

Mobile-first UI with smooth user experience

Tech Stack
Frontend
React 19

Redux Toolkit

React Router

Socket.IO Client

Tailwind CSS + DaisyUI

React Hot Toast

React Icons

Emoji Picker React

Backend
Node.js + Express.js

Socket.IO

MongoDB + Mongoose

JWT for auth

bcrypt for password hashing

CORS for cross-origin handling

Installation
Prerequisites
Node.js (v16+)

MongoDB installed locally or remotely

npm or yarn

Clone Repository
bash
Copy
Edit
git clone <repository-url>
cd socket-io
Backend Setup
bash
Copy
Edit
cd server
npm install
Create a .env file inside the server folder:

env
Copy
Edit
PORT=5000
MONGO_URL=mongodb://localhost:27017/chatflow
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
Frontend Setup
bash
Copy
Edit
cd client
npm install
Create a .env file inside the client folder:

env
Copy
Edit
VITE_APP_URL=http://localhost:5000
Running the App
Start backend:

bash
Copy
Edit
cd server
npm run dev
Start frontend:

bash
Copy
Edit
cd client
npm run dev
Frontend: http://localhost:5173
Backend: http://localhost:5000

Production Build
Frontend:

bash
Copy
Edit
cd client
npm run build
Backend:

bash
Copy
Edit
cd server
npm start
Project Structure
arduino
Copy
Edit
socket-io/
├── client/                 React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── hooks/
│   │   └── context/
├── server/                 Node backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── socket/
│   │   └── config/
Highlighted Features
Real-time Messaging
Messages delivered instantly via Socket.IO

Persistent message history

Online/offline status per user

Secure Authentication
JWT tokens for secure session handling

Encrypted passwords with bcrypt

Middleware for protected routes

Smart User Search
Fast user lookup by username

Debounced search input

Easy user chat initiation

Mobile Optimization
Touch-friendly layout

Adaptive navigation

Collapsible sidebar

Contributing
Fork the repository

Create a feature branch

Commit and push changes

Open a pull request

License
MIT License

