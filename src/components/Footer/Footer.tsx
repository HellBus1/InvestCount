import { getImagePath } from '@/services/inputServices'
import { Link } from 'react-router-dom'
import { RouteName } from '@/constants/RouteName'
import Icon from '../Icon/Icon'

const Footer = () => {
  const IC_GITHUB = '/assets/ic-github.svg'
  const IC_LINKEDIN = '/assets/ic-linkedin.svg'

  return (
    <footer className='w-full bg-slate-900 text-slate-300 border-t border-slate-800 py-12 md:py-16'>
      <div className='layout'>
        {/* Main Grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12'>
          {/* Brand Col */}
          <div className='md:col-span-2 space-y-4'>
            <div className='flex items-center gap-2'>
              <div className='w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400 font-bold font-display text-lg'>
                IC
              </div>
              <span className='text-xl font-bold font-display text-white tracking-tight'>
                InvestCount
              </span>
            </div>
            <p className='text-sm text-slate-400 max-w-sm leading-relaxed'>
              Kalkulator bunga deposito bank Indonesia. Hitung bunga bersih setelah pajak 20% secara
              transparan, akurat, dan tanpa biaya.
            </p>
            <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-brand-400 font-medium'>
              <Icon name='shield-check' className='w-3.5 h-3.5' />
              <span>Transparan & Independen</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-sm font-semibold text-white tracking-wider uppercase mb-4'>
              Navigasi
            </h3>
            <ul className='space-y-2.5 text-sm'>
              <li>
                <Link
                  to={RouteName.HOME}
                  className='text-slate-400 hover:text-brand-400 transition-colors'
                >
                  Kalkulator Deposito
                </Link>
              </li>
              <li>
                <Link
                  to={RouteName.BLOG}
                  className='text-slate-400 hover:text-brand-400 transition-colors'
                >
                  Blog & Panduan
                </Link>
              </li>
              <li>
                <Link
                  to={RouteName.ABOUT}
                  className='text-slate-400 hover:text-brand-400 transition-colors'
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to={RouteName.TRANSPARENCY}
                  className='text-slate-400 hover:text-brand-400 transition-colors'
                >
                  Sumber Data & Metode
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Resources */}
          <div>
            <h3 className='text-sm font-semibold text-white tracking-wider uppercase mb-4'>
              Regulator Resmi
            </h3>
            <ul className='space-y-2.5 text-sm'>
              <li>
                <a
                  href='https://www.ojk.go.id'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-slate-400 hover:text-brand-400 transition-colors inline-flex items-center gap-1.5'
                >
                  <span>OJK (Otoritas Jasa Keuangan)</span>
                  <Icon name='external-link' className='w-3 h-3 text-slate-500' />
                </a>
              </li>
              <li>
                <a
                  href='https://www.lps.go.id'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-slate-400 hover:text-brand-400 transition-colors inline-flex items-center gap-1.5'
                >
                  <span>LPS (Penjamin Simpanan)</span>
                  <Icon name='external-link' className='w-3 h-3 text-slate-500' />
                </a>
              </li>
              <li>
                <a
                  href='https://www.bi.go.id'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-slate-400 hover:text-brand-400 transition-colors inline-flex items-center gap-1.5'
                >
                  <span>Bank Indonesia</span>
                  <Icon name='external-link' className='w-3 h-3 text-slate-500' />
                </a>
              </li>
              <li>
                <a
                  href='mailto:mosmatter1@gmail.com?subject=Laporkan Data Tidak Akurat'
                  className='text-slate-400 hover:text-brand-400 transition-colors'
                >
                  Lapor Data Tidak Akurat
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-xs text-slate-500'>
            © {new Date().getFullYear()} InvestCount. Dibuat untuk transparansi finansial
            Indonesia.
          </p>
          <div className='flex items-center space-x-3'>
            <a
              href='https://github.com/HellBus1'
              target='_blank'
              rel='noopener noreferrer'
              className='w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors'
              aria-label='GitHub'
            >
              <img
                src={getImagePath(IC_GITHUB)}
                className='w-5 h-5 invert opacity-80 hover:opacity-100'
                alt='GitHub'
              />
            </a>
            <a
              href='https://www.linkedin.com/in/syubban/'
              target='_blank'
              rel='noopener noreferrer'
              className='w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors'
              aria-label='LinkedIn'
            >
              <img
                src={getImagePath(IC_LINKEDIN)}
                className='w-5 h-5 invert opacity-80 hover:opacity-100'
                alt='LinkedIn'
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
