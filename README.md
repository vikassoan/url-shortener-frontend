# Frontend Documentation

## Overview

The frontend is a modern React application built with Vite that provides a user interface for shortening URLs, user authentication, and managing shortened links. It uses Redux for state management and Axios for API communication.

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Redux Toolkit & React-Redux** - State management
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
FRONTEND/
├── package.json
├── index.html
├── vite.config.js
├── eslint.config.js
└── src/
    ├── App.jsx                     # Root component
    ├── main.jsx                    # App entry point
    ├── RootLayout.jsx              # Root layout wrapper
    ├── index.css                   # Global styles
    ├── api/
    │   ├── shortUrl.api.js         # URL shortening API calls
    │   └── user.api.js             # User API calls
    ├── components/
    │   ├── LoginForm.jsx           # Login form component
    │   ├── RegisterForm.jsx        # Registration form component
    │   ├── NavBar.jsx              # Navigation bar
    │   ├── UrlForm.jsx             # URL shortening form
    │   └── UserUrl.jsx             # Display user's URLs
    ├── pages/
    │   ├── AuthPage.jsx            # Authentication page
    │   ├── HomePage.jsx            # Home page with URL form
    │   └── DashboardPage.jsx       # User dashboard
    ├── routing/
    │   ├── auth.route.js           # Auth routes
    │   ├── dashboard.js            # Dashboard routes
    │   ├── homepage.js             # Home routes
    │   └── routeTree.js            # Route tree configuration
    ├── store/
    │   ├── store.js                # Redux store setup
    │   └── slice/
    │       └── authSlice.js        # Auth state slice
    └── utils/
        ├── axiosInstance.js        # Configured Axios instance
        └── helper.js               # Helper functions
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:3000`

### Steps

1. **Navigate to frontend directory:**
   ```bash
   cd FRONTEND
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Application runs on `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```
   Output in `dist/` directory

## Pages

### AuthPage (`src/pages/AuthPage.jsx`)
- Login/Registration page
- Toggle between login and registration forms
- Handles user authentication state
- Redirects to dashboard on successful login

### HomePage (`src/pages/HomePage.jsx`)
- Landing page with URL shortener form
- For anonymous users or users not logged in
- Creates temporary short URLs
- No authentication required

### DashboardPage (`src/pages/DashboardPage.jsx`)
- User dashboard (authenticated users only)
- Contains URL shortening form
- Displays all user's shortened URLs with click counts
- Shows URL analytics and management options

## Components

### LoginForm (`src/components/LoginForm.jsx`)
- Email and password input fields
- Login submission handling
- Toggle to registration form link
- Form validation and error display
- Stores authentication token in Redux

### RegisterForm (`src/components/RegisterForm.jsx`)
- Name, email, and password input fields
- User registration handling
- Form validation and error display
- Toggle to login form link
- Password confirmation validation

### UrlForm (`src/components/UrlForm.jsx`)
- Input field for long URL
- Optional custom slug field (for authenticated users)
- Submit button to create short URL
- Copy-to-clipboard functionality
- Success/error messages
- Loading state handling

### UserUrl (`src/components/UserUrl.jsx`)
- Displays list of user's shortened URLs
- Shows original URL, short URL, and click count
- Copy short URL to clipboard
- Delete URL option with confirmation
- Responsive grid layout

### NavBar (`src/components/NavBar.jsx`)
- Navigation bar with branding
- User profile display (authenticated users)
- User avatar from Gravatar
- Logout button
- Links to different pages
- Responsive mobile menu

## State Management

### Redux Store (`src/store/store.js`)
- Centralized state management using Redux Toolkit
- Combines all slices for complete app state
- Redux DevTools integration for debugging

### Auth Slice (`src/store/slice/authSlice.js`)
- **State:**
  - `user`: Currently authenticated user object
  - `isAuthenticated`: Boolean indicating login status
  - `token`: JWT token (stored in localStorage/cookies)
  - `loading`: Loading state for auth operations
  - `error`: Error messages for failed operations

- **Actions:**
  - `loginUser(userData)` - Update state on successful login
  - `logoutUser()` - Clear auth state on logout
  - `setCurrentUser(user)` - Set current user info
  - `setError(error)` - Set error message

- **Selectors:**
  - `selectUser` - Get current user
  - `selectIsAuthenticated` - Check authentication status
  - `selectLoading` - Get loading state

## API Integration

### axiosInstance (`src/utils/axiosInstance.js`)
- Configured Axios client with base URL pointing to backend
- Automatic token inclusion in request headers
- Handles authentication headers
- Error interceptors for consistent error handling
- Request/response interceptors for auth flow

### shortUrl API (`src/api/shortUrl.api.js`)
API functions for URL shortening operations:
- `createShortUrl(url, slug)` - Create new short URL
  - Parameters: `url` (string), `slug` (optional string)
  - Returns: Short URL response with created short link
  
- `getUserUrls()` - Fetch user's URLs
  - Authorization: Required
  - Returns: Array of user's shortened URLs
  
- `deleteUrl(id)` - Delete a shortened URL
  - Parameters: `id` (URL document ID)
  - Returns: Success confirmation

### user API (`src/api/user.api.js`)
API functions for user operations:
- `getCurrentUser()` - Fetch current user data
  - Authorization: Required
  - Returns: Current user object
  
- `updateProfile(data)` - Update user information
  - Parameters: `data` (object with user fields to update)
  - Returns: Updated user object

## Routing

### Route Structure
- `/` - Home page (public)
- `/auth` - Authentication page (login/register, public)
- `/dashboard` - User dashboard (protected, requires authentication)
- `/:id` - Redirect route (handled by backend)

### Route Guards
Routes are protected using authentication middleware that:
- Checks if user is logged in
- Redirects unauthenticated users to login page
- Maintains user session across page refreshes

## Development Workflow

### Start Development Server
```bash
cd FRONTEND
npm run dev
```

The development server will run with HMR (Hot Module Replacement) on `http://localhost:5173`

### Running Both Backend and Frontend

Open two terminals:

1. **Terminal 1** (Backend):
   ```bash
   cd BACKEND
   npm run dev
   ```

2. **Terminal 2** (Frontend):
   ```bash
   cd FRONTEND
   npm run dev
   ```

Visit `http://localhost:5173` in your browser.

## Building for Production

```bash
cd FRONTEND
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy Production Build
The `dist/` folder can be deployed to:
- Static hosting services (Vercel, Netlify, GitHub Pages)
- CDN services (AWS S3, CloudFlare)
- Web servers (Nginx, Apache)

## Features & Functionality

### User Authentication
- User registration with email validation
- Secure login with JWT tokens
- Session persistence across page refreshes
- Automatic logout on token expiration
- User profile with avatar from Gravatar

### URL Shortening
- Shorten long URLs into shareable links
- Custom slug support for authenticated users
- One-click copy to clipboard
- Copy confirmation feedback

### URL Management
- View all shortened URLs on dashboard
- See click count for each URL
- Delete unwanted shortened URLs
- Search and filter URLs (extensible)

### User Experience
- Clean, intuitive interface
- Responsive design for mobile and desktop
- Loading states for better UX
- Error handling with user-friendly messages
- Toast notifications for actions (extensible)

## Styling

The application uses **Tailwind CSS** for styling:
- Utility-first CSS framework
- Customizable theme configuration
- Responsive design with Tailwind breakpoints
- Dark mode support (can be added)

Configure Tailwind in `tailwind.config.js` if needed.

## Environment Configuration

API endpoint configuration can be adjusted in `src/utils/axiosInstance.js`:
- Development environment should target the local backend API: `http://localhost:3000`
- Production environment should target your production backend URL

## Future Enhancements

- URL expiration dates and scheduling
- Advanced analytics dashboard
- Batch URL shortening
- Custom branded domains
- Email verification for new accounts
- Two-factor authentication
- URL preview before redirect

## Contributing

When contributing to the frontend:
1. Follow React best practices and ESLint rules
2. Keep components small and reusable
3. Use Redux for state that's shared across components
4. Add PropTypes or TypeScript for type safety
5. Test components before submitting changes
6. Update this README if adding new pages or components

## Performance Optimization

- Code splitting with React Router
- Lazy loading of routes
- Image optimization
- CSS minification in production build
- Bundle size analysis with `npm run build -- --analyze`

---

**Last Updated:** February 2026
**Version:** 1.0.0
