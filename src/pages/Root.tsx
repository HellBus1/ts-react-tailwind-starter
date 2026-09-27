import { Outlet } from 'react-router-dom'
import TailwindCSSLogo from '@/assets/tailwindcss-icon.svg'
import ReactLogo from '@/assets/react-icon.svg'
import ReactRouterLogo from '@/assets/react-router-icon.svg'
import Navbar from '@/components/Navbar/Navbar'
import MetaTagController from '@/components/MetaTagController/MetaTagController'

const Root = () => {
  return (
    <div className='min-h-screen flex flex-col bg-base-100 text-base-content relative'>
      <MetaTagController />
      <header>
        <Navbar />
      </header>
      <main
        id='main-content'
        className='flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 w-full max-w-4xl mx-auto text-center'
      >
        <div className='flex items-center justify-center space-x-4 mb-6'>
          <img
            src={TailwindCSSLogo}
            alt='Tailwind CSS logo'
            className='w-12 h-12 transition-transform duration-200 hover:scale-110'
            width={48}
            height={48}
          />
          <img
            src={ReactLogo}
            alt='React logo'
            className='w-12 h-12 transition-transform duration-200 hover:scale-110'
            width={48}
            height={48}
          />
          <img
            src={ReactRouterLogo}
            alt='React Router logo'
            className='w-12 h-12 transition-transform duration-200 hover:scale-110'
            width={48}
            height={48}
          />
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default Root
