const Footer = () => {
  const IC_GITHUB = '/assets/ic-github.svg'
  const IC_LINKEDIN = '/assets/ic-linkedin.svg'

  const getImagePath = (basePath: string) => {
    return `${window.location.origin}${basePath}`
  }

  return (
    <footer className='footer bg-base-300 text-neutral-content items-center p-4 flex flex-col md:flex-row justify-between'>
      <aside className='md:mb-0'>
        <p className='text-charter-blue font-medium'>
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
      </aside>
      <nav className='flex space-x-4'>
        <a href='https://github.com/HellBus1' target='_blank' rel='noopener noreferrer'>
          <img src={getImagePath(IC_GITHUB)} className='w-8 md:w-10 p-1' alt='GitHub' />
        </a>
        <a href='https://www.linkedin.com/in/syubban/' target='_blank' rel='noopener noreferrer'>
          <img src={getImagePath(IC_LINKEDIN)} className='w-8 md:w-10' alt='LinkedIn' />
        </a>
      </nav>
    </footer>
  )
}

export default Footer
