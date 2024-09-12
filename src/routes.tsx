import { RouteObject } from 'react-router-dom'
import HomePage from '@/pages/HomePage/HomePage'
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
      }
    ]
  }
]
