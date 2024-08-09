import React from 'react'

export const ModalComponent = ({ children, textModal, handleClose }) => {
	return (
		<div className='fixed inset-0 bg-black bg-opacity-25  backdrop-blur-sm flex items-center justify-center'>
			<div className=' bg-white p-2 rounded w-3/5'>
				<button onClick={() => handleClose(false)} className='bg-black rounded-lg px-6 py-1  text-white'>
					cerrar
				</button>
				<h1 className='font-semibold text-center py-3 text-xl text-gray-700 overflow-y-scroll'>{textModal}</h1>
				{children}
			</div>
		</div>
	)
}
