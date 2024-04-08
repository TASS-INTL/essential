import React, { useContext, useState } from 'react'

import { Link, Outlet, useLocation } from 'react-router-dom'

import { SocketContextForNameSpace } from '../sockets/socketForNameSpace'

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
export const InventoryScreen = () => {
	const location = useLocation()

	return (
		<div className='w-full'>
			<div className='w-full max-w-6xl mx-auto'>
				<h4 className='text-pretty text-4xl font-medium pt-5'>Inventario</h4>
				{!location.pathname.includes('table') && (
					<ul className='flex gap-3'>
						{Object.entries(BlogPosts).map(([slug, { title }]) => (
							<li key={slug}>
								<Link to={`/user/inventory-screen/${title}`}>
									<h3>{title}</h3>
								</Link>
							</li>
						))}
					</ul>
				)}
				<Outlet />
			</div>
		</div>
	)
}
