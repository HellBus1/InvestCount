import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RouteName } from '@/constants/RouteName'
import { getImagePath } from '@/services/inputServices'
import Icon from '../Icon/Icon'

const Navbar = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const WEB_ICON = '/assets/web_icon.svg'

  const navItems = [
    { to: RouteName.HOME, label: 'Kalkulator' },
    { to: RouteName.BLOG, label: 'Blog & Edukasi' },
    { to: RouteName.ABOUT, label: 'Tentang Kami' },
    { to: RouteName.TRANSPARENCY, label: 'Sumber Data' }
  ]

  const isActive = (path: string) => {
    if (path === RouteName.HOME) {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <header className='sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all'>
      <div className='layout'>
        <div className='flex items-center justify-between h-16 sm:h-18'>
          {/* Brand Logo - Click to go back to Dashboard / Home */}
          <Link
            to={RouteName.HOME}
            className='flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-lg py-1'
            aria-label='InvestCount Beranda'
          >
            <img
              src={getImagePath(WEB_ICON)}
              alt='InvestCount Logo'
              className='w-8 h-8 rounded-lg object-contain group-hover:scale-105 transition-transform'
            />
            <div className='flex flex-col'>
              <span className='text-lg font-bold font-display text-slate-900 tracking-tight leading-none group-hover:text-brand-600 transition-colors'>
                InvestCount
              </span>
              <span className='text-[10px] text-slate-400 font-medium leading-tight hidden sm:block'>
                Kalkulator Deposito
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className='hidden md:flex items-center gap-1.5' aria-label='Navigasi Utama'>
            {navItems.map((item) => {
              const active = isActive(item.to)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-brand-50 text-brand-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile Right Controls: Home Button + Hamburger */}
          <div className='flex items-center gap-2 md:hidden'>
            {/* Quick Back to Home Pill Button (shown when not on home) */}
            {location.pathname !== '/' && (
              <Link
                to={RouteName.HOME}
                className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 text-brand-700 border border-brand-200 text-xs font-semibold'
              >
                <Icon name='calculator' className='w-3.5 h-3.5 text-brand-600' />
                <span>Kalkulator</span>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200'
              aria-label={mobileMenuOpen ? 'Tutup Navigasi' : 'Buka Navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className='md:hidden py-3 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200'>
            <div className='flex flex-col gap-1'>
              {navItems.map((item) => {
                const active = isActive(item.to)
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? 'bg-brand-50 text-brand-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && <Icon name='check' className='w-4 h-4 text-brand-600' />}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
