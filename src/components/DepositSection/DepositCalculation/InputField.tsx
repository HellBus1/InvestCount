interface InputFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  error?: string
  type: string
  min?: number
  disabled?: boolean | false
}

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  type,
  min,
  disabled
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
    />
    {error && <p className='text-red-600 text-xs fieldset-label mt-3'>{error}</p>}
  </fieldset>
)

export default InputField
