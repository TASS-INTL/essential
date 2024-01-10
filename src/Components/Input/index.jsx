import React from 'react'

export const Input = ({ label, name, type, value, onChange, placeholder }) => {
	return (
		<div>
			<label htmlFor='price' className='mt-2 block text-sm font-medium leading-6 text-white'>
				{label}
			</label>
			<div className='relative rounded-md shadow-sm'>
				<input
					value={value}
					onChange={(e) => {
						type === 'number' ? onChange(name, e.target.valueAsNumber) : onChange(name, e.target.value)
					}}
					type={type}
					className='block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
					id={name}
					name={name}
					placeholder={placeholder}
				/>
			</div>
		</div>
	)
}
