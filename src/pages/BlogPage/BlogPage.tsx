import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '@/components/Footer/Footer'
import { containerVariants, childVariants } from '@/constants/animations'
import Icon from '@/components/Icon/Icon'
import { blogPosts } from '@/data/blogPosts'
import { useSEO } from '@/hooks/useSEO'
import { getImagePath } from '@/services/inputServices'

const BlogPage = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({})

  useSEO({
    title: 'Blog & Panduan Finansial Deposito Indonesia | InvestCount',
    description:
      'Kumpulan panduan praktis menghitung bunga deposito bank, perbandingan suku bunga, regulasi pajak PPh 20%, dan batas penjaminan LPS.',
    canonicalUrl: '/blog',
    keywords: [
      'blog deposito',
      'panduan deposito',
      'edukasi perbankan',
      'simulasi deposito',
      'bunga deposito 2026'
    ],
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Blog Edukasi & Panduan Deposito InvestCount',
      url: 'https://investtcount.mattrmost.com/blog',
      description: 'Kumpulan artikel edukatif seputar deposito dan keuangan perbankan di Indonesia.'
    }
  })

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
            <motion.h1
              className='text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-slate-900 tracking-tight mb-4'
              variants={childVariants}
            >
              Panduan <span className='text-brand-600'>Deposito &amp; Finansial</span>
            </motion.h1>

            <motion.p
              className='text-base sm:text-lg text-slate-600 leading-relaxed'
              variants={childVariants}
            >
              Artikel singkat dan langsung ke praktik seputar rumus bunga deposito, pajak PPh 20%,
              penjaminan LPS, dan strategi penempatan dana.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Grid */}
      <motion.section
        className='py-16 layout'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {blogPosts.map((post) => {
            const hasImage = Boolean(post.image) && !failedImages[post.slug]
            return (
              <motion.article key={post.slug} variants={childVariants}>
                <Link
                  to={`/blog/${post.slug}/`}
                  className='group block rounded-2xl bg-white border border-slate-200 shadow-card hover:shadow-hover hover:border-brand-300 transition-all overflow-hidden h-full flex flex-col'
                >
                  {/* Thumbnail */}
                  <div className='aspect-video bg-slate-100 overflow-hidden relative'>
                    {hasImage && post.image ? (
                      <img
                        src={getImagePath(post.image)}
                        alt={post.title}
                        width={1200}
                        height={675}
                        loading='lazy'
                        decoding='async'
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                        onError={() => setFailedImages((prev) => ({ ...prev, [post.slug]: true }))}
                      />
                    ) : (
                      <div className='w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-brand-900 flex flex-col items-center justify-center p-6 text-center'>
                        <Icon name='book-open' className='w-8 h-8 text-brand-400 mb-2' />
                        <span className='text-xs font-semibold text-slate-200'>
                          {post.category}
                        </span>
                      </div>
                    )}
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
            )
          })}
        </div>
      </motion.section>

      <Footer />
    </div>
  )
}

export default BlogPage
