import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RouteName } from '@/constants/RouteName'

const QuickNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const quickLinks = [
    { to: RouteName.HOME, icon: '🏠', label: 'Beranda' },
    { to: RouteName.BLOG, icon: '📝', label: 'Blog' },
    { to: RouteName.ABOUT, icon: 'ℹ️', label: 'Tentang Kami' },
    { to: RouteName.TRANSPARENCY, icon: '📊', label: 'Sumber Data' }
  ]

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3'>
      {/* Quick Links that appear when FAB is open */}
      {isOpen && (
        <>
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className='tooltip tooltip-left animate-fade-in'
              data-tip={link.label}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <Link
                to={link.to}
                className='btn btn-lg btn-circle bg-white hover:bg-jess-100 border-2 border-charter-blue-200 hover:border-jess text-2xl shadow-md'
                onClick={() => setIsOpen(false)}
              >
                {link.icon}
              </Link>
            </div>
          ))}
        </>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='btn btn-lg btn-circle bg-jess hover:bg-jess-600 border-none text-white shadow-lg hover:shadow-xl'
        aria-label='Quick Navigation Menu'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          {isOpen ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16M4 18h16'
            />
          )}
        </svg>
      </button>
    </div>
  )
}

export default QuickNav
