import IcGithub from '@/assets/ic-github.svg'
import IcLinkedin from '@/assets/ic-linkedin.svg'
import IcTwitter from '@/assets/ic-twitter.svg'

const Footer = () => {
  return (
    <footer className='footer bg-base-300 text-neutral-content items-center p-4'>
      <aside>
        <p className='text-neutral font-medium'>
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </aside>
      <nav className='grid-flow-col gap-4 md:place-self-center md:justify-self-end'>
        <a>
          <img src={IcGithub} className='w-10 p-1' />
        </a>
        <a>
          <img src={IcLinkedin} className='w-10' />
        </a>
        <a>
          <img src={IcTwitter} className='w-10' />
        </a>
      </nav>
    </footer>
  )
}

export default Footer
