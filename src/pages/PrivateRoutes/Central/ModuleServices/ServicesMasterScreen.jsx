import React from 'react'

import { Container } from '@/Components/Container'
import { Outlet } from 'react-router-dom'

export const ServicesMasterScreen = () => {
	return (
		<Container>
			<h4 className='text-pretty text-4xl font-medium pt-6 px-16'>Servicios</h4>
			<Outlet />
		</Container>
	)
}
