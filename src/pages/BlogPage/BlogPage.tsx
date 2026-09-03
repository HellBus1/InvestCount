import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '@/components/Footer/Footer'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon from '@/components/Icon/Icon'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  image?: string
}

const blogPosts: BlogPost[] = [
  {
    slug: 'cara-menghitung-bunga-deposito',
    title: 'Bagaimana Cara Menghitung Bunga Deposito Bersih?',
    description:
      'Panduan praktis menghitung bunga deposito bank setelah dipotong pajak 20% beserta simulasi perhitungan lengkap.',
    date: '2025-11-27',
    readTime: '5 menit',
    category: 'Dasar Deposito',
    image: '/assets/blog/cara-hitung-deposito.jpg'
  },
  {
    slug: 'deposito-vs-tabungan',
    title: 'Deposito vs Tabungan Reguler: Mana yang Lebih Menguntungkan?',
    description:
      'Perbandingan komprehensif antara tabungan biasa dan deposito berjangka untuk alokasi dana darurat atau simpanan jangka menengah.',
    date: '2025-11-27',
    readTime: '6 menit',
    category: 'Dasar Deposito',
    image: '/assets/blog/deposito-vs-tabungan.jpg'
  },
  {
    slug: 'inflasi-dan-deposito',
    title: 'Dampak Inflasi terhadap Nilai Riil Bunga Deposito',
    description:
      'Memahami cara kerja inflasi terhadap daya beli imbal hasil deposito dan strategi mengoptimalkan return investasi Anda.',
    date: '2025-11-27',
    readTime: '7 menit',
    category: 'Strategi Investasi',
    image: '/assets/blog/inflasi-deposito.jpg'
  }
]

const BlogPage = () => {
  return (
    <div className='w-full min-h-screen flex flex-col bg-slate-50'>
      {/* Hero */}
      <motion.section
        className='w-full pt-20 pb-14 bg-gradient-to-b from-white via-brand-50/20 to-slate-50 border-b border-slate-200/80'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        <div className='layout'>
          <div className='max-w-3xl'>
            <motion.div
              className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold mb-4'
              variants={childVariants}
            >
              <Icon name='book-open' className='w-3.5 h-3.5' />
              <span>Edukasi & Wawasan Finansial</span>
            </motion.div>

            <motion.h1
              className='text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight mb-4'
              variants={childVariants}
            >
              Panduan <span className='text-brand-600'>Deposito & Finansial</span> Ringan
            </motion.h1>

            <motion.p
              className='text-base sm:text-lg text-slate-600 leading-relaxed'
              variants={childVariants}
            >
              Artikel terkurasi tanpa jargon rumit untuk membantu Anda membuat keputusan penempatan
              dana terbaik.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Grid */}
      <motion.section
        className='py-16 layout'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.map((post) => (
            <motion.article key={post.slug} variants={childVariants}>
              <Link
                to={`/blog/${post.slug}`}
                className='group block rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-hover hover:border-brand-300 transition-all overflow-hidden h-full flex flex-col'
              >
                {/* Thumbnail */}
                <div className='aspect-video bg-slate-100 overflow-hidden relative'>
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                      loading='lazy'
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : null}
                  <span className='absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold'>
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className='p-6 flex flex-col flex-grow'>
                  <div className='flex items-center gap-2 text-xs text-slate-500 mb-2.5'>
                    <span>
                      {new Date(post.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span>•</span>
                    <span>{post.readTime} baca</span>
                  </div>

                  <h2 className='text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-2'>
                    {post.title}
                  </h2>

                  <p className='text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed flex-grow'>
                    {post.description}
                  </p>

                  <div className='pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-brand-600 group-hover:translate-x-1 transition-transform gap-1'>
                    <span>Baca Selengkapnya</span>
                    <Icon name='arrow-right' className='w-3.5 h-3.5' />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default BlogPage
