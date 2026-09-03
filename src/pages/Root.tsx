import MetaTagController from '@/components/MetaTagController/MetaTagController'
import Navbar from '@/components/Navbar/Navbar'
import QuickNav from '@/components/QuickNav/QuickNav'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='min-h-screen flex flex-col bg-slate-50 text-slate-900 relative font-sans'>
      <MetaTagController />
      <Navbar />
      <main className='flex-grow w-full'>
        <Outlet />
      </main>
      <QuickNav />
    </div>
  )
}

export default Root
