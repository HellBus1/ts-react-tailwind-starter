import { RouteObject } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'
import Root from '@/pages/Root'
import AboutPage from '@/pages/AboutPage/AboutPage'
import { RouteName } from './constants/RouteName'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Dashboard } from './pages/Dashboard'
import { ProtectedRoute } from './components/ProtectedRoute'

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: RouteName.HOME,
        element: <HomePage />
      },
      {
        path: RouteName.PROFILE,
        element: <ProfilePage />
      },
      {
        path: RouteName.ABOUT,
        element: <AboutPage />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />
          }
        ]
      }
    ]
  }
]
