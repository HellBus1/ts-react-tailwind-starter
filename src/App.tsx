import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { routes } from './routes'

const AppRouter = createBrowserRouter([...routes])

function App() {
  return <RouterProvider router={AppRouter} />
}

export default App
