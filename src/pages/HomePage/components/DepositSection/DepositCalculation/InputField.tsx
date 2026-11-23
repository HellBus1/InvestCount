import React, { useId } from 'react'

interface InputFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  error?: string
  helperText?: string
  type: string
  min?: number
  disabled?: boolean
  required?: boolean
  prefix?: string
  suffix?: string
}

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  type,
  min,
  disabled = false,
  required = false,
  prefix,
  suffix
}: InputFieldProps) => {
  const inputId = useId()

  return (
    <div className='w-full'>
      <label htmlFor={inputId} className='block text-xs font-semibold text-slate-700 mb-1.5'>
        {label} {required && <span className='text-brand-600'>*</span>}
      </label>

      <div className='relative flex items-center'>
        {prefix && (
          <span className='absolute left-3.5 text-sm font-medium text-slate-400 pointer-events-none'>
            {prefix}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          disabled={disabled}
          required={required}
          className={`w-full py-2.5 sm:py-3 rounded-xl border text-sm sm:text-base font-medium transition-all ${
            prefix ? 'pl-10' : 'pl-3.5'
          } ${suffix ? 'pr-12' : 'pr-3.5'} ${
            disabled
              ? 'bg-slate-100 text-slate-500 border-slate-200 cursor-not-allowed'
              : error
                ? 'bg-rose-50/60 border-rose-300 text-slate-900 focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none'
                : 'bg-white border-slate-200 text-slate-900 hover:border-slate-300 focus:ring-2 focus:ring-brand-100 focus:border-brand-500 outline-none'
          }`}
        />

        {suffix && (
          <span className='absolute right-3.5 text-xs sm:text-sm font-medium text-slate-400 pointer-events-none'>
            {suffix}
          </span>
        )}
      </div>

      {error ? (
        <p className='text-xs text-rose-600 font-medium mt-1.5 animate-in fade-in duration-150'>
          {error}
        </p>
      ) : helperText ? (
        <p className='text-xs text-slate-500 mt-1.5'>{helperText}</p>
      ) : null}
    </div>
  )
}

export default InputField
