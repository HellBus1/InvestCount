import ReactDOMServer from 'react-dom/server'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { ssrRoutes } from './routes.ssr'
import { blogPosts, getAllBlogPosts } from './data/blogPosts'
import { homeFAQs } from './data/faqs'
import { BANK_CALCULATOR_PAGES } from './data/bankCalculatorPages'

export function render(url: string) {
  const router = createMemoryRouter(ssrRoutes, {
    initialEntries: [url]
  })

  const html = ReactDOMServer.renderToString(<RouterProvider router={router} />)

  return { html }
}

export { blogPosts, getAllBlogPosts, homeFAQs, BANK_CALCULATOR_PAGES }
