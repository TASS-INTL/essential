import React from 'react'

import { Outlet } from 'react-router-dom'

export const Services = () => {
	return (
		<div className='w-full'>
			<div className='w-full max-w-6xl mx-auto'>
				<h4 className='text-pretty text-4xl font-medium pt-5'>Servicios</h4>
				<Outlet />
			</div>
		</div>
	)
}
