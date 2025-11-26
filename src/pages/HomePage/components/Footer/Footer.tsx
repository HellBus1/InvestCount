import { getImagePath } from '@/services/inputServices'
import { Link } from 'react-router-dom'
import { RouteName } from '@/constants/RouteName'

const Footer = () => {
  const IC_GITHUB = '/assets/ic-github.svg'
  const IC_LINKEDIN = '/assets/ic-linkedin.svg'

  return (
    <footer className='bg-base-200 text-charter-blue pt-10 pb-6'>
      <div className='max-w-7xl mx-auto px-10'>
        {/* Trust Badges */}
        <div className='flex flex-wrap justify-center gap-4 mb-10 pb-8 border-b border-charter-blue-200'>
          {[
            { icon: '🆓', text: 'Gratis Selamanya' },
            { icon: '🚫', text: 'Tanpa Iklan' },
            { icon: '🔒', text: 'Tidak Menyimpan Data' },
            { icon: '🤝', text: 'Independen' }
          ].map((badge, index) => (
            <div
              key={index}
              className='flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-charter-blue'
            >
              <span className='text-2xl'>{badge.icon}</span>
              <span className='text-charter-blue font-medium text-sm'>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
          {/* About Section */}
          <div>
            <h3 className='text-charter-blue-600 font-bold text-lg mb-4'>InvestCount</h3>
            <p className='text-charter-blue text-sm mb-4'>
              Kalkulator deposito gratis yang membantu Anda memahami bunga deposito bersih dengan
              transparan.
            </p>
            <p className='text-charter-blue text-xs italic'>"Transparan, bukan clickbait"</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-charter-blue-600 font-bold text-lg mb-4'>Tautan Cepat</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  to={RouteName.HOME}
                  className='text-charter-blue hover:text-jess text-sm transition-colors'
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to={RouteName.BLOG}
                  className='text-charter-blue hover:text-jess text-sm transition-colors'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to={RouteName.ABOUT}
                  className='text-charter-blue hover:text-jess text-sm transition-colors'
                >
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link
                  to={RouteName.TRANSPARENCY}
                  className='text-charter-blue hover:text-jess text-sm transition-colors'
                >
                  Sumber Data & Metodologi
                </Link>
              </li>
              <li>
                <a
                  href='mailto:feedback@investcount.com?subject=Laporkan Data Tidak Akurat'
                  className='text-charter-blue hover:text-jess text-sm transition-colors'
                >
                  Laporkan Data Tidak Akurat
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-charter-blue-600 font-bold text-lg mb-4'>Sumber Resmi</h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='https://www.ojk.go.id'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-charter-blue hover:text-jess text-sm transition-colors'
                >
                  OJK (Otoritas Jasa Keuangan) →
                </a>
              </li>
              <li>
                <a
                  href='https://www.lps.go.id'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-charter-blue hover:text-jess text-sm transition-colors'
                >
                  LPS (Lembaga Penjamin Simpanan) →
                </a>
              </li>
              <li>
                <a
                  href='https://www.bi.go.id'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-charter-blue hover:text-jess text-sm transition-colors'
                >
                  Bank Indonesia →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className='flex flex-col md:flex-row justify-between items-center pt-6 border-t border-charter-blue-200'>
          <p className='text-charter-blue font-medium text-sm mb-4 md:mb-0'>
            Copyright © {new Date().getFullYear()} InvestCount - All rights reserved
          </p>
          <nav className='flex space-x-4'>
            <a href='https://github.com/HellBus1' target='_blank' rel='noopener noreferrer'>
              <img src={getImagePath(IC_GITHUB)} className='w-8 md:w-10 p-1' alt='GitHub' />
            </a>
            <a
              href='https://www.linkedin.com/in/syubban/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={getImagePath(IC_LINKEDIN)} className='w-8 md:w-10' alt='LinkedIn' />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
