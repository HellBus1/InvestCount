import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RouteName } from '@/constants/RouteName'
import Icon, { IconName } from '../Icon/Icon'

interface QuickLinkItem {
  to: string
  icon: IconName
  label: string
}

const QuickNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const quickLinks: QuickLinkItem[] = [
    { to: RouteName.HOME, icon: 'home', label: 'Beranda' },
    { to: RouteName.BLOG, icon: 'book-open', label: 'Blog & Edukasi' },
    { to: RouteName.ABOUT, icon: 'info', label: 'Tentang Kami' },
    { to: RouteName.TRANSPARENCY, icon: 'chart-bar', label: 'Sumber Data' }
  ]

  return (
    <nav
      aria-label='Navigasi Cepat'
      className='fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3'
    >
      {/* Expanded Menu */}
      {isOpen && (
        <div className='flex flex-col-reverse items-end gap-2 mb-1'>
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className='tooltip tooltip-left animate-in fade-in slide-in-from-bottom-2 duration-200'
              data-tip={link.label}
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <Link
                to={link.to}
                className='flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white text-slate-700 hover:text-brand-600 hover:bg-brand-50 border border-slate-200 shadow-hover transition-all text-sm font-medium'
                onClick={() => setIsOpen(false)}
              >
                <Icon name={link.icon} className='w-4 h-4 text-brand-600' />
                <span>{link.label}</span>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`btn btn-circle w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white border-0 shadow-elevated transition-transform duration-200 flex items-center justify-center ${
          isOpen ? 'rotate-90 bg-slate-800' : ''
        }`}
        aria-label={isOpen ? 'Tutup Menu' : 'Buka Menu Cepat'}
        aria-expanded={isOpen}
      >
        <Icon name={isOpen ? 'close' : 'menu'} className='w-6 h-6 text-white' />
      </button>
    </nav>
  )
}

export default QuickNav
