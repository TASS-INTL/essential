import React from 'react'

export const RemarksInput = ({ text, register, required, nameRegister }) => {
	return (
		<div className='flex flex-col mt-3'>
			<label htmlFor='story' className='py-1'>
				{text}
			</label>
			<textarea
				className='border border-black p-3 rounded-lg'
				{...register(nameRegister, {
					required,
					validate: {
						pattern: (value) => !/[!]/.test(value)
					}
				})}
			/>
		</div>
	)
}
