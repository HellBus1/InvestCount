import { motion } from 'motion/react'
import { useParams, Link } from 'react-router-dom'
import Footer from '@/pages/HomePage/components/Footer/Footer'

interface BlogPostData {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  category: string
  content: string
}

// This will be replaced with actual MDX content loading
const blogPostsData: Record<string, BlogPostData> = {
  'cara-menghitung-bunga-deposito': {
    slug: 'cara-menghitung-bunga-deposito',
    title: 'Bagaimana Cara Menghitung Bunga Deposito?',
    description:
      'Panduan lengkap menghitung bunga deposito dengan contoh praktis dan formula yang mudah dipahami.',
    date: '2025-11-27',
    readTime: '5 menit',
    category: 'Dasar Deposito',
    content: `
# Bagaimana Cara Menghitung Bunga Deposito?

Deposito adalah salah satu instrumen investasi yang paling aman dan populer di Indonesia. Namun, banyak orang yang tidak tahu cara menghitung bunga deposito dengan benar, terutama setelah dipotong pajak.

## Formula Dasar Bunga Deposito

Formula dasar untuk menghitung bunga deposito adalah:

\`\`\`
Bunga Kotor = (Pokok × Suku Bunga × Tenor) / 12
\`\`\`

Dimana:
- **Pokok**: Jumlah uang yang Anda depositokan
- **Suku Bunga**: Persentase bunga per tahun (dalam desimal)
- **Tenor**: Jangka waktu deposito dalam bulan

## Contoh Perhitungan Step-by-Step

Mari kita hitung dengan contoh nyata:

**Data:**
- Pokok: Rp 10.000.000
- Suku Bunga: 5% per tahun
- Tenor: 12 bulan

**Langkah 1: Hitung Bunga Kotor**
\`\`\`
Bunga Kotor = (10.000.000 × 0.05 × 12) / 12
Bunga Kotor = Rp 500.000
\`\`\`

**Langkah 2: Hitung Pajak (20%)**
\`\`\`
Pajak = Bunga Kotor × 20%
Pajak = 500.000 × 0.20
Pajak = Rp 100.000
\`\`\`

**Langkah 3: Hitung Bunga Bersih**
\`\`\`
Bunga Bersih = Bunga Kotor - Pajak
Bunga Bersih = 500.000 - 100.000
Bunga Bersih = Rp 400.000
\`\`\`

## Pajak Deposito 20%

Penting untuk diingat bahwa bunga deposito di Indonesia dikenakan pajak sebesar **20%** sesuai dengan ketentuan pemerintah. Pajak ini dipotong langsung oleh bank sebelum bunga dikreditkan ke rekening Anda.

## ARO vs Non-ARO

### Non-ARO (Tanpa Perpanjangan Otomatis)
Pada deposito Non-ARO, bunga bersih akan dikreditkan ke rekening Anda pada akhir tenor, dan deposito tidak diperpanjang otomatis.

### ARO (Automatic Roll Over)
Pada deposito ARO, bunga bersih ditambahkan ke pokok pada akhir tenor, dan deposito diperpanjang otomatis dengan pokok yang baru. Ini menciptakan efek compounding.

## Gunakan Kalkulator Kami

Menghitung manual bisa merepotkan. Gunakan [Kalkulator Deposito InvestCount](/) untuk menghitung bunga deposito Anda secara otomatis dengan berbagai skenario (Non-ARO, ARO, ARO+).

## Kesimpulan

Memahami cara menghitung bunga deposito sangat penting agar Anda tahu persis berapa return yang akan Anda terima. Jangan lupa untuk selalu memperhitungkan pajak 20% dalam perhitungan Anda!

---

**Artikel terkait:**
- [Apakah Deposito Bank Digital Dijamin LPS?](#)
- [ARO vs Non-ARO: Mana yang Lebih Menguntungkan?](#)
    `
  }
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? blogPostsData[slug] : null

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  if (!post) {
    return (
      <div className='w-full min-h-screen flex flex-col'>
        <div className='flex-grow flex items-center justify-center p-6'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-charter-blue-600 mb-4'>
              Artikel Tidak Ditemukan
            </h1>
            <p className='text-gray-600 mb-6'>Maaf, artikel yang Anda cari tidak tersedia.</p>
            <Link
              to='/blog'
              className='inline-block bg-charter-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-charter-blue-700 transition-colors'
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
    <div className='w-full min-h-screen flex flex-col'>
      <motion.article
        className='flex-grow w-full py-16 px-6 md:px-12'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        {/* Header */}
        <div className='max-w-3xl mx-auto mb-12'>
          {/* Breadcrumb */}
          <div className='flex items-center gap-2 text-sm text-gray-500 mb-6'>
            <Link to='/' className='hover:text-charter-blue-600'>
              Beranda
            </Link>
            <span>/</span>
            <Link to='/blog' className='hover:text-charter-blue-600'>
              Blog
            </Link>
            <span>/</span>
            <span className='text-charter-blue-600'>{post.category}</span>
          </div>

          {/* Category & Read Time */}
          <div className='flex items-center gap-3 mb-4'>
            <span className='text-sm font-medium text-charter-blue-600 bg-charter-blue-50 px-4 py-1 rounded-full'>
              {post.category}
            </span>
            <span className='text-sm text-gray-500'>{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className='text-4xl md:text-5xl font-bold text-charter-blue-600 mb-4'>
            {post.title}
          </h1>

          {/* Meta */}
          <div className='flex items-center gap-4 text-gray-600 text-sm'>
            <span>
              {new Date(post.date).toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className='max-w-3xl mx-auto'>
          <div className='prose prose-lg max-w-none prose-headings:text-charter-blue-600 prose-a:text-charter-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-pre:bg-gray-900 prose-pre:text-gray-100'>
            {/* Simple markdown-like rendering - will be replaced with MDX */}
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          </div>
        </div>

        {/* CTA */}
        <div className='max-w-3xl mx-auto mt-16'>
          <div className='bg-gradient-to-br from-charter-blue-50 to-green-50 p-8 rounded-2xl border border-charter-blue-100'>
            <h3 className='text-2xl font-bold text-charter-blue-600 mb-4'>
              Coba Kalkulator Deposito Gratis
            </h3>
            <p className='text-gray-700 mb-6'>
              Hitung bunga deposito Anda dengan mudah menggunakan kalkulator kami. Gratis, tanpa
              iklan, dan transparan.
            </p>
            <Link
              to='/'
              className='inline-block bg-charter-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-charter-blue-700 transition-colors'
            >
              Mulai Hitung Sekarang →
            </Link>
          </div>
        </div>

        {/* Share Buttons */}
        <div className='max-w-3xl mx-auto mt-8'>
          <div className='flex items-center gap-4'>
            <span className='text-gray-600 font-medium'>Bagikan:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-charter-blue-600 hover:text-charter-blue-700'
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-charter-blue-600 hover:text-charter-blue-700'
            >
              Facebook
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-charter-blue-600 hover:text-charter-blue-700'
            >
              WhatsApp
            </a>
          </div>
        </div>
      </motion.article>

      <Footer />
    </div>
  )
}

export default BlogPost
