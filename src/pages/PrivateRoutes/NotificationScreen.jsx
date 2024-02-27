import React, { useContext, useEffect } from 'react'

import { Checkbox, Table } from 'flowbite-react'

import { notificationStore } from '../../store/notificationStore'
import { userStore } from '../../store/userStore'
import { useSocket } from './Hooks/useSocket'

const tableTitle = [
	{
		id: '1',
		title: <Checkbox />
	},
	{
		id: '2',
		title: 'Descripcion'
	},
	{
		id: '3',
		title: 'tipo'
	},
	{
		id: '4',
		title: 'Categoria'
	},
	{
		id: '5',
		title: ''
	}
]

export const NotificationScreen = () => {
	const { socket } = useSocket()
	const { uid, tokenSesion } = userStore((state) => state.userData)
	const arrayNotification = notificationStore((state) => state.arrayNotification)

	const sendReadSocket = (idNotification) => {
		socket?.emit('notification_read', {
			id_user: uid,
			room: tokenSesion,
			id_notification: idNotification
		})
	}

	return (
		<div className='w-full bg-opacity-100'>
			<div className=' w-11/12 m-auto mt-8  rounded-1xl '>
				<div className='flex justify-between px-0 py-4 pt-10'>
					<h4 className=' text-pretty text-2xl'>Notificaciones</h4>
				</div>
				<div className='overflow-x-auto'>
					<Table hoverable>
						<Table.Head>
							{tableTitle.map((item) => (
								<Table.HeadCell key={item.id} className='p-4'>
									{item.title}
								</Table.HeadCell>
							))}
						</Table.Head>
						<Table.Body className='divide-y'>
							{arrayNotification?.map((notification, index) => (
								<Table.Row key={notification._id} className='bg-white '>
									<Table.Cell className='p-4'>
										<Checkbox />
									</Table.Cell>
									<Table.Cell className='whitespace-nowrap font-medium text-gray-900 '>
										{notification.description}
									</Table.Cell>
									<Table.Cell className='whitespace-nowrap font-medium text-gray-900 '>
										{notification.type}
									</Table.Cell>
									<Table.Cell className='whitespace-nowrap font-medium text-gray-900 '>
										{notification.title}
									</Table.Cell>
									<Table.Cell>
										<a
											onClick={() => sendReadSocket(notification._id)}
											href='#'
											className='font-medium text-cyan-600 hover:underline '
										>
											ver
										</a>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table>
				</div>
			</div>
		</div>
	)
}
