import { Outlet } from 'react-router-dom'
import TailwindCSSLogo from '@/assets/tailwindcss-icon.svg'
import ReactLogo from '@/assets/react-icon.svg'
import ReactRouterLogo from '@/assets/react-router-icon.svg'
import Navbar from '@/components/Navbar/Navbar'

const Root = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center relative'>
      <Navbar />
      <div className='flex space-x-4 mb-6'>
        <img src={TailwindCSSLogo} className='w-12' />
        <img src={ReactLogo} className='w-12' />
        <img src={ReactRouterLogo} className='w-12' />
      </div>
      <h1 className='mb-3'>React Starter Template</h1>
      <Outlet />
    </div>
  )
}

export default Root
