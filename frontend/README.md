# SocialConnect - Frontend

A modern social networking platform built with React and Vite. Connect with friends, discover new people, plan hangouts, and chat in real-time.

## Features

- 🔐 **Authentication** - Secure user login and registration
- 👤 **Profile Management** - Create and edit your profile
- 🔍 **Discover People** - Find and connect with new users
- 🎉 **Hangouts** - Plan and organize hangouts with friends
- 💬 **Real-time Chat** - Instant messaging with Socket.io
- 🔔 **Notifications** - Stay updated with real-time notifications
- ⚙️ **Settings** - Customize your preferences
- 🛡️ **Admin Panel** - Manage platform content and users

## Tech Stack

- **React 19** - UI library
- **Vite** - Lightning-fast build tool with HMR
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon library
- **ESLint** - Code quality and consistency

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/socialconnect.git
cd socialconnect/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your backend URL:
```
VITE_API_URL=http://localhost:5000
```

### Development

Run the development server with hot module replacement:

```bash
npm run dev
```

The app will open automatically at `http://localhost:5173/`

### Building

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Linting

Check code quality:

```bash
npm run lint
```

## Project Structure

```
src/
├── components/     # Reusable React components
├── pages/         # Page components
├── context/       # React Context (Auth)
├── api.js         # API client configuration
├── App.jsx        # Main app component
├── main.jsx       # Entry point
└── index.css      # Global styles
```

## Key Pages

- `/` - Landing page
- `/login` - User login
- `/register` - User registration
- `/discover` - Discover new people
- `/hangouts` - View and create hangouts
- `/profile` - View user profile
- `/edit-profile` - Edit profile information
- `/chat` - Real-time messaging
- `/notifications` - User notifications
- `/settings` - User settings
- `/admin` - Admin dashboard

## API Integration

The frontend communicates with the backend API via Axios. Base URL is configured in `.env` file.

Common endpoints:
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /users/discover` - Discover people
- `GET /hangouts` - Get user's hangouts
- `GET /profile` - Get user profile

## Authentication

Uses JWT (JSON Web Tokens) stored in localStorage. The `AuthContext` manages authentication state across the app. Private routes are protected with the `PrivateRoute` component.

## Real-time Features

Socket.io client handles real-time notifications, chat messages, and live updates. Connection is established on app load and managed through React Context.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@socialconnect.com or open an issue on GitHub.

## Acknowledgments

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Socket.io](https://socket.io)
