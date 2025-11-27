import { motion } from 'motion/react'
import Footer from '@/components/Footer/Footer'

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.1 }
    }
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } }
  }

  return (
    <>
      {/* Hero Section */}
      <motion.div
        className='w-full bg-base-200 pt-20 pb-16 relative overflow-hidden'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        {/* Decorative Background Elements */}
        <div className='absolute top-0 right-0 w-96 h-96 bg-jess opacity-5 rounded-full -mr-48 -mt-48'></div>
        <div className='absolute bottom-0 left-0 w-80 h-80 bg-charter-blue-600 opacity-5 rounded-full -ml-40 -mb-40'></div>

        <div className='max-w-7xl mx-auto px-10 relative z-10'>
          <motion.div className='inline-block mb-4' variants={childVariants}>
            <span className='px-4 py-2 bg-jess/10 text-jess-700 rounded-full text-sm font-medium border border-jess/20'>
              ℹ️ Tentang Kami
            </span>
          </motion.div>

          <motion.h1
            className='text-4xl md:text-6xl font-bold text-charter-blue-800 mb-6 leading-tight'
            variants={childVariants}
          >
            Tentang <span className='text-jess'>InvestCount</span>
          </motion.h1>
          <motion.p
            className='text-base md:text-lg font-medium text-charter-blue max-w-2xl mb-8'
            variants={childVariants}
          >
            Kalkulator deposito gratis yang membantu Anda memahami bunga deposito bersih dengan
            transparan.
          </motion.p>

          {/* Key Values */}
          <motion.div className='flex flex-wrap gap-4' variants={childVariants}>
            {[
              { icon: '🔍', text: 'Transparan' },
              { icon: '🆓', text: 'Gratis Selamanya' },
              { icon: '🚫', text: 'Tanpa Iklan' },
              { icon: '🔒', text: 'Privasi Terjaga' }
            ].map((item, index) => (
              <div
                key={index}
                className='flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-charter-blue-200'
              >
                <span className='text-lg'>{item.icon}</span>
                <span className='text-sm font-medium text-charter-blue-800'>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Story Section */}
      <motion.div
        className='w-full bg-white pt-10 pb-10'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className='max-w-7xl mx-auto px-10'>
          <motion.h2
            className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'
            variants={childVariants}
          >
            Cerita Kami
          </motion.h2>
          <motion.div className='space-y-4 text-charter-blue' variants={childVariants}>
            <p className='text-base md:text-lg'>
              InvestCount lahir dari pengalaman pribadi melihat banyak orang Indonesia yang rajin
              menabung, tetapi tidak tahu berapa bunga bersih yang mereka terima setelah dipotong
              pajak. Banyak yang terkejut ketika mengetahui bahwa deposito mereka dikenakan pajak
              20%, dan return yang mereka bayangkan ternyata jauh lebih kecil.
            </p>
            <p className='text-base md:text-lg'>
              Sebagai seorang pengembang yang percaya bahwa teknologi harus memberdayakan
              masyarakat, saya membuat InvestCount sebagai alat edukasi finansial yang{' '}
              <strong>gratis, transparan, dan tanpa agenda tersembunyi</strong>.
            </p>
            <p className='text-base md:text-lg'>
              InvestCount bukan hanya kalkulator — ini adalah upaya untuk membantu setiap orang,
              dari anak muda yang baru mulai menabung sampai pensiunan yang ingin mengoptimalkan
              dana, memahami bagaimana uang mereka bekerja.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.div
        className='w-full bg-base-200 pt-10 pb-10'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className='max-w-7xl mx-auto px-10'>
          <motion.h2
            className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'
            variants={childVariants}
          >
            Misi Kami
          </motion.h2>
          <motion.div
            className='bg-white p-8 rounded-2xl border border-charter-blue shadow-md'
            variants={childVariants}
          >
            <p className='text-lg md:text-xl text-charter-blue font-medium leading-relaxed'>
              Membantu setiap orang Indonesia memahami deposito dengan cara yang{' '}
              <span className='font-bold text-jess'>jujur, sederhana, dan transparan</span> —
              sehingga mereka dapat membuat keputusan finansial yang lebih baik.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        className='w-full bg-white pt-10 pb-10'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className='max-w-7xl mx-auto px-10'>
          <motion.h2
            className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-8'
            variants={childVariants}
          >
            Nilai-Nilai Kami
          </motion.h2>
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                icon: '🔍',
                title: 'Transparansi',
                desc: 'Kami menjelaskan dari mana data berasal, bagaimana kami menghitung, dan apa keterbatasan kami.'
              },
              {
                icon: '📚',
                title: 'Edukasi',
                desc: 'Kami tidak hanya memberikan angka, tetapi juga membantu Anda memahami konsep finansial dengan bahasa yang mudah dipahami.'
              },
              {
                icon: '🆓',
                title: 'Gratis Selamanya',
                desc: 'InvestCount akan selalu gratis untuk semua orang. Tidak ada biaya tersembunyi, tidak ada paywall.'
              },
              {
                icon: '🚫',
                title: 'Tanpa Iklan',
                desc: 'Kami tidak menampilkan iklan yang mengganggu. Fokus Anda adalah memahami deposito, bukan diklik-klik iklan.'
              },
              {
                icon: '🔒',
                title: 'Privasi Pengguna',
                desc: 'Kami tidak menyimpan data pribadi Anda. Tidak ada login, tidak ada tracking, tidak ada cookies yang tidak perlu.'
              },
              {
                icon: '🤝',
                title: 'Independen',
                desc: 'Kami tidak berafiliasi dengan bank manapun. Informasi yang kami berikan netral dan objektif.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                className='border rounded-lg p-6 shadow-md border-charter-blue bg-white hover:shadow-lg transition-shadow'
                variants={childVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className='text-4xl mb-4'>{value.icon}</div>
                <h3 className='text-xl font-bold text-charter-blue mb-2'>{value.title}</h3>
                <p className='text-charter-blue-400'>{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Creator Section */}
      <motion.div
        className='w-full bg-base-200 pt-10 pb-10'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className='max-w-7xl mx-auto px-10'>
          <motion.h2
            className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'
            variants={childVariants}
          >
            Pembuat InvestCount
          </motion.h2>
          <motion.div
            className='bg-white p-8 rounded-2xl shadow-lg border border-charter-blue'
            variants={childVariants}
          >
            <div className='flex flex-col md:flex-row gap-8 items-start'>
              {/* Avatar */}
              <div className='flex-shrink-0'>
                <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-jess shadow-lg hover:shadow-xl transition-shadow'>
                  <img
                    alt='Syubban Fakhriya'
                    src={'/avatar.jpg'}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                  />
                </div>
              </div>

              {/* Profile Info */}
              <div className='flex-grow'>
                <h3 className='text-3xl font-bold text-charter-blue-800 mb-2'>Syubban Fakhriya</h3>
                <p className='text-jess-600 font-medium mb-4 text-lg'>
                  Software Engineer & Creator
                </p>

                <p className='text-charter-blue leading-relaxed mb-6 text-base'>
                  Seorang software engineer yang passionate tentang financial literacy dan
                  teknologi. Percaya bahwa setiap orang berhak memahami keuangan mereka tanpa harus
                  menjadi ahli finansial.
                </p>

                {/* Social Links */}
                <div className='flex flex-wrap gap-3'>
                  <a
                    href='https://www.linkedin.com/in/syubban-fakhriya/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 px-4 py-2 bg-charter-blue-600 text-white rounded-lg hover:bg-charter-blue-700 transition-colors font-medium shadow-sm hover:shadow-md'
                  >
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                    </svg>
                    LinkedIn
                  </a>

                  <a
                    href='https://github.com/HellBus1'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium shadow-sm hover:shadow-md'
                  >
                    <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                      <path
                        fillRule='evenodd'
                        d='M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z'
                        clipRule='evenodd'
                      />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div
        className='w-full bg-white pt-10 pb-20'
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className='max-w-7xl mx-auto px-10'>
          <motion.h2
            className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'
            variants={childVariants}
          >
            Hubungi Kami
          </motion.h2>
          <motion.div
            className='bg-base-200 p-8 rounded-2xl border border-charter-blue'
            variants={childVariants}
          >
            <p className='text-charter-blue mb-6 text-base md:text-lg'>
              Punya pertanyaan, saran, atau menemukan data yang tidak akurat? Kami senang mendengar
              dari Anda!
            </p>
            <a
              href='mailto:feedback@investcount.com?subject=Feedback untuk InvestCount'
              className='btn btn-primary'
            >
              <p className='text-[#ffffff]'>Kirim Feedback</p>
            </a>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </>
  )
}

export default AboutPage
