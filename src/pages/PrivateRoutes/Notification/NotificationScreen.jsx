import React from 'react'

import { Outlet } from 'react-router-dom'

import { BoardComponent } from '../../../Components'
import { notificationStore } from '../../../store/notificationStore'
import { tableTitle } from '../constants/constants'
import { useSocket } from '../Hooks/useSocket'

export const NotificationScreen = () => {
	const arrayNotification = notificationStore((state) => state.arrayNotification)

	const { sendReadSocket } = useSocket()

	console.log(arrayNotification)

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
