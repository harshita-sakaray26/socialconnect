# SocialConnect 🌐

> **Connect. Belong. Explore.**

A modern full-stack social networking platform designed to help you build genuine connections, discover like-minded people, and organize amazing group hangouts.

---

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node Version](https://img.shields.io/badge/node-%3E%3D16.0-brightgreen)
![React](https://img.shields.io/badge/react-19.2.5-61dafb?logo=react)
![Vite](https://img.shields.io/badge/vite-8.0.10-646cff?logo=vite)

---

## ✨ Features

### Core Social Features

- 🔐 **Secure Authentication** - JWT-based secure login and registration
- 👥 **User Discovery** - Smart algorithm to find like-minded people
- 🎉 **Hangouts & Meetups** - Create, join, and manage group hangouts
- 💬 **Real-time Chat** - Instant messaging with Socket.io
- 🔔 **Notifications** - Real-time updates for new connections and messages
- 👤 **Profile Management** - Customize your profile with personal information

### Admin Features

- 🛡️ **Admin Panel** - Manage users and platform content
- 📊 **Dashboard** - View platform analytics
- ⚙️ **Settings** - Configure platform preferences

### Technical Highlights

- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ⚡ **Fast & Performant** - Optimized with Vite and modern tooling
- 🔄 **Real-time Updates** - Live data synchronization across clients

---

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern UI library with hooks
- **Vite** - Next-generation build tool with Hot Module Replacement
- **React Router v7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time bidirectional communication
- **Axios** - HTTP client for API requests
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful SVG icons

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (supports in-memory cache for demo)
- **Mongoose** - MongoDB object modeling
- **Socket.io** - Real-time communication server
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevTools

- **Nodemon** - Auto-restart development server
- **ESLint** - Code quality and consistency

---

## 📋 Prerequisites

- **Node.js** v16 or higher
- **npm** v8 or higher (or yarn/pnpm)
- **MongoDB** (optional - app includes in-memory cache for demo)

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/harshita-sakaray26/socialconnect.git
cd socialconnect
```

### 2️⃣ Install Dependencies

```bash
npm run install-all
```

Or manually:
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 3️⃣ Environment Configuration

#### Frontend (.env)
Create `frontend/.env`:
```
VITE_API_URL=http://localhost:5000
```

#### Backend (.env)
Create `backend/.env`:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/socialconnect
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 4️⃣ Seed Database (Optional)

```bash
npm run seed
```

### 5️⃣ Start the Application

```bash
npm start
```

The app will automatically open at **http://localhost:5173**

---

## 📂 Project Structure

```
socialconnect/
├── frontend/                 # React + Vite Application
│   ├── src/
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Page components
│   │   ├── context/          # React Context (Auth)
│   │   ├── api.js            # API client configuration
│   │   ├── App.jsx           # Main component
│   │   └── main.jsx          # Entry point
│   └── package.json
│
├── backend/                  # Node.js Express Server
│   ├── models/               # Mongoose schemas
│   │   ├── User.js
│   │   └── Hangout.js
│   ├── routes/               # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── hangoutRoutes.js
│   ├── middleware/           # Express middleware
│   │   └── auth.js
│   ├── server.js             # Express server setup
│   ├── db.js                 # Database connection
│   ├── seed.js               # Database seeding
│   └── package.json
│
├── package.json              # Root configuration
├── .gitignore                # Git ignore rules
├── LICENSE                   # MIT License
└── README.md                 # This file
```

---

## 📡 API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user  
- `POST /auth/logout` - Logout user

### Users

- `GET /users/discover` - Discover new people
- `GET /users/profile` - Get current user profile
- `PUT /users/profile` - Update user profile
- `GET /users/:id` - Get specific user profile
- `POST /users/follow/:id` - Follow a user
- `POST /users/unfollow/:id` - Unfollow a user

### Hangouts

- `GET /hangouts` - Get all hangouts
- `POST /hangouts` - Create new hangout
- `GET /hangouts/:id` - Get specific hangout
- `PUT /hangouts/:id` - Update hangout
- `DELETE /hangouts/:id` - Delete hangout
- `POST /hangouts/:id/join` - Join hangout
- `POST /hangouts/:id/leave` - Leave hangout

---

## 🔑 Demo Credentials

Test the app with these credentials:

| Email | Password |
|-------|----------|
| `alice@test.com` | `password123` |
| `bob@test.com` | `password123` |

Or create your own account during registration.

---

## 🎯 Key Features Explained

### 🔍 Smart Discovery
The discovery page uses user preferences and interests to suggest compatible people to connect with.

### 💬 Real-time Chat
Socket.io enables instant messaging between users with real-time notifications.

### 🎉 Hangout System
Users can create group hangouts, invite friends, and manage RSVP status.

### 🛡️ Admin Dashboard
Administrators can monitor user activity, manage content, and configure platform settings.

---

## 🛠️ Available Commands

### Root Level

```bash
npm start              # Start both frontend and backend
npm run install-all   # Install all dependencies
npm run seed          # Seed database with sample data
```

### Frontend

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
```

### Backend

```bash
npm run dev           # Start with nodemon (auto-reload)
```

---

## 🔒 Security Features

- 🔐 **JWT Authentication** - Secure token-based session management
- 🔑 **Password Hashing** - bcryptjs for secure password storage
- 🚫 **CORS Protection** - Cross-origin request validation
- 🔒 **Protected Routes** - Private routes requiring authentication
- ✔️ **Input Validation** - Server-side validation for all inputs

---

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 🔄 Real-time Features

Socket.io handles:
- 💬 Live chat messages
- 🔔 Real-time notifications
- 👤 User online/offline status
- ⚡ Instant hangout updates

---

## 🐛 Troubleshooting

### Port Already in Use

If port 5000 or 5173 is already in use:

```powershell
# Kill process on port 5000 (Windows PowerShell)
Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue | Stop-Process -Force

# Kill process on port 5173
Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue | Stop-Process -Force
```

### MongoDB Connection Error

Ensure MongoDB is running or update `MONGODB_URI` in `backend/.env` to use MongoDB Atlas or another service.

### Module Not Found

Clear node_modules and reinstall:

```bash
npm run install-all
```

---

## 📚 Documentation

- [Frontend Documentation](./frontend/README.md) - React + Vite setup
- Backend Documentation (Coming soon)

---

## 🤝 Contributing

We welcome contributions! Here's how:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 🙋‍♂️ Support & Contact

- 📧 **Email**: support@socialconnect.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/harshita-sakaray26/socialconnect/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/harshita-sakaray26/socialconnect/discussions)

---

## 🙏 Acknowledgments

Special thanks to:
- [React](https://react.dev) community
- [Vite](https://vitejs.dev) for the amazing build tool
- [Socket.io](https://socket.io) for real-time capabilities
- [Tailwind CSS](https://tailwindcss.com) for styling
- [MongoDB](https://www.mongodb.com) for the database
- All contributors and community members

---

## 📊 Project Status

- ✅ MVP Complete
- 🔄 Active Development
- 📈 Feature Enhancements Ongoing

---

<div align="center">

**Made with ❤️ by the SocialConnect Team**

*Join the community, build connections, explore together!*

[⭐ Star us on GitHub](https://github.com/harshita-sakaray26/socialconnect) | [📧 Contact Us](mailto:support@socialconnect.com)

</div>
#   s o c i a l c o n n e c t 
 
 