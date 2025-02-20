import React from 'react'
import Select from 'react-select';




const SelectCustom = ({defaultValue,multi,name,options}) => {
  return (
    <Select
    defaultValue={defaultValue}
    isMulti={multi}
    name={name}
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
  />
  )
}

export default SelectCustom
