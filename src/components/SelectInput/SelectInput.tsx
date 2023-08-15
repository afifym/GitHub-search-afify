import * as React from "react"

interface Option {
  label: string
  value: string
}

interface SelectInputProps {
  value: string
  onChange: (val: string) => void
  options: Option[]
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const { value, onChange, options } = props

  const handleChange = (e: any) => {
    onChange(e.target.value)
  }

  return (
    <div className="relative after:content-['▼'] after:text-gray-400 after:absolute after:top-1/2 after:right-4 after:-translate-y-1/2 z-10 ">
      <select
        className="input w-full mr-24"
        value={value}
        onChange={handleChange}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
