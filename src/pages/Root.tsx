import MetaTagController from '@/components/MetaTagController/MetaTagController'
import QuickNav from '@/components/QuickNav/QuickNav'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center relative'>
      <MetaTagController />
      <Outlet />
      <QuickNav />
    </div>
  )
}

export default Root
