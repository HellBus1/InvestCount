import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, ComponentType } from 'react'
import Footer from '@/components/Footer/Footer'
import { containerVariants } from '@/constants/animations'

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

  if (loading) {
    return (
      <div className='w-full min-h-screen flex flex-col bg-slate-50'>
        <div className='flex-grow flex items-center justify-center'>
          <span className='loading loading-spinner loading-lg text-brand-600'></span>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !meta || !Content) {
    return (
      <div className='w-full min-h-screen flex flex-col bg-slate-50'>
        <div className='flex-grow flex items-center justify-center p-6'>
          <div className='text-center max-w-md bg-white p-8 rounded-2xl shadow-card border border-slate-200'>
            <h1 className='text-2xl font-bold text-slate-900 mb-2'>Artikel Tidak Ditemukan</h1>
            <p className='text-slate-600 text-sm mb-6'>
              Maaf, tautan artikel yang Anda cari tidak tersedia.
            </p>
            <Link
              to='/blog'
              className='btn bg-brand-600 hover:bg-brand-700 text-white border-0 rounded-xl px-6'
            >
              Kembali ke Blog
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen flex flex-col bg-slate-50'>
      <motion.article
        className='flex-grow w-full py-12 md:py-16'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        <div className='max-w-3xl mx-auto px-4 sm:px-6'>
          {/* Breadcrumb */}
          <nav
            aria-label='Breadcrumb'
            className='flex items-center gap-2 text-xs text-slate-500 mb-6'
          >
            <Link to='/' className='hover:text-brand-600 transition-colors'>
              Beranda
            </Link>
            <span>/</span>
            <Link to='/blog' className='hover:text-brand-600 transition-colors'>
              Blog
            </Link>
            <span>/</span>
            <span className='text-slate-800 font-semibold truncate'>{meta.category}</span>
          </nav>

          {/* Article Header */}
          <div className='bg-white rounded-t-2xl p-6 sm:p-10 border border-slate-200 border-b-0 shadow-card'>
            <div className='flex items-center gap-2.5 mb-4'>
              <span className='px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold'>
                {meta.category}
              </span>
              <span className='text-xs text-slate-500'>{meta.readTime} baca</span>
            </div>

            <h1 className='text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-slate-900 leading-tight mb-4'>
              {meta.title}
            </h1>

            <div className='text-xs text-slate-500 font-medium'>
              Diterbitkan pada{' '}
              {new Date(meta.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Article Content Body */}
          <div className='bg-white rounded-b-2xl p-6 sm:p-10 border border-slate-200 border-t-0 shadow-card mb-10'>
            <div className='prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-pre:bg-slate-900 prose-pre:rounded-xl'>
              <Content />
            </div>
          </div>

          {/* Calculator CTA Card */}
          <div className='rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white text-center shadow-card relative overflow-hidden'>
            <div className='relative z-10 max-w-lg mx-auto'>
              <h2 className='text-xl sm:text-2xl font-bold font-display mb-2'>
                Hitung Bunga Deposito Anda Sekarang
              </h2>
              <p className='text-sm text-slate-300 mb-6'>
                Kalkulator gratis, akurat setelah pajak 20%, dan bandingkan suku bunga dari berbagai
                bank terkemuka.
              </p>
              <Link
                to='/'
                className='btn bg-brand-500 hover:bg-brand-600 text-white border-0 rounded-xl px-7 font-semibold'
              >
                Coba Kalkulator Gratis
              </Link>
            </div>
          </div>
        </div>
      </motion.article>

      <Footer />
    </div>
  )
}

export default BlogPost
