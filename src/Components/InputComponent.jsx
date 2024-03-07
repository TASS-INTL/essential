import React from 'react'

export const InputComponent = ({ defaultValue, label, register, name, required, maxLength, svg, type }) => {
	return (
		<div>
			<label htmlFor={name} className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
				{label}
			</label>
			<div className='relative mb-1'>
				{svg && (
					<div className='absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none'>
						<img src={svg} alt='icon' className='w-[18px] h-[15px] object-contain cursor-pointer' />
					</div>
				)}
				<input
					type={type}
					{...register(name, { required, maxLength })}
					defaultValue={defaultValue ? defaultValue : ''}
					className='border text-sm rounded-lg  block w-full ps-10 p-2.5  bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-offset-gray-400 '
				/>
			</div>
		</div>
	)
}
