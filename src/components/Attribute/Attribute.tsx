import React from "react"

interface AttributeProps {
  label: string
  value: string
}

const Attribute: React.FC<AttributeProps> = (props) => {
  const { label, value } = props

  return (
    <div className="flex gap-x-4">
      <div className="text-gray-500">{label}</div>
      <div>{value}</div>
    </div>
  )
}

export default Attribute
