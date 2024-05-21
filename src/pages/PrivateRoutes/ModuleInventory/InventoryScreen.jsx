import React from 'react'

import { Outlet } from 'react-router-dom'

import { Container } from '../../../Components/Container'

export const InventoryScreen = () => {
	return (
		<Container>
			<h4 className='text-pretty text-4xl font-medium'>Inventario</h4>
			<Outlet />
		</Container>
	)
}
