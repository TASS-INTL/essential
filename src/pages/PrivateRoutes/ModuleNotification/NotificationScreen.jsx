import React from 'react'

import { Outlet } from 'react-router-dom'

export const NotificationScreen = () => {
	return (
		<div className='w-full'>
			<div className='w-full max-w-6xl mx-auto rounded-1xl'>
				<div className='flex justify-between px-0 py-10 pt-10'>
					<h4 className='text-pretty text-4xl font-medium'>Notificaciones</h4>
				</div>
				<Outlet />
			</div>
		</div>
	)
}
