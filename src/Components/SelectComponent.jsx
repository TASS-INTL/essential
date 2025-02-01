import React from 'react'

export const SelectComponent = ({ register, name, label, arrayOptions, required, option, onChange }) => {
	const handleChange = (e) => {
		if (onChange) {
			onChange(e)
		}
	}

	return (
		<div className='w-full'>
			<label htmlFor={name} className='block mb-1 text-sm font-medium text-gray-900 '>
				{label}
			</label>
			<div className='relative rounded-md shadow-sm'>
				<select
					{...register(name, { required })}
					onChange={handleChange}
					className='border text-sm rounded-lg block w-full ps-1 p-2.5 bg-white border-gray-600 placeholder-gray-400 text-black focus:ring-offset-gray-400'
				>
					<option value="1">Seleccione...</option>
					{arrayOptions?.map((item) => (
						<option key={item._id} value={item._id}>
							{item[option] || 'Seleccione...'}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
