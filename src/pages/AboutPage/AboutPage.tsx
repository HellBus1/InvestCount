import { motion } from 'motion/react'
import Footer from '@/pages/HomePage/components/Footer/Footer'

const AboutPage = () => {
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
        <motion.div className='max-w-4xl mx-auto mb-12' variants={childVariants}>
          <h1 className='text-4xl md:text-5xl font-bold text-charter-blue-600 mb-4'>
            Tentang InvestCount
          </h1>
          <div className='h-1 w-24 bg-gradient-to-r from-charter-blue-600 to-green-500 rounded-full'></div>
        </motion.div>

        {/* Story Section */}
        <motion.section className='max-w-4xl mx-auto mb-16' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>Cerita Kami</h2>
          <div className='prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4'>
            <p>
              InvestCount lahir dari pengalaman pribadi melihat banyak orang Indonesia yang rajin
              menabung, tetapi tidak tahu berapa bunga bersih yang mereka terima setelah dipotong
              pajak. Banyak yang terkejut ketika mengetahui bahwa deposito mereka dikenakan pajak
              20%, dan return yang mereka bayangkan ternyata jauh lebih kecil.
            </p>
            <p>
              Sebagai seorang pengembang yang percaya bahwa teknologi harus memberdayakan
              masyarakat, saya membuat InvestCount sebagai alat edukasi finansial yang{' '}
              <strong>gratis, transparan, dan tanpa agenda tersembunyi</strong>.
            </p>
            <p>
              InvestCount bukan hanya kalkulator — ini adalah upaya untuk membantu setiap orang,
              dari anak muda yang baru mulai menabung sampai pensiunan yang ingin mengoptimalkan
              dana, memahami bagaimana uang mereka bekerja.
            </p>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section className='max-w-4xl mx-auto mb-16' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>Misi Kami</h2>
          <div className='bg-gradient-to-br from-charter-blue-50 to-green-50 p-8 rounded-2xl border border-charter-blue-100'>
            <p className='text-xl text-charter-blue-700 font-medium leading-relaxed'>
              Membantu setiap orang Indonesia memahami deposito dengan cara yang{' '}
              <span className='font-bold'>jujur, sederhana, dan transparan</span> — sehingga mereka
              dapat membuat keputusan finansial yang lebih baik.
            </p>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section className='max-w-4xl mx-auto mb-16' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-8'>
            Nilai-Nilai Kami
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow'>
              <div className='text-4xl mb-4'>🔍</div>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>Transparansi</h3>
              <p className='text-gray-600'>
                Kami menjelaskan dari mana data berasal, bagaimana kami menghitung, dan apa
                keterbatasan kami.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow'>
              <div className='text-4xl mb-4'>📚</div>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>Edukasi</h3>
              <p className='text-gray-600'>
                Kami tidak hanya memberikan angka, tetapi juga membantu Anda memahami konsep
                finansial dengan bahasa yang mudah dipahami.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow'>
              <div className='text-4xl mb-4'>🆓</div>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>Gratis Selamanya</h3>
              <p className='text-gray-600'>
                InvestCount akan selalu gratis untuk semua orang. Tidak ada biaya tersembunyi, tidak
                ada paywall.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow'>
              <div className='text-4xl mb-4'>🚫</div>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>Tanpa Iklan</h3>
              <p className='text-gray-600'>
                Kami tidak menampilkan iklan yang mengganggu. Fokus Anda adalah memahami deposito,
                bukan diklik-klik iklan.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow'>
              <div className='text-4xl mb-4'>🔒</div>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>Privasi Pengguna</h3>
              <p className='text-gray-600'>
                Kami tidak menyimpan data pribadi Anda. Tidak ada login, tidak ada tracking, tidak
                ada cookies yang tidak perlu.
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow'>
              <div className='text-4xl mb-4'>🤝</div>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>Independen</h3>
              <p className='text-gray-600'>
                Kami tidak berafiliasi dengan bank manapun. Informasi yang kami berikan netral dan
                objektif.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Creator Section */}
        <motion.section className='max-w-4xl mx-auto mb-16' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>
            Pembuat InvestCount
          </h2>
          <div className='bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
            <div className='flex flex-col md:flex-row gap-6 items-start'>
              <div className='flex-shrink-0'>
                <div className='w-24 h-24 bg-gradient-to-br from-charter-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold'>
                  SF
                </div>
              </div>
              <div className='flex-grow'>
                <h3 className='text-2xl font-bold text-charter-blue-600 mb-2'>Syubban Fakhriya</h3>
                <p className='text-gray-600 mb-4'>Pengembang & Pencipta InvestCount</p>
                <p className='text-gray-700 leading-relaxed mb-4'>
                  Seorang software engineer yang passionate tentang financial literacy dan
                  teknologi. Percaya bahwa setiap orang berhak memahami keuangan mereka tanpa harus
                  menjadi ahli finansial.
                </p>
                <div className='flex gap-4'>
                  <a
                    href='https://github.com/HellBus1'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-charter-blue-600 hover:text-charter-blue-700 font-medium'
                  >
                    GitHub →
                  </a>
                  <a
                    href='https://www.buymeacoffee.com/syubban'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-charter-blue-600 hover:text-charter-blue-700 font-medium'
                  >
                    Buy Me a Coffee →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section className='max-w-4xl mx-auto' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>
            Hubungi Kami
          </h2>
          <div className='bg-gradient-to-br from-charter-blue-50 to-green-50 p-8 rounded-2xl border border-charter-blue-100'>
            <p className='text-gray-700 mb-4'>
              Punya pertanyaan, saran, atau menemukan data yang tidak akurat? Kami senang mendengar
              dari Anda!
            </p>
            <a
              href='mailto:feedback@investcount.com?subject=Feedback untuk InvestCount'
              className='inline-block bg-charter-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-charter-blue-700 transition-colors'
            >
              Kirim Feedback
            </a>
          </div>
        </motion.section>
      </motion.div>

      <Footer />
    </div>
  )
}

export default AboutPage
