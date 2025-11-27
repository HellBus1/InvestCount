import { motion } from 'motion/react'
import Footer from '@/components/Footer/Footer'

const TransparencyPage = () => {
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

  const lastUpdated = '27 November 2025'

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
            Sumber Data & <span className='text-jess'>Metodologi</span>
          </motion.h1>
          <motion.p
            className='text-base md:text-lg font-medium text-charter-blue mt-4'
            variants={childVariants}
          >
            Transparansi adalah nilai inti kami. Halaman ini menjelaskan dari mana data kami berasal
            dan bagaimana kami menghitung bunga deposito.
          </motion.p>
        </div>
      </motion.div>

      {/* Data Sources */}
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
            Dari Mana Data Kami?
          </motion.h2>
          <motion.p
            className='text-base md:text-lg text-charter-blue mb-6'
            variants={childVariants}
          >
            Kami mengumpulkan data suku bunga deposito dari berbagai sumber terpercaya untuk
            memastikan akurasi dan relevansi:
          </motion.p>

          <div className='grid md:grid-cols-2 gap-6'>
            {[
              {
                title: '1. Website Resmi Bank',
                desc: 'Kami mengunjungi website resmi setiap bank untuk mendapatkan informasi suku bunga deposito terbaru. Setiap bank memiliki halaman khusus yang menampilkan rate deposito mereka.',
                update: 'Update: Setiap minggu atau ketika ada perubahan signifikan'
              },
              {
                title: '2. Otoritas Jasa Keuangan (OJK)',
                desc: 'OJK menerbitkan data statistik perbankan Indonesia yang kami gunakan sebagai referensi untuk memvalidasi data.',
                link: 'https://www.ojk.go.id',
                linkText: 'Kunjungi OJK →'
              },
              {
                title: '3. Lembaga Penjamin Simpanan (LPS)',
                desc: 'LPS menyediakan informasi tentang bank-bank yang dijamin dan batas penjaminan deposito (Rp 2 miliar per nasabah per bank).',
                link: 'https://www.lps.go.id',
                linkText: 'Kunjungi LPS →'
              },
              {
                title: '4. Bank Indonesia',
                desc: 'Kami menggunakan data inflasi dan suku bunga acuan dari Bank Indonesia untuk konteks ekonomi makro.',
                link: 'https://www.bi.go.id',
                linkText: 'Kunjungi BI →'
              }
            ].map((source, index) => (
              <motion.div
                key={index}
                className='border rounded-lg p-6 shadow-md border-charter-blue bg-white hover:shadow-lg transition-shadow'
                variants={childVariants}
              >
                <h3 className='text-xl font-bold text-charter-blue mb-3'>{source.title}</h3>
                <p className='text-charter-blue-400 mb-3'>{source.desc}</p>
                {source.update && <p className='text-sm text-charter-blue-400'>{source.update}</p>}
                {source.link && (
                  <a
                    href={source.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-charter-blue-600 hover:text-jess font-medium transition-colors'
                  >
                    {source.linkText}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Methodology */}
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
            Cara Kami Menghitung
          </motion.h2>

          <div className='space-y-6'>
            {/* Basic Calculation */}
            <motion.div
              className='bg-white p-8 rounded-2xl border border-charter-blue shadow-md'
              variants={childVariants}
            >
              <h3 className='text-xl font-bold text-charter-blue-600 mb-4'>
                Formula Dasar Bunga Deposito
              </h3>
              <div className='bg-base-200 p-6 rounded-lg mb-4 font-mono text-sm text-charter-blue'>
                <p className='mb-2'>Bunga Kotor = (Pokok × Suku Bunga × Tenor) / 12</p>
                <p className='mb-2'>Pajak = Bunga Kotor × 20%</p>
                <p className='font-bold'>Bunga Bersih = Bunga Kotor - Pajak</p>
              </div>
              <div className='bg-blue-50 p-4 rounded-lg border-l-4 border-charter-blue-600'>
                <p className='text-sm text-charter-blue font-medium mb-2'>
                  <strong>Contoh:</strong> Deposito Rp 10.000.000 dengan bunga 5% per tahun untuk 12
                  bulan:
                </p>
                <ul className='text-sm text-charter-blue-400 space-y-1 ml-4'>
                  <li>• Bunga Kotor = (10.000.000 × 5% × 12) / 12 = Rp 500.000</li>
                  <li>• Pajak = 500.000 × 20% = Rp 100.000</li>
                  <li>• Bunga Bersih = 500.000 - 100.000 = Rp 400.000</li>
                </ul>
              </div>
            </motion.div>

            {/* ARO Calculation */}
            <motion.div
              className='bg-white p-8 rounded-2xl shadow-md border border-charter-blue'
              variants={childVariants}
            >
              <h3 className='text-xl font-bold text-charter-blue-600 mb-4'>
                Perhitungan ARO (Automatic Roll Over)
              </h3>
              <p className='text-charter-blue mb-4'>
                Untuk deposito ARO, bunga bersih ditambahkan ke pokok pada akhir tenor, lalu
                deposito diperpanjang otomatis dengan pokok yang baru.
              </p>
              <div className='bg-base-200 p-4 rounded-lg'>
                <p className='text-sm text-charter-blue font-medium mb-2'>
                  <strong>Contoh ARO 3 bulan:</strong>
                </p>
                <ul className='text-sm text-charter-blue-400 space-y-1 ml-4'>
                  <li>• Bulan 0-3: Pokok Rp 10.000.000, Bunga bersih Rp 100.000</li>
                  <li>• Bulan 3-6: Pokok Rp 10.100.000 (pokok + bunga bersih)</li>
                  <li>• Bulan 6-9: Pokok Rp 10.201.000 (efek compounding)</li>
                </ul>
              </div>
            </motion.div>

            {/* ARO+ Calculation */}
            <motion.div
              className='bg-white p-8 rounded-2xl shadow-md border border-charter-blue'
              variants={childVariants}
            >
              <h3 className='text-xl font-bold text-charter-blue-600 mb-4'>
                Perhitungan ARO+ (Compounding Interest)
              </h3>
              <p className='text-charter-blue mb-4'>
                ARO+ menggabungkan bunga kotor (sebelum pajak) ke pokok, sehingga efek compounding
                lebih besar. Pajak dihitung di akhir periode total.
              </p>
              <div className='bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500'>
                <p className='text-sm text-charter-blue'>
                  <strong>Catatan:</strong> ARO+ adalah simulasi untuk menunjukkan efek maksimal
                  compounding. Tidak semua bank menawarkan opsi ini. Selalu konfirmasi dengan bank
                  Anda.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Update Frequency & Banks */}
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
            Kapan Data Diperbarui?
          </motion.h2>
          <motion.div
            className='bg-base-200 p-8 rounded-2xl border border-charter-blue mb-10'
            variants={childVariants}
          >
            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl'>
                  📅
                </div>
                <div>
                  <h3 className='text-lg font-bold text-charter-blue-600 mb-2'>
                    Jadwal Update Rutin
                  </h3>
                  <p className='text-charter-blue'>
                    Kami memperbarui data suku bunga deposito setiap <strong>minggu</strong> untuk
                    memastikan informasi tetap akurat dan relevan.
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl'>
                  🔔
                </div>
                <div>
                  <h3 className='text-lg font-bold text-charter-blue-600 mb-2'>Update Ad-Hoc</h3>
                  <p className='text-charter-blue'>
                    Jika ada perubahan signifikan (misalnya bank mengubah rate secara drastis), kami
                    akan memperbarui data sesegera mungkin.
                  </p>
                </div>
              </div>

              <div className='bg-white p-6 rounded-xl border border-charter-blue'>
                <p className='text-charter-blue font-medium'>
                  Terakhir diperbarui: <strong className='text-jess'>{lastUpdated}</strong>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.h2
            className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'
            variants={childVariants}
          >
            Bank yang Kami Pantau
          </motion.h2>
          <motion.div
            className='bg-base-200 p-8 rounded-2xl border border-charter-blue'
            variants={childVariants}
          >
            <p className='text-charter-blue mb-6'>
              Saat ini, InvestCount memantau suku bunga deposito dari <strong>17+ bank</strong> di
              Indonesia, termasuk:
            </p>

            <div className='grid md:grid-cols-2 gap-6 mb-6'>
              <div>
                <h4 className='font-bold text-charter-blue-600 mb-3'>Bank Digital</h4>
                <ul className='space-y-2 text-charter-blue'>
                  <li>• Jenius by SMBC Indonesia</li>
                  <li>• blu by BCA Digital</li>
                  <li>• Line Bank by Hana Bank</li>
                  <li>• NeoBank by Bank Neo Commerce</li>
                  <li>• Krom by Krom Bank</li>
                  <li>• SeaBank by SeaBank Indonesia</li>
                  <li>• Jago by Bank Artos</li>
                  <li>• SuperBank</li>
                  <li>• OctoBank by CIMB Niaga</li>
                  <li>• TMRW by UOB</li>
                </ul>
              </div>

              <div>
                <h4 className='font-bold text-charter-blue-600 mb-3'>Bank Konvensional</h4>
                <ul className='space-y-2 text-charter-blue'>
                  <li>• BCA</li>
                  <li>• BRI (BRIMo)</li>
                  <li>• BNI (Wondr, Hibank)</li>
                  <li>• Mandiri (Livin)</li>
                  <li>• Permata ME</li>
                  <li>• Danamon (D-Bank Pro)</li>
                  <li>• CIMB Niaga</li>
                </ul>
              </div>
            </div>

            <div className='bg-blue-50 p-4 rounded-lg border-l-4 border-charter-blue-600'>
              <p className='text-sm text-charter-blue'>
                <strong>Ingin bank lain ditambahkan?</strong> Kirim saran Anda ke{' '}
                <a
                  href='mailto:feedback@investcount.com?subject=Tambah Bank'
                  className='text-charter-blue-600 hover:text-jess font-medium transition-colors'
                >
                  feedback@investcount.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Disclaimer */}
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
            Disclaimer
          </motion.h2>
          <motion.div
            className='bg-yellow-50 p-8 rounded-2xl border-2 border-yellow-200'
            variants={childVariants}
          >
            <div className='space-y-4 text-charter-blue'>
              <p>
                <strong>InvestCount adalah alat edukasi independen.</strong> Kami tidak berafiliasi
                dengan bank manapun yang tercantum di platform ini.
              </p>
              <p>
                Meskipun kami berusaha keras untuk memastikan akurasi data, suku bunga deposito
                dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Kami sangat menyarankan
                Anda untuk:
              </p>
              <ul className='list-disc ml-6 space-y-2'>
                <li>
                  <strong>Verifikasi langsung dengan bank</strong> sebelum membuka deposito
                </li>
                <li>
                  <strong>Membaca syarat dan ketentuan</strong> dari bank yang Anda pilih
                </li>
                <li>
                  <strong>Memahami risiko</strong> dan ketentuan deposito (tenor, penalti pencairan
                  dini, dll.)
                </li>
              </ul>
              <p className='font-medium'>
                InvestCount tidak bertanggung jawab atas keputusan finansial yang Anda buat
                berdasarkan informasi di platform ini. Gunakan sebagai referensi dan panduan, bukan
                sebagai satu-satunya sumber informasi.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Report Error */}
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
            Laporkan Data yang Tidak Akurat
          </motion.h2>
          <motion.div
            className='bg-base-200 p-8 rounded-2xl border border-charter-blue'
            variants={childVariants}
          >
            <p className='text-charter-blue mb-6 text-base md:text-lg'>
              Menemukan data yang tidak sesuai atau sudah kadaluarsa? Kami sangat menghargai bantuan
              Anda untuk menjaga akurasi InvestCount.
            </p>
            <a
              href='mailto:feedback@investcount.com?subject=Data Tidak Akurat&body=Bank: %0D%0ATenor: %0D%0ASuku Bunga yang Benar: %0D%0ASumber: '
              className='btn btn-primary'
            >
              <p className='text-[#ffffff]'>Laporkan Data</p>
            </a>
          </motion.div>
        </div>
      </motion.div>

      <Footer />
    </>
  )
}

export default TransparencyPage
