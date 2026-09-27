import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'
import Root from '@/pages/Root'
import AboutPage from '@/pages/AboutPage/AboutPage'
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute'
import { RouteName } from './constants/RouteName'

const LoginPage = lazy(() => import('@/pages/LoginPage/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/RegisterPage/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPasswordPage/ForgotPasswordPage'))

const SuspenseFallback = (
  <div className='flex items-center justify-center p-12'>
    <span className='loading loading-spinner loading-md text-primary' />
  </div>
)

export const routes: RouteObject[] = [
  {
    path: RouteName.HOME,
    element: <Root />,
    children: [
      {
        path: RouteName.HOME,
        element: <HomePage />
      },
      {
        path: RouteName.ABOUT,
        element: <AboutPage />
      },
      {
        path: RouteName.PROFILE,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: RouteName.LOGIN,
        element: (
          <Suspense fallback={SuspenseFallback}>
            <LoginPage />
          </Suspense>
        )
      },
      {
        path: RouteName.REGISTER,
        element: (
          <Suspense fallback={SuspenseFallback}>
            <RegisterPage />
          </Suspense>
        )
      },
      {
        path: RouteName.FORGOT_PASSWORD,
        element: (
          <Suspense fallback={SuspenseFallback}>
            <ForgotPasswordPage />
          </Suspense>
        )
      }
    ]
  }
]
