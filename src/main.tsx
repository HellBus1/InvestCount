import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, matchRoutes, RouterProvider } from 'react-router-dom'
import './App.css'
import './index.css'
import { routes } from './routes'

async function bootstrap() {
  const rootElement = document.getElementById('root')!

  // Preload any lazy route matching the initial URL so hydrateRoot never mismatches SSR HTML
  const lazyMatches = matchRoutes(routes, window.location)?.filter((m) => m.route.lazy)
  if (lazyMatches && lazyMatches.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy!()
        Object.assign(m.route, { ...routeModule, lazy: undefined })
      })
    )
  }

  const router = createBrowserRouter(routes)
  const app = (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )

  if (rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, app)
  } else {
    ReactDOM.createRoot(rootElement).render(app)
  }
}

void bootstrap()
