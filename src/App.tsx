import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { routes } from './routes'
import { AuthProvider } from './hooks/AuthProvider'

const AppRouter = createBrowserRouter([...routes])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={AppRouter} />
    </AuthProvider>
  )
}

export default App
