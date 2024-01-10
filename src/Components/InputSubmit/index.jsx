import React from 'react'

export const InputSubmit = ({ text }) => {
	return (
		<input
			className='bg-sky-700 px-4 py-2 rounded-lg text-white hover:bg-sky-800 sm:px-8 sm:py-3'
			type='submit'
			value={text}
		/>
	)
}
