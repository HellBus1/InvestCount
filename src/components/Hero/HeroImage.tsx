const HeroImage = () => {
  const GROW_MONEY_IMAGE = '/assets/images/grow_money.jpg'
  const GROW_MONEY_IMAGE_BACK = '/assets/images/grow_money_back.jpg'

  const getImagePath = (basePath: string) => {
    return `${window.location.origin}${basePath}`
  }

  return (
    <div className='relative my-10'>
      <img
        src={getImagePath(GROW_MONEY_IMAGE)}
        className='max-w-sm rounded-lg w-74'
        alt='Grow Money'
      />
      <img
        src={getImagePath(GROW_MONEY_IMAGE_BACK)}
        className='max-w-sm rounded-lg shadow-2xl w-74 absolute top-0 z-[-99] rotate-12'
        alt='Grow Money'
      />
    </div>
  )
}

export default HeroImage
