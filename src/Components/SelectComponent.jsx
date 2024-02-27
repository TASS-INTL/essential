import React from 'react'

export const SelectComponent = ({ name, value, label, handlePersonalData, arrayOptions, valueChange }) => {
	return (
		<div>
			<label htmlFor={value} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
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
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
		</div>
	)
}
