# SocialConnect Frontend

A modern social networking app built with React and Vite. Connect with friends, discover new people, plan hangouts, and chat in real-time.

## Features

- 🔐 Secure user authentication
- 👤 Profile management
- 🔍 Discover and connect with people
- 🎉 Create and join hangouts
- 💬 Real-time chat
- 🔔 Notifications
- ⚙️ User settings
- 🛡️ Admin panel

## Tech Stack

- React 19
- Vite
- React Router
- Tailwind CSS
- Socket.io Client
- Axios
- Framer Motion
- Lucide React

## Quick Start

### Requirements

- Node.js v16+
- npm or yarn

### Setup

1. Clone the repo and navigate to the frontend folder:
```bash
git clone https://github.com/harshita-sakaray26/socialconnect.git
cd socialconnect/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```
VITE_API_URL=http://localhost:5000
```

4. Run the dev server:
```bash
npm run dev
```

The app opens automatically at `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Check code quality

## Project Structure

```
src/
├── components/   # Reusable components
├── pages/        # Page components
├── context/      # Auth context
├── api.js        # API calls
├── App.jsx       # Main app
└── main.jsx      # Entry point
```

## Pages

- `/` - Home
- `/login` - Login
- `/register` - Sign up
- `/discover` - Find people
- `/hangouts` - Hangouts
- `/profile` - Your profile
- `/chat` - Messages
- `/notifications` - Updates
- `/settings` - Preferences
- `/admin` - Admin panel

## Authentication

Uses JWT tokens stored in localStorage. The `AuthContext` handles auth state and private routes require login.

## Real-time Features

Socket.io is used for live chat, notifications, and instant updates.

## Browser Support

Works on Chrome, Firefox, Safari, and Edge.

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Push and open a PR


## License

MIT License
