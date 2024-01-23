import React from 'react'

export const Modal = ({ children, closeModal, textModal }) => {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-25  backdrop-blur-sm flex items-center justify-center'>
			<div className='bg-white p-2 rounded w-3/5'>
				<button
					onClick={closeModal}
					className='bg-dark-purple shadow-lg shadow-dark-purple p2-4 px-5 rounded-sm text-white'
				>
					cerrar
				</button>
				<h1 className='font-semibold text-center text-xl text-gray-700'>{textModal}</h1>
				<p className='text-center text-gray-700 mb-5'>Ingrese todos los campos</p>
				{children}
			</div>
		</div>
	)
}
