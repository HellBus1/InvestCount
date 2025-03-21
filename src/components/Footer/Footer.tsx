import IcGithub from '@/assets/ic-github.svg'
import IcLinkedin from '@/assets/ic-linkedin.svg'
import IcTwitter from '@/assets/ic-twitter.svg'

const Footer = () => {
  return (
    <footer className='footer bg-base-200 text-neutral-content items-center p-4 flex flex-col md:flex-row justify-between'>
      <aside className='md:mb-0'>
        <p className='text-charter-blue font-medium'>
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
      </aside>
      <nav className='flex space-x-4'>
        <a href='https://github.com/HellBus1' target='_blank' rel='noopener noreferrer'>
          <img src={IcGithub} className='w-8 md:w-10 p-1' alt='GitHub' />
        </a>
        <a href='https://www.linkedin.com/in/syubban/' target='_blank' rel='noopener noreferrer'>
          <img src={IcLinkedin} className='w-8 md:w-10' alt='LinkedIn' />
        </a>
        <a href='https://x.com/Syubbs5' target='_blank' rel='noopener noreferrer'>
          <img src={IcTwitter} className='w-8 md:w-10' alt='Twitter' />
        </a>
      </nav>
    </footer>
  )
}

export default Footer
