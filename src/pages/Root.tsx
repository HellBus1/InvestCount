import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center relative'>
      <Outlet />
    </div>
  )
}

export default Root
