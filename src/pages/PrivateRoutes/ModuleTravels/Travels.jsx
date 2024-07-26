import React from 'react'

import { Outlet } from 'react-router-dom'

import { Container } from '../../../Components/Container'

export const Travels = () => {
	return (
		<Container>
			<h4 className='text-pretty text-3xl font-medium pt-5 text-start'>Creacion de Viaje</h4>
			<Outlet />
		</Container>
	)
}
