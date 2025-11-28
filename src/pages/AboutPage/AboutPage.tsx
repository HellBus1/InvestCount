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
            Tentang <span className='text-jess'>InvestCount</span>
          </motion.h1>
          <motion.p
            className='text-base md:text-lg font-medium text-charter-blue mt-4'
            variants={childVariants}
          >
            Kalkulator deposito gratis yang membantu Anda memahami bunga deposito bersih dengan
            transparan.
          </motion.p>
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
            <div className='flex flex-col md:flex-row gap-6 items-start'>
              <div className='flex-shrink-0'>
                <div className='w-24 h-24 bg-gradient-to-br from-charter-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-3xl font-bold'>
                  SF
                </div>
              </div>
              <div className='flex-grow'>
                <h3 className='text-2xl font-bold text-charter-blue-600 mb-2'>Syubban Fakhriya</h3>
                <p className='text-charter-blue-400 mb-4'>Pengembang & Pencipta InvestCount</p>
                <p className='text-charter-blue leading-relaxed mb-4'>
                  Seorang software engineer yang passionate tentang financial literacy dan
                  teknologi. Percaya bahwa setiap orang berhak memahami keuangan mereka tanpa harus
                  menjadi ahli finansial.
                </p>
                <div className='flex gap-4'>
                  <a
                    href='https://github.com/HellBus1'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-charter-blue-600 hover:text-jess font-medium transition-colors'
                  >
                    GitHub →
                  </a>
                  <a
                    href='https://www.buymeacoffee.com/syubban'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-charter-blue-600 hover:text-jess font-medium transition-colors'
                  >
                    Buy Me a Coffee →
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
