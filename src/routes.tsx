import { Navigate, RouteObject } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
import AboutPage from '@/pages/AboutPage/AboutPage'
import TransparencyPage from '@/pages/TransparencyPage/TransparencyPage'
import BlogPage from '@/pages/BlogPage/BlogPage'
import BlogPost from '@/pages/BlogPage/BlogPost'
import NotFoundPage from '@/pages/NotFoundPage'
import Root from '@/pages/Root'
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
        path: '/kalkulator-deposito',
        element: <HomePage />
      },
      {
        path: RouteName.ABOUT,
        element: <AboutPage />
      },
      {
        path: '/about',
        element: <Navigate to={RouteName.ABOUT} replace />
      },
      {
        path: RouteName.TRANSPARENCY,
        element: <TransparencyPage />
      },
      {
        path: '/transparency',
        element: <Navigate to={RouteName.TRANSPARENCY} replace />
      },
      {
        path: RouteName.BLOG,
        element: <BlogPage />
      },
      {
        path: `${RouteName.BLOG}/:slug`,
        element: <BlogPost />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]
