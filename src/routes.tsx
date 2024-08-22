import { RouteObject } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
import ProfilePage from '@/pages/ProfilePage/ProfilePage'
import Root from '@/pages/Root'
import AboutPage from '@/pages/AboutPage/AboutPage'
import { RouteName } from './constants/RouteName'

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
        path: RouteName.PROFILE,
        element: <ProfilePage />
      },
      {
        path: RouteName.ABOUT,
        element: <AboutPage />
      }
    ]
  }
]
