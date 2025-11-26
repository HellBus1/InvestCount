import { motion } from 'motion/react'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, ComponentType } from 'react'
import Footer from '@/pages/HomePage/components/Footer/Footer'

interface BlogPostMeta {
  title: string
  description: string
  date: string
  readTime: string
  category: string
  image?: string
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [Content, setContent] = useState<ComponentType | null>(null)
  const [meta, setMeta] = useState<BlogPostMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return

      try {
        setLoading(true)
        setError(false)

        // Dynamic import for MDX files
        // Note: In Vite, we need to use glob import or explicit paths
        // For dynamic slugs, glob is safer
        const modules = import.meta.glob('/src/content/blog/*.mdx')
        const path = `/src/content/blog/${slug}.mdx`

        if (!modules[path]) {
          throw new Error('Post not found')
        }

        const module = (await modules[path]()) as { default: ComponentType; meta: BlogPostMeta }

        setContent(() => module.default)
        setMeta(module.meta)
      } catch (err) {
        console.error('Failed to load blog post:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  if (loading) {
    return (
      <div className='w-full min-h-screen flex flex-col bg-base-200'>
        <div className='flex-grow flex items-center justify-center'>
          <span className='loading loading-spinner loading-lg text-primary'></span>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !meta || !Content) {
    return (
      <div className='w-full min-h-screen flex flex-col bg-base-200'>
        <div className='flex-grow flex items-center justify-center p-6'>
          <div className='text-center max-w-md bg-white p-8 rounded-2xl shadow-sm border border-charter-blue'>
            <h1 className='text-4xl font-bold text-charter-blue-600 mb-4'>
              Artikel Tidak Ditemukan
            </h1>
            <p className='text-charter-blue mb-6'>Maaf, artikel yang Anda cari tidak tersedia.</p>
            <Link to='/blog' className='btn btn-primary text-white'>
              Kembali ke Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen flex flex-col bg-base-200'>
      <motion.article
        className='flex-grow w-full py-10 md:py-16'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        <div className='max-w-4xl mx-auto px-6 md:px-10'>
          {/* Breadcrumb */}
          <div className='flex items-center gap-2 text-sm text-charter-blue-400 mb-8 overflow-x-auto whitespace-nowrap pb-2'>
            <Link to='/' className='hover:text-jess transition-colors'>
              Beranda
            </Link>
            <span>/</span>
            <Link to='/blog' className='hover:text-jess transition-colors'>
              Blog
            </Link>
            <span>/</span>
            <span className='text-charter-blue-600 font-medium'>{meta.category}</span>
          </div>

          {/* Article Header */}
          <div className='bg-white rounded-t-2xl p-8 md:p-12 border-b border-gray-100'>
            <div className='flex items-center gap-3 mb-6'>
              <span className='badge badge-primary text-white font-medium py-3'>
                {meta.category}
              </span>
              <span className='text-sm text-charter-blue-400'>{meta.readTime} baca</span>
            </div>

            <h1 className='text-3xl md:text-5xl font-bold text-charter-blue-800 mb-6 leading-tight'>
              {meta.title}
            </h1>

            <div className='flex items-center gap-4 text-charter-blue-400 text-sm'>
              <span>
                {new Date(meta.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className='bg-white rounded-b-2xl p-8 md:p-12 shadow-sm mb-12'>
            <div className='prose prose-lg max-w-none prose-headings:text-charter-blue-800 prose-headings:font-bold prose-p:text-charter-blue prose-a:text-jess prose-a:no-underline hover:prose-a:underline prose-strong:text-charter-blue-800 prose-code:text-charter-blue-600 prose-code:bg-base-200 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-charter-blue-900 prose-pre:text-gray-100 prose-li:text-charter-blue'>
              <Content />
            </div>
          </div>

          {/* CTA */}
          <div className='bg-charter-blue-800 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden mb-12'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16'></div>
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -ml-16 -mb-16'></div>

            <div className='relative z-10'>
              <h3 className='text-2xl md:text-3xl font-bold mb-4'>
                Coba Kalkulator Deposito Gratis
              </h3>
              <p className='text-lg opacity-90 mb-8 max-w-2xl mx-auto'>
                Hitung bunga deposito Anda dengan mudah menggunakan kalkulator kami. Gratis, tanpa
                iklan, dan transparan.
              </p>
              <Link
                to='/'
                className='btn btn-primary bg-white text-charter-blue-800 hover:bg-gray-100 border-none'
              >
                Mulai Hitung Sekarang
              </Link>
            </div>
          </div>

          {/* Share Buttons */}
          <div className='flex items-center justify-center gap-4'>
            <span className='text-charter-blue font-medium'>Bagikan artikel ini:</span>
            <div className='flex gap-2'>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(meta.title)}&url=${encodeURIComponent(window.location.href)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-circle btn-sm btn-ghost text-charter-blue hover:text-jess'
              >
                <svg
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='w-5 h-5'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                </svg>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-circle btn-sm btn-ghost text-charter-blue hover:text-jess'
              >
                <svg
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='w-5 h-5'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                </svg>
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(meta.title + ' ' + window.location.href)}`}
                target='_blank'
                rel='noopener noreferrer'
                className='btn btn-circle btn-sm btn-ghost text-charter-blue hover:text-jess'
              >
                <svg
                  fill='currentColor'
                  viewBox='0 0 24 24'
                  className='w-5 h-5'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.article>

      <Footer />
    </div>
  )
}

export default BlogPost
