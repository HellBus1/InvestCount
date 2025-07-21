interface InputFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  error?: string
  type: string
  min?: number
  disabled?: boolean | false
  required?: boolean
}

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  type,
  min,
  disabled,
  required = false
}: InputFieldProps) => (
  <fieldset className='mb-4'>
    <legend className='text-charter-blue-600 font-bold fieldset-legend mb-2'>{label}</legend>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className='input input-bordered w-full rounded'
      placeholder={placeholder}
      min={min}
      disabled={disabled}
      required={required}
    />
    <p
      className={`text-xs fieldset-label mt-3 transition-all duration-200 ${
        error ? 'text-red-600 opacity-100' : 'opacity-0'
      }`}
      aria-live='polite'
    >
      {error || '‎'}
    </p>
  </fieldset>
)

export default InputField
