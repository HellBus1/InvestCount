import React from 'react'

export type IconName =
  | 'shield-check'
  | 'lock'
  | 'gift'
  | 'handshake'
  | 'bank'
  | 'coins'
  | 'chart-bar'
  | 'calculator'
  | 'home'
  | 'book-open'
  | 'info'
  | 'calendar'
  | 'bell'
  | 'check'
  | 'arrow-right'
  | 'sparkles'
  | 'scale'
  | 'external-link'
  | 'close'
  | 'menu'

interface IconProps {
  name: IconName
  className?: string
  size?: number
}

const Icon: React.FC<IconProps> = ({ name, className = 'w-5 h-5', size }) => {
  const style = size ? { width: size, height: size } : undefined

  switch (name) {
    case 'shield-check':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
          <path d='m9 12 2 2 4-4' />
        </svg>
      )
    case 'lock':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
          <path d='M7 11V7a5 5 0 0 1 10 0v4' />
        </svg>
      )
    case 'gift':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='20 12 20 22 4 22 4 12' />
          <rect x='2' y='7' width='20' height='5' />
          <line x1='12' y1='22' x2='12' y2='7' />
          <path d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' />
          <path d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' />
        </svg>
      )
    case 'handshake':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='m11 17 2 2a1 1 0 0 0 1.4 0l4.6-4.6a2 2 0 0 0 0-2.8l-3.2-3.2a2 2 0 0 0-2.8 0L7 14.4' />
          <path d='m21.8 13.8-3.2-3.2a2 2 0 0 0-2.8 0L14 12.4' />
          <path d='m3.2 10.2 3.2 3.2a2 2 0 0 0 2.8 0L11 11.6' />
          <path d='m2.2 10.2 6.6-6.6a2 2 0 0 1 2.8 0l3.2 3.2a2 2 0 0 1 0 2.8L12 12.4' />
        </svg>
      )
    case 'bank':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M3 21h18' />
          <path d='M3 10h18' />
          <path d='M5 10v11' />
          <path d='M19 10v11' />
          <path d='M9 10v11' />
          <path d='M14 10v11' />
          <path d='M12 2 2 7h20L12 2z' />
        </svg>
      )
    case 'coins':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='8' cy='8' r='6' />
          <path d='M18.09 10.37A6 6 0 1 1 10.34 18' />
          <path d='M7 6h1v4' />
          <path d='m16.71 13.88.7.71-2.82 2.82' />
        </svg>
      )
    case 'chart-bar':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='12' y1='20' x2='12' y2='10' />
          <line x1='18' y1='20' x2='18' y2='4' />
          <line x1='6' y1='20' x2='6' y2='16' />
        </svg>
      )
    case 'calculator':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='4' y='2' width='16' height='20' rx='2' />
          <line x1='8' y1='6' x2='16' y2='6' />
          <line x1='16' y1='14' x2='16' y2='18' />
          <path d='M16 10h.01' />
          <path d='M12 10h.01' />
          <path d='M8 10h.01' />
          <path d='M12 14h.01' />
          <path d='M8 14h.01' />
          <path d='M12 18h.01' />
          <path d='M8 18h.01' />
        </svg>
      )
    case 'home':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
          <polyline points='9 22 9 12 15 12 15 22' />
        </svg>
      )
    case 'book-open':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
          <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
        </svg>
      )
    case 'info':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx='12' cy='12' r='10' />
          <line x1='12' y1='16' x2='12' y2='12' />
          <line x1='12' y1='8' x2='12.01' y2='8' />
        </svg>
      )
    case 'calendar':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
          <line x1='16' y1='2' x2='16' y2='6' />
          <line x1='8' y1='2' x2='8' y2='6' />
          <line x1='3' y1='10' x2='21' y2='10' />
        </svg>
      )
    case 'bell':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
          <path d='M13.73 21a2 2 0 0 1-3.46 0' />
        </svg>
      )
    case 'check':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='20 6 9 17 4 12' />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='5' y1='12' x2='19' y2='12' />
          <polyline points='12 5 19 12 12 19' />
        </svg>
      )
    case 'sparkles':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z' />
        </svg>
      )
    case 'scale':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z' />
          <path d='m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z' />
          <path d='M7 21h10' />
          <path d='M12 3v18' />
          <path d='M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2' />
        </svg>
      )
    case 'external-link':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
          <polyline points='15 3 21 3 21 9' />
          <line x1='10' y1='14' x2='21' y2='3' />
        </svg>
      )
    case 'close':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='18' y1='6' x2='6' y2='18' />
          <line x1='6' y1='6' x2='18' y2='18' />
        </svg>
      )
    case 'menu':
      return (
        <svg
          style={style}
          className={className}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <line x1='4' y1='12' x2='20' y2='12' />
          <line x1='4' y1='6' x2='20' y2='6' />
          <line x1='4' y1='18' x2='20' y2='18' />
        </svg>
      )
    default:
      return null
  }
}

export default Icon
