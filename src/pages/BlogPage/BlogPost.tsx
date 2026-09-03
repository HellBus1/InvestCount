import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ComponentType } from 'react'
import Footer from '@/components/Footer/Footer'
import { containerVariants } from '@/constants/animations'
import Icon from '@/components/Icon/Icon'
import { blogPosts, getBlogPost, BlogPostMeta } from '@/data/blogPosts'
import { useSEO } from '@/hooks/useSEO'

const blogModules = import.meta.glob<{ default: ComponentType; meta: BlogPostMeta }>(
  '/src/content/blog/*.mdx',
  { eager: true }
)

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const registryMeta = slug ? getBlogPost(slug) : undefined
  const module = slug ? blogModules[`/src/content/blog/${slug}.mdx`] : undefined
  const Content = module?.default
  const meta = module?.meta || registryMeta

  useSEO({
    title: meta ? `${meta.title} | InvestCount` : 'Artikel Deposito | InvestCount',
    description:
      meta?.description || 'Panduan edukasi seputar simpanan deposito dan perbankan di Indonesia.',
    canonicalUrl: `/blog/${slug}`,
    ogImage: meta?.image || '/assets/web_icon.svg',
    ogType: 'article',
    keywords: meta?.keywords || ['kalkulator deposito', 'bunga deposito'],
    publishedDate: meta?.date,
    schema: meta
      ? {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: meta.title,
          description: meta.description,
          image: meta.image ? `https://investtcount.mattrmost.com${meta.image}` : undefined,
          datePublished: meta.date,
          dateModified: meta.date,
          author: {
            '@type': 'Person',
            name: 'Syubban Fakhriya',
            url: 'https://www.linkedin.com/in/syubban-fakhriya/'
          },
          publisher: {
            '@type': 'Organization',
            name: 'InvestCount',
            logo: {
              '@type': 'ImageObject',
              url: 'https://investtcount.mattrmost.com/assets/web_icon.svg'
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://investtcount.mattrmost.com/blog/${slug}`
          }
        }
      : undefined
  })

  if (!meta || !Content) {
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

          {/* Related Articles Section */}
          <div className='mb-10'>
            <h3 className='text-lg sm:text-xl font-bold font-display text-slate-900 mb-4 flex items-center gap-2'>
              <Icon name='book-open' className='w-5 h-5 text-brand-600' />
              <span>Panduan Deposito Terkait</span>
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              {blogPosts
                .filter((p) => p.slug !== slug)
                .slice(0, 3)
                .map((related) => (
                  <Link
                    key={related.slug}
                    to={`/blog/${related.slug}`}
                    className='p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-card hover:border-brand-300 transition-all flex flex-col justify-between group'
                  >
                    <div>
                      <span className='inline-block px-2 py-0.5 rounded bg-brand-50 text-brand-700 text-[10px] font-semibold mb-2'>
                        {related.category}
                      </span>
                      <h4 className='text-xs sm:text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 mb-1'>
                        {related.title}
                      </h4>
                    </div>
                    <div className='pt-2 mt-2 border-t border-slate-100 flex items-center text-[11px] font-medium text-brand-600 gap-1'>
                      <span>Baca artikel</span>
                      <Icon
                        name='arrow-right'
                        className='w-3 h-3 group-hover:translate-x-0.5 transition-transform'
                      />
                    </div>
                  </Link>
                ))}
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
