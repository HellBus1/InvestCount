import { getImagePath } from '@/services/inputServices'

const HeroImage = () => {
  const GROW_MONEY_IMAGE = '/assets/images/grow_money.jpg'
  const GROW_MONEY_IMAGE_BACK = '/assets/images/grow_money_back.jpg'

  return (
    <div className='relative flex items-center justify-center w-full py-4 sm:py-6'>
      {/* Background Rotated Card */}
      <img
        src={getImagePath(GROW_MONEY_IMAGE_BACK)}
        className='w-56 sm:w-64 md:w-72 rounded-2xl shadow-xl absolute rotate-6 opacity-75 object-cover'
        alt='Grow Money Background'
      />
      {/* Foreground Main Card */}
      <img
        src={getImagePath(GROW_MONEY_IMAGE)}
        className='w-56 sm:w-64 md:w-72 rounded-2xl shadow-2xl relative z-10 border-2 border-white/90 object-cover'
        alt='Grow Money'
      />
    </div>
  )
}

export default HeroImage
