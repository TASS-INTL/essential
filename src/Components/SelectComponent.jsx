import React from 'react'

export const SelectComponent = ({ name, value, label, handlePersonalData, arrayOptions, valueChange }) => {
	return (
		<>
			<label className='mt-2 block text-sm font-medium leading-6 text-white' htmlFor=''>
				{label}
			</label>
			<div className='relative rounded-md shadow-sm'>
				<select
					key={arrayOptions.name}
					onChange={(event) => {
						handlePersonalData(valueChange, event.target.value)
					}}
					value={value}
					name={name}
					className='block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
				>
					{arrayOptions.map((option) => {
						return (
							<option key={option._id} value={option.name}>
								{option.name}
							</option>
						)
					})}
				</select>
			</div>
		</>
	)
}
