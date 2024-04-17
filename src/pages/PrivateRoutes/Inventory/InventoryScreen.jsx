import React from 'react'

import { Outlet } from 'react-router-dom'

export const InventoryScreen = () => {
	return (
		<div className='w-full'>
			<div className='w-full max-w-6xl mx-auto'>
				<h4 className='text-pretty text-4xl font-medium pt-5'>Inventario</h4>
				<Outlet context={'esto es una prop pasada'} />
			</div>
		</div>
	)
}
