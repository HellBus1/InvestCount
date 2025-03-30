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
  <div className='mb-4'>
    <label className='label'>
      <span className='label-text text-charter-blue-600 font-bold'>{label}</span>
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className='input input-bordered w-full rounded'
      placeholder={placeholder}
      min={min}
      disabled={disabled}
    />
    {error && <div className='text-red-600 text-xs fieldset-label'>{error}</div>}
  </div>
)

export default InputField
