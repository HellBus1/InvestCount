import { Link } from 'react-router-dom'
import Footer from '@/components/Footer/Footer'
import Icon from '@/components/Icon/Icon'

const NotFoundPage = () => {
  return (
    <div className='w-full min-h-screen flex flex-col bg-slate-50'>
      <div className='flex-grow flex items-center justify-center p-6 my-16'>
        <div className='text-center max-w-lg bg-white p-8 sm:p-12 rounded-2xl shadow-card border border-slate-200'>
          <div className='w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-100'>
            <Icon name='info' className='w-8 h-8' />
          </div>
          <span className='text-xs font-bold uppercase tracking-wider text-brand-600 mb-2 block'>
            Error 404
          </span>
          <h1 className='text-2xl sm:text-3xl font-bold font-display text-slate-900 mb-3'>
            Halaman Tidak Ditemukan
          </h1>
          <p className='text-slate-600 text-sm mb-8 leading-relaxed'>
            Maaf, alamat halaman yang Anda tuju tidak tersedia atau telah dipindahkan. Silakan
            gunakan kalkulator deposito kami atau baca panduan finansial terbaru.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
            <Link
              to='/'
              className='btn bg-brand-600 hover:bg-brand-700 text-white border-0 rounded-xl px-6 w-full sm:w-auto font-semibold text-sm'
            >
              Ke Kalkulator Deposito
            </Link>
            <Link
              to='/blog'
              className='btn bg-slate-100 hover:bg-slate-200 text-slate-800 border-0 rounded-xl px-6 w-full sm:w-auto font-semibold text-sm'
            >
              Lihat Panduan Blog
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NotFoundPage
