import React from 'react'

export const Container = ({ children }) => {
	return (
		<div className='w-full h-screen'>
			<div className='w-full h-screen max-w-6xl mx-auto'>{children}</div>
		</div>
	)
}
