import React from 'react'

export const SelectComponent = ({ register, name, label, arrayOptions, valueId }) => {
	return (
		<div>
			<label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
				{label}
			</label>
			<div className='relative rounded-md shadow-sm'>
				<select
					{...register(name)}
					className='border text-sm rounded-lg  block w-full ps-10 p-2.5  bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-offset-gray-400 '
				>
					{arrayOptions?.map((option) => (
						<option key={valueId ? option._id : option.id} value={valueId ? option._id : option.name}>
							{option.name}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
