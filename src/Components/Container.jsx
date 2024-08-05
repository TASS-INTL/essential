import React from 'react'

export const Container = ({ children }) => {
	return (
		<div className='w-[95%] h-screen overflow-y-scroll '>
			<div className='w-full max-w-7xl mx-auto'>{children}</div>
		</div>
	)
}
