# ChatFlow - Real-time Chat Application

A modern, responsive real-time chat application built with React, Node.js, Socket.IO, and MongoDB.

## ✨ Features

- **Real-time messaging** with Socket.IO
- **User authentication** with JWT
- **Responsive design** - works on desktop and mobile
- **User search** functionality
- **Online/offline status** indicators
- **Emoji picker** support
- **Modern UI** with DaisyUI and Tailwind CSS
- **Theme switching** (light/dark mode)
- **Mobile-first design** with touch-friendly interface

## 🚀 Tech Stack

### Frontend
- **React 19** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Socket.IO Client** - Real-time communication
- **Tailwind CSS** - Styling
- **DaisyUI** - UI components
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Emoji Picker React** - Emoji support

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Clone the repository
```bash
git clone <repository-url>
cd socket-io
```

### Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/chatflow
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```env
VITE_APP_URL=http://localhost:5000
```

## 🏃‍♂️ Running the Application

### Start the backend server
```bash
cd server
npm run dev
```

### Start the frontend development server
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📱 Mobile Responsiveness

ChatFlow is designed with mobile-first approach:
- **Responsive layout** that adapts to all screen sizes
- **Touch-friendly interface** with proper button sizing
- **Mobile navigation** with back buttons
- **Optimized chat interface** for mobile devices
- **Collapsible sidebar** on mobile screens

## 🔧 Build for Production

### Frontend
```bash
cd client
npm run build
```

### Backend
```bash
cd server
npm start
```

## 📁 Project Structure

```
socket-io/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   ├── hooks/         # Custom hooks
│   │   └── context/       # React contexts
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── socket/        # Socket.IO configuration
│   │   └── config/        # Database configuration
│   └── package.json
└── README.md
```

## 🌟 Key Features Explained

### Real-time Messaging
- Instant message delivery using Socket.IO
- Online/offline user status
- Message history persistence

### User Authentication
- Secure JWT-based authentication
- Password hashing with bcrypt
- Protected routes and middleware

### Search Functionality
- Real-time user search by username
- Debounced search for performance
- Add new users to chat list

### Mobile Experience
- Responsive design for all devices
- Touch-optimized interface
- Mobile-specific navigation patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**ChatFlow Team**

---

Built with ❤️ using modern web technologies
