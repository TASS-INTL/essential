import React from 'react'

import { Link } from 'react-router-dom'

export const arrayTapInventory = [
	{ _id: 1, title: 'general', name: 'General' },
	{ _id: 2, title: 'events', name: 'Eventos' },
	{ _id: 4, title: 'test', name: 'Test' }
]

export const arrayTapMonitoring = [
	{ _id: 1, title: 'general', name: 'General' },
	{ _id: 2, title: 'events', name: 'Eventos' },
	{ _id: 3, title: 'monitoring', name: 'Monitoreo' },
	{ _id: 4, title: 'reports', name: 'Reportes' }
]

export const TapBottons = ({ location, idDevice, path, data }) => {
	return (
		<>
			{!location.pathname.includes('table') && (
				<ul className='flex gap-2'>
					{data?.map((item) => (
						<Link key={item._id} to={`/user/${path}/${idDevice}/${item.title}`}>
							<li
								className={`${
									location.pathname.includes(item.title) && 'bg-black text-white'
								} px-3 py-1 rounded-lg text-[0.85rem]`}
								key={item.id}
							>
								<h3>{item.name}</h3>
							</li>
						</Link>
					))}
				</ul>
			)}
		</>
	)
}
