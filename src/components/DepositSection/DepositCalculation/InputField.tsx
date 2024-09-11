interface InputFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  error?: string
  type: string
  min?: number
}

const InputField = ({ label, value, onChange, placeholder, error, type, min }: InputFieldProps) => (
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
    />
    {error && <div className='text-red-600 text-xs'>{error}</div>}
  </div>
)

export default InputField
