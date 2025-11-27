import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Footer from '@/components/Footer/Footer'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  image?: string
}

// Blog posts data - will be populated as we write articles
const blogPosts: BlogPost[] = [
  {
    slug: 'cara-menghitung-bunga-deposito',
    title: 'Bagaimana Cara Menghitung Bunga Deposito?',
    description:
      'Panduan lengkap menghitung bunga deposito dengan contoh praktis dan formula yang mudah dipahami.',
    date: '2025-11-27',
    readTime: '5 menit',
    category: 'Dasar Deposito',
    image: '/assets/blog/cara-hitung-deposito.jpg'
  }
]

const BlogPage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
  }

  return (
    <>
      {/* Hero Section */}
      <motion.div
        className='w-full bg-base-200 pt-20 pb-10'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        <div className='max-w-7xl mx-auto px-10'>
          <motion.h1
            className='text-4xl md:text-6xl font-semibold text-charter-blue-800 mb-4'
            variants={childVariants}
          >
            Belajar <span className='text-jess'>Finansial Ringan</span>
          </motion.h1>
          <motion.p
            className='text-base md:text-lg font-medium text-charter-blue mt-4 max-w-2xl'
            variants={childVariants}
          >
            Artikel edukasi tentang deposito, investasi, dan keuangan pribadi yang mudah dipahami.
            Tanpa jargon rumit, langsung ke intinya.
          </motion.p>
        </div>
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        className='w-full bg-white pt-10 pb-20'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className='max-w-7xl mx-auto px-10'>
          {blogPosts.length === 0 ? (
            <div className='bg-base-200 p-12 rounded-2xl border border-charter-blue text-center'>
              <p className='text-charter-blue-600 text-lg mb-4'>
                Artikel sedang dalam proses penulisan. Segera hadir!
              </p>
              <Link to='/' className='btn btn-primary text-white'>
                Kembali ke Kalkulator
              </Link>
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className='group bg-white rounded-2xl shadow-sm border border-charter-blue overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col h-full'
                >
                  {/* Image Placeholder if no image */}
                  <div className='h-48 bg-base-200 flex items-center justify-center overflow-hidden relative'>
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <span className='text-4xl'>📚</span>
                    )}
                    <div className='absolute top-4 left-4'>
                      <span className='badge badge-primary text-white font-medium'>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-6 flex flex-col flex-grow'>
                    <div className='flex items-center gap-2 text-xs text-charter-blue-400 mb-3'>
                      <span>
                        {new Date(post.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                      <span>•</span>
                      <span>{post.readTime} baca</span>
                    </div>

                    <h2 className='text-xl font-bold text-charter-blue-600 mb-3 group-hover:text-jess transition-colors line-clamp-2'>
                      {post.title}
                    </h2>

                    <p className='text-charter-blue text-sm mb-4 line-clamp-3 flex-grow'>
                      {post.description}
                    </p>

                    <div className='mt-auto pt-4 border-t border-gray-100 flex items-center text-jess font-medium text-sm group-hover:translate-x-1 transition-transform'>
                      Baca Selengkapnya →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <motion.div className='mt-20' variants={childVariants}>
            <div className='bg-charter-blue-800 p-8 md:p-12 rounded-2xl text-white text-center relative overflow-hidden'>
              {/* Decorative circle */}
              <div className='absolute -top-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full'></div>
              <div className='absolute -bottom-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full'></div>

              <div className='relative z-10'>
                <h2 className='text-2xl md:text-3xl font-bold mb-4'>
                  Siap Menghitung Deposito Anda?
                </h2>
                <p className='text-lg mb-8 opacity-90 max-w-2xl mx-auto'>
                  Gunakan kalkulator deposito gratis kami untuk mengetahui bunga bersih yang Anda
                  terima. Akurat, cepat, dan mudah.
                </p>
                <Link
                  to='/'
                  className='btn btn-primary bg-white text-charter-blue-800 hover:bg-gray-100 border-none'
                >
                  Coba Kalkulator Gratis
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </>
  )
}

export default BlogPage
