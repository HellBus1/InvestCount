import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import Footer from '@/pages/HomePage/components/Footer/Footer'

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
    <div className='w-full min-h-screen flex flex-col'>
      <motion.div
        className='flex-grow w-full py-16 px-6 md:px-12 lg:px-24'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className='max-w-6xl mx-auto mb-12' variants={childVariants}>
          <h1 className='text-4xl md:text-5xl font-bold text-charter-blue-600 mb-4'>
            Belajar Finansial Ringan
          </h1>
          <div className='h-1 w-24 bg-gradient-to-r from-charter-blue-600 to-green-500 rounded-full mb-4'></div>
          <p className='text-gray-600 text-lg'>
            Artikel edukasi tentang deposito, investasi, dan keuangan pribadi yang mudah dipahami.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div className='max-w-6xl mx-auto' variants={childVariants}>
          {blogPosts.length === 0 ? (
            <div className='bg-gradient-to-br from-charter-blue-50 to-green-50 p-12 rounded-2xl border border-charter-blue-100 text-center'>
              <p className='text-charter-blue-600 text-lg mb-4'>
                Artikel sedang dalam proses penulisan. Segera hadir!
              </p>
              <Link
                to='/'
                className='inline-block bg-charter-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-charter-blue-700 transition-colors'
              >
                Kembali ke Kalkulator
              </Link>
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className='group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300'
                >
                  {/* Image */}
                  {post.image && (
                    <div className='h-48 bg-gradient-to-br from-charter-blue-100 to-green-100 overflow-hidden'>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className='p-6'>
                    {/* Category & Read Time */}
                    <div className='flex items-center gap-3 mb-3'>
                      <span className='text-xs font-medium text-charter-blue-600 bg-charter-blue-50 px-3 py-1 rounded-full'>
                        {post.category}
                      </span>
                      <span className='text-xs text-gray-500'>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className='text-xl font-bold text-charter-blue-600 mb-3 group-hover:text-charter-blue-700 transition-colors'>
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{post.description}</p>

                    {/* Date */}
                    <p className='text-xs text-gray-400'>
                      {new Date(post.date).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div className='max-w-6xl mx-auto mt-16' variants={childVariants}>
          <div className='bg-gradient-to-br from-charter-blue-600 to-green-600 p-8 md:p-12 rounded-2xl text-white text-center'>
            <h2 className='text-2xl md:text-3xl font-bold mb-4'>Siap Menghitung Deposito Anda?</h2>
            <p className='text-lg mb-6 opacity-90'>
              Gunakan kalkulator deposito gratis kami untuk mengetahui bunga bersih yang Anda
              terima.
            </p>
            <Link
              to='/'
              className='inline-block bg-white text-charter-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors'
            >
              Coba Kalkulator Gratis
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  )
}

export default BlogPage
