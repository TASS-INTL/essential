import React, { useContext } from 'react'

import { Link, Outlet } from 'react-router-dom'

import { SocketContextForNameSpace } from '../sockets/socketForNameSpace'
import { SocketContext } from '../sockets/socketProvider'

const BlogPosts = {
	'first-blog-post': {
		title: 'general'
	},
	'second-blog-post': {
		title: 'test'
	},
	'three-blog-post': {
		title: 'events'
	}
}
export const DetailInventoryScreen = () => {
	const { socketForNameSpace } = useContext(SocketContextForNameSpace)

	console.log('entra aca', socketForNameSpace)

	return (
		<div className=' w-full'>
			<div className='w-full max-w-6xl mx-auto'>
				<ul className='flex gap-3'>
					{Object.entries(BlogPosts).map(([slug, { title }]) => (
						<li key={slug}>
							<Link to={`/user/inventory-screen/detail-inventory-screen/${title}`}>
								<h3>{title}</h3>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<Outlet />
		</div>
	)
}
