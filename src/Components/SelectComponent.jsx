import React from 'react'

export const SelectComponent = ({ register, name, label, arrayOptions, required, option }) => {
	return (
		<div>
			<label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 '>
				{label}
			</label>
			<div className='relative rounded-md shadow-sm'>
				<select
					{...register(name, { required })}
					className='border text-sm rounded-lg  block w-full ps-10 p-2.5  bg-white border-gray-600 placeholder-gray-400 text-black focus:ring-offset-gray-400'
				>
					{arrayOptions?.map((item) => (
						<option key={item._id} value={item._id}>
							{item[option]}
						</option>
					))}
				</select>
			</div>
		</div>
	)
}
