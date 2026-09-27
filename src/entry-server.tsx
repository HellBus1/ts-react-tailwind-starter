import ReactDOMServer from 'react-dom/server'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'

export function render(url: string) {
  const router = createMemoryRouter(routes, {
    initialEntries: [url]
  })

  const html = ReactDOMServer.renderToString(<RouterProvider router={router} />)

  return { html }
}
