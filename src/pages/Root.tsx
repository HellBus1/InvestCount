import MetaTagController from '@/components/MetaTagController/MetaTagController'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center relative'>
      <MetaTagController />
      <Outlet />
    </div>
  )
}

export default Root
