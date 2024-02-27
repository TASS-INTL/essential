import React from 'react'

export const InputSubmitComponent = ({ text }) => {
	return (
		<input
			className='bg-white px-4 py-2 rounded-lg text-black hover:bg-slate-200 sm:px-8 sm:py-3'
			type='submit'
			value={text}
		/>
	)
}
