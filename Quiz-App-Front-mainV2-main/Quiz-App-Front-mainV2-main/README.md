# Quiz App - Frontend

A modern, responsive React application for an interactive quiz platform. Built with Vite, Redux Toolkit, and Material-UI.

## Features

### 🎓 Student Interface
- Browse available quizzes
- Take quizzes with timer
- View instant results and scores
- Review quiz history
- Performance analytics and statistics
- Search and filter quizzes by category
- Responsive design for all devices

### 👨‍💼 Admin Dashboard
- Comprehensive dashboard with analytics
- Student management
- Category and subcategory management
- Question bank
- Create and manage quizzes
- View performance statistics
- Generate reports

## Prerequisites

- Node.js v14 or higher
- npm or yarn
- Running Backend API on `http://localhost:5000`

## Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

Application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── admin/                   # Admin dashboard
│   ├── components/         # Reusable admin components
│   └── screens/           # Admin pages
├── students/              # Student interface
│   ├── components/        # Student components
│   └── screens/          # Student pages
├── components/            # Shared components
│   ├── header/
│   ├── footer/
│   ├── sideBar/
│   ├── loader/
│   ├── searchBar/
│   ├── filterBar/
│   ├── roleGuard/
│   └── ...
├── redux/                 # Redux state management
│   ├── store.js
│   ├── quizSlice.js
│   └── ...
├── routes/                # Application routing
│   ├── adminRoutes.jsx
│   └── studentRoutes.jsx
├── api/                   # API integration
│   └── baseUrl.js
├── hooks/                 # Custom React hooks
│   ├── useFetch.js
│   ├── useQuizManager.js
│   └── useSearchFilter.js
├── enums/                 # Constants and enums
├── utils/                 # Utility functions
├── styles/                # Global styles and colors
├── App.jsx                # Main component
└── main.jsx              # Entry point
```

## Tech Stack

- **React 18.3.1** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **Material-UI (MUI)** - Component library
- **React Router 7** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Charts and graphs
- **Chart.js** - Advanced charting
- **React Icons** - Icon library
- **Emotion** - CSS-in-JS styling

## Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

## Key Features

### State Management
- Redux Toolkit for centralized state
- Custom hooks for common patterns
- Slice-based organization

### Routing
- Protected routes with role guards
- Lazy loading for components
- Nested routes for admin/student

### Components
- Reusable and modular components
- Material-UI for consistent design
- Custom styled components

### API Integration
- Centralized API configuration
- Axios interceptors for auth
- Error handling and loading states

## Environment Setup

Ensure Backend is running before starting Frontend:

```bash
# Terminal 1: Backend
cd Quiz-App-Backend22-main
npm run dev

# Terminal 2: Frontend
cd Quiz-App-Front-mainV2-main
npm run dev
```

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in Redux
4. Token included in all API requests
5. Role-based routing (Student/Admin)

## Performance Optimizations

- Code splitting with lazy loading
- Image optimization
- CSS minification
- Bundle analysis available
- Vite fast refresh for development

## Troubleshooting

### API Connection Issues
- Verify Backend is running on `http://localhost:5000`
- Check `VITE_API_BASE_URL` in `.env`
- Clear browser cache and local storage

### Build Issues
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port Already in Use
```bash
# Change default port
npm run dev -- --port 3000
```

## Documentation

- [QUICK_START.md](./QUICK_START.md) - Quick start guide
- [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) - Backend integration guide

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.
