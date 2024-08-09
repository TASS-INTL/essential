import React from 'react'

export const InputComponent = ({ defaultValue, label, register, name, required, maxLength, svg, type, color }) => {
	return (
		<div>
			<label
				htmlFor={name}
				className={`block mb-1 text-sm font-medium ${color ? 'text-gray-900' : 'text-white'}   `}
			>
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
					className={`border text-sm rounded-lg  block w-full ps-10 p-2.5 ${
						color ? ' bg-white text-black' : 'bg-black text-white'
					}  border-gray-600 placeholder-gray-400 focus:ring-offset-gray-400`}
				/>
			</div>
		</div>
	)
}
