import { Navigate, RouteObject } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
import Root from '@/pages/Root'
import { RouteName } from './constants/RouteName'

export const routes: RouteObject[] = [
  {
    path: RouteName.HOME,
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'kalkulator-deposito',
        element: <Navigate to={RouteName.HOME} replace />
      },
      {
        path: 'kalkulator-deposito/:bankSlug',
        lazy: async () => {
          const mod = await import('@/pages/BankCalculatorPage/BankCalculatorPage')
          return { Component: mod.default }
        }
      },
      {
        path: 'tentang',
        lazy: async () => {
          const mod = await import('@/pages/AboutPage/AboutPage')
          return { Component: mod.default }
        }
      },
      {
        path: 'about',
        element: <Navigate to={RouteName.ABOUT} replace />
      },
      {
        path: 'sumber-data',
        lazy: async () => {
          const mod = await import('@/pages/TransparencyPage/TransparencyPage')
          return { Component: mod.default }
        }
      },
      {
        path: 'transparency',
        element: <Navigate to={RouteName.TRANSPARENCY} replace />
      },
      {
        path: 'blog',
        lazy: async () => {
          const mod = await import('@/pages/BlogPage/BlogPage')
          return { Component: mod.default }
        }
      },
      {
        path: 'blog/:slug',
        lazy: async () => {
          const mod = await import('@/pages/BlogPage/BlogPost')
          return { Component: mod.default }
        }
      },
      {
        path: '*',
        lazy: async () => {
          const mod = await import('@/pages/NotFoundPage')
          return { Component: mod.default }
        }
      }
    ]
  }
]
