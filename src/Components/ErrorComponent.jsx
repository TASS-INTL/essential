import React from 'react'

export const ErrorComponent = ({ error }) => {
	return (
		<div className='w-full h-full flex items-center justify-center'>
			<div className=' flex flex-col items-center'>
				<h1 className='font-extrabold'>
					Lo sentimos estamos teniendo problemas comunicate con los desarrolladores
				</h1>
				<span className='text-center'>Mensaje de error: {error}</span>
			</div>
		</div>
	)
}
