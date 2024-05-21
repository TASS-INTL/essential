import React from 'react'

import { Link } from 'react-router-dom'

export const arrayTapInventory = [
	{ id: 1, title: 'general', name: 'General' },
	{ id: 2, title: 'events', name: 'Eventos' },
	{ id: 4, title: 'test', name: 'Test' }
]

export const arrayTapMonitoring = [
	{ id: 1, title: 'general', name: 'General' },
	{ id: 2, title: 'events', name: 'Eventos' },
	{ id: 3, title: 'monitoring', name: 'Monitoreo' }
]

export const TapBottons = ({ location, idDevice, path, data }) => {
	return (
		<div className='pt-5'>
			{!location.pathname.includes('table') && (
				<ul className='flex gap-3 '>
					{data?.map((item) => (
						<li
							className={`${
								location.pathname.includes(item.title) && 'bg-black text-white'
							} px-4 py-2 rounded-lg`}
							key={item.id}
						>
							<Link to={`/user/${path}/${idDevice}/${item.title}`}>
								<h3>{item.name}</h3>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
