import React from 'react'

export const Container = ({ children }) => {
	return (
		<div className='w-[85%] h-screen overflow-y-scroll'>
			<div className='w-full max-w-6xl mx-auto'>{children}</div>
		</div>
	)
}
