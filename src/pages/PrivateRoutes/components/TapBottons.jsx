import React from 'react'

import { Link } from 'react-router-dom'

const arrayTap = [
	{ id: 1, title: 'general' },
	{ id: 2, title: 'test' },
	{ id: 3, title: 'events' },
	{ id: 4, title: 'travels' }
]

export const TapBottons = ({ location, idDevice }) => {
	return (
		<div className='pt-5'>
			{!location.pathname.includes('table') && (
				<ul className='flex gap-3 '>
					{arrayTap?.map((item) => (
						<li
							className={`${location.pathname.includes(item.title) && 'bg-slate-400 p-1'} p-1`}
							key={item.id}
						>
							<Link to={`/user/inventory-screen/device/${idDevice}/${item.title}`}>
								<h3>{item.title}</h3>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
