import { motion } from 'motion/react'
import Footer from '@/pages/HomePage/components/Footer/Footer'

const TransparencyPage = () => {
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

  const lastUpdated = '27 November 2025'

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
            Sumber Data & Metodologi
          </h1>
          <div className='h-1 w-24 bg-gradient-to-r from-charter-blue-600 to-green-500 rounded-full'></div>
          <p className='text-gray-600 mt-4'>
            Transparansi adalah nilai inti kami. Halaman ini menjelaskan dari mana data kami berasal
            dan bagaimana kami menghitung bunga deposito.
          </p>
        </motion.div>

        {/* Data Sources */}
        <motion.section className='max-w-4xl mx-auto mb-16' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>
            Dari Mana Data Kami?
          </h2>
          <div className='prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4 mb-6'>
            <p>
              Kami mengumpulkan data suku bunga deposito dari berbagai sumber terpercaya untuk
              memastikan akurasi dan relevansi:
            </p>
          </div>

          <div className='space-y-4'>
            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100'>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>
                1. Website Resmi Bank
              </h3>
              <p className='text-gray-700 mb-3'>
                Kami mengunjungi website resmi setiap bank untuk mendapatkan informasi suku bunga
                deposito terbaru. Setiap bank memiliki halaman khusus yang menampilkan rate deposito
                mereka.
              </p>
              <p className='text-sm text-gray-500'>
                Update: Setiap minggu atau ketika ada perubahan signifikan
              </p>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100'>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>
                2. Otoritas Jasa Keuangan (OJK)
              </h3>
              <p className='text-gray-700 mb-3'>
                OJK menerbitkan data statistik perbankan Indonesia yang kami gunakan sebagai
                referensi untuk memvalidasi data.
              </p>
              <a
                href='https://www.ojk.go.id'
                target='_blank'
                rel='noopener noreferrer'
                className='text-charter-blue-600 hover:text-charter-blue-700 font-medium'
              >
                Kunjungi OJK →
              </a>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100'>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>
                3. Lembaga Penjamin Simpanan (LPS)
              </h3>
              <p className='text-gray-700 mb-3'>
                LPS menyediakan informasi tentang bank-bank yang dijamin dan batas penjaminan
                deposito (Rp 2 miliar per nasabah per bank).
              </p>
              <a
                href='https://www.lps.go.id'
                target='_blank'
                rel='noopener noreferrer'
                className='text-charter-blue-600 hover:text-charter-blue-700 font-medium'
              >
                Kunjungi LPS →
              </a>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md border border-gray-100'>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-2'>4. Bank Indonesia</h3>
              <p className='text-gray-700 mb-3'>
                Kami menggunakan data inflasi dan suku bunga acuan dari Bank Indonesia untuk konteks
                ekonomi makro.
              </p>
              <a
                href='https://www.bi.go.id'
                target='_blank'
                rel='noopener noreferrer'
                className='text-charter-blue-600 hover:text-charter-blue-700 font-medium'
              >
                Kunjungi BI →
              </a>
            </div>
          </div>
        </motion.section>

        {/* Methodology */}
        <motion.section className='max-w-4xl mx-auto mb-16' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>
            Cara Kami Menghitung
          </h2>

          <div className='space-y-8'>
            {/* Basic Calculation */}
            <div className='bg-gradient-to-br from-charter-blue-50 to-green-50 p-8 rounded-2xl border border-charter-blue-100'>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-4'>
                Formula Dasar Bunga Deposito
              </h3>
              <div className='bg-white p-6 rounded-lg mb-4 font-mono text-sm'>
                <p className='mb-2'>Bunga Kotor = (Pokok × Suku Bunga × Tenor) / 12</p>
                <p className='mb-2'>Pajak = Bunga Kotor × 20%</p>
                <p className='font-bold'>Bunga Bersih = Bunga Kotor - Pajak</p>
              </div>
              <div className='bg-blue-50 p-4 rounded-lg border-l-4 border-charter-blue-600'>
                <p className='text-sm text-gray-700'>
                  <strong>Contoh:</strong> Deposito Rp 10.000.000 dengan bunga 5% per tahun untuk 12
                  bulan:
                </p>
                <ul className='text-sm text-gray-700 mt-2 space-y-1 ml-4'>
                  <li>• Bunga Kotor = (10.000.000 × 5% × 12) / 12 = Rp 500.000</li>
                  <li>• Pajak = 500.000 × 20% = Rp 100.000</li>
                  <li>• Bunga Bersih = 500.000 - 100.000 = Rp 400.000</li>
                </ul>
              </div>
            </div>

            {/* ARO Calculation */}
            <div className='bg-white p-8 rounded-2xl shadow-md border border-gray-100'>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-4'>
                Perhitungan ARO (Automatic Roll Over)
              </h3>
              <p className='text-gray-700 mb-4'>
                Untuk deposito ARO, bunga bersih ditambahkan ke pokok pada akhir tenor, lalu
                deposito diperpanjang otomatis dengan pokok yang baru.
              </p>
              <div className='bg-gray-50 p-4 rounded-lg'>
                <p className='text-sm text-gray-700'>
                  <strong>Contoh ARO 3 bulan:</strong>
                </p>
                <ul className='text-sm text-gray-700 mt-2 space-y-1 ml-4'>
                  <li>• Bulan 0-3: Pokok Rp 10.000.000, Bunga bersih Rp 100.000</li>
                  <li>• Bulan 3-6: Pokok Rp 10.100.000 (pokok + bunga bersih)</li>
                  <li>• Bulan 6-9: Pokok Rp 10.201.000 (efek compounding)</li>
                </ul>
              </div>
            </div>

            {/* ARO+ Calculation */}
            <div className='bg-white p-8 rounded-2xl shadow-md border border-gray-100'>
              <h3 className='text-xl font-bold text-charter-blue-600 mb-4'>
                Perhitungan ARO+ (Compounding Interest)
              </h3>
              <p className='text-gray-700 mb-4'>
                ARO+ menggabungkan bunga kotor (sebelum pajak) ke pokok, sehingga efek compounding
                lebih besar. Pajak dihitung di akhir periode total.
              </p>
              <div className='bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500'>
                <p className='text-sm text-gray-700'>
                  <strong>Catatan:</strong> ARO+ adalah simulasi untuk menunjukkan efek maksimal
                  compounding. Tidak semua bank menawarkan opsi ini. Selalu konfirmasi dengan bank
                  Anda.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Update Frequency */}
        <motion.section className='max-w-4xl mx-auto mb-16' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>
            Kapan Data Diperbarui?
          </h2>
          <div className='bg-white p-8 rounded-2xl shadow-md border border-gray-100'>
            <div className='flex items-start gap-4 mb-6'>
              <div className='flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl'>
                📅
              </div>
              <div>
                <h3 className='text-lg font-bold text-charter-blue-600 mb-2'>
                  Jadwal Update Rutin
                </h3>
                <p className='text-gray-700'>
                  Kami memperbarui data suku bunga deposito setiap <strong>minggu</strong> untuk
                  memastikan informasi tetap akurat dan relevan.
                </p>
              </div>
            </div>

            <div className='flex items-start gap-4 mb-6'>
              <div className='flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl'>
                🔔
              </div>
              <div>
                <h3 className='text-lg font-bold text-charter-blue-600 mb-2'>Update Ad-Hoc</h3>
                <p className='text-gray-700'>
                  Jika ada perubahan signifikan (misalnya bank mengubah rate secara drastis), kami
                  akan memperbarui data sesegera mungkin.
                </p>
              </div>
            </div>

            <div className='bg-gradient-to-br from-charter-blue-50 to-green-50 p-6 rounded-xl'>
              <p className='text-charter-blue-700 font-medium'>
                Terakhir diperbarui: <strong>{lastUpdated}</strong>
              </p>
            </div>
          </div>
        </motion.section>

        {/* Banks Covered */}
        <motion.section className='max-w-4xl mx-auto mb-16' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>
            Bank yang Kami Pantau
          </h2>
          <div className='bg-white p-8 rounded-2xl shadow-md border border-gray-100'>
            <p className='text-gray-700 mb-6'>
              Saat ini, InvestCount memantau suku bunga deposito dari <strong>17+ bank</strong> di
              Indonesia, termasuk:
            </p>

            <div className='grid md:grid-cols-2 gap-4 mb-6'>
              <div>
                <h4 className='font-bold text-charter-blue-600 mb-3'>Bank Digital</h4>
                <ul className='space-y-2 text-gray-700'>
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
                <ul className='space-y-2 text-gray-700'>
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
              <p className='text-sm text-gray-700'>
                <strong>Ingin bank lain ditambahkan?</strong> Kirim saran Anda ke{' '}
                <a
                  href='mailto:feedback@investcount.com?subject=Tambah Bank'
                  className='text-charter-blue-600 hover:text-charter-blue-700 font-medium'
                >
                  feedback@investcount.com
                </a>
              </p>
            </div>
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.section className='max-w-4xl mx-auto mb-16' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>Disclaimer</h2>
          <div className='bg-yellow-50 p-8 rounded-2xl border-2 border-yellow-200'>
            <div className='space-y-4 text-gray-700'>
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
          </div>
        </motion.section>

        {/* Report Error */}
        <motion.section className='max-w-4xl mx-auto' variants={childVariants}>
          <h2 className='text-2xl md:text-3xl font-bold text-charter-blue-600 mb-6'>
            Laporkan Data yang Tidak Akurat
          </h2>
          <div className='bg-gradient-to-br from-charter-blue-50 to-green-50 p-8 rounded-2xl border border-charter-blue-100'>
            <p className='text-gray-700 mb-4'>
              Menemukan data yang tidak sesuai atau sudah kadaluarsa? Kami sangat menghargai bantuan
              Anda untuk menjaga akurasi InvestCount.
            </p>
            <a
              href='mailto:feedback@investcount.com?subject=Data Tidak Akurat&body=Bank: %0D%0ATenor: %0D%0ASuku Bunga yang Benar: %0D%0ASumber: '
              className='inline-block bg-charter-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-charter-blue-700 transition-colors'
            >
              Laporkan Data
            </a>
          </div>
        </motion.section>
      </motion.div>

      <Footer />
    </div>
  )
}

export default TransparencyPage
