import React from 'react'

export const InputSubmitComponent = ({ text, color }) => {
	return (
		<input
			className={`${
				color ? 'bg-white text-black' : 'bg-black text-white'
			} px-4 py-2 rounded-lg  hover:bg-slate-200 sm:px-8 sm:py-3`}
			type='submit'
			value={text}
		/>
	)
}
