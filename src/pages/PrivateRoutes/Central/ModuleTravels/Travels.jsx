import React from 'react'

import { Container } from '@/Components/Container'
import { Outlet } from 'react-router-dom'

export const Travels = () => {
	return (
		<Container>
			<h4 className='text-pretty text-3xl font-medium pt-5 text-start'>Creacion de Viaje</h4>
			<Outlet />
		</Container>
	)
}
