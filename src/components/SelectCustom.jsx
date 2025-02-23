import React from 'react';
import Select from 'react-select';

const SelectCustom = ({ defaultValue, multi, name, options, setTags }) => {
	const handleChange = (selectedOptions) => {
		if (multi) {
			// If it's a multi select, we can map over the selected options
			const selectedValues = selectedOptions
				? selectedOptions.map((option) => option.value)
				: [];
			setTags(selectedValues);
		} else {
			// If it's a single select, we can just get the value of the selected option
			const selectedValue = selectedOptions ? selectedOptions.value : null;
			setTags(selectedValue);
		}
	};

	return (
		<Select
			defaultValue={defaultValue}
			isMulti={multi}
			isSearchable={false}
			name={name}
			options={options}
			className='basic-multi-select shadow border focus:outline-none rounded-none focus:border-0 border-black'
			classNamePrefix='select'
			onChange={handleChange}
		/>
	);
};

export default SelectCustom;
