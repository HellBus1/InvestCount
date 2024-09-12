import GrowMoneyImage from '@/assets/images/grow_money.jpg'
import GrowMoneyImage2 from '@/assets/images/grow_money_back.jpg'

const HeroImage = () => {
  return (
    <div className='relative my-10'>
      <img src={GrowMoneyImage} className='max-w-sm rounded-lg w-74' alt='Grow Money' />
      <img
        src={GrowMoneyImage2}
        className='max-w-sm rounded-lg shadow-2xl w-74 absolute top-0 z-[-99] rotate-12'
        alt='Grow Money'
      />
    </div>
  )
}

export default HeroImage
