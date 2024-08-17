import React from 'react'

import { Outlet } from 'react-router-dom'

import { Container } from '../../../../Components/Container'

export const DevicesScreen = () => {
	return (
		<Container>
			<h4 className='text-pretty text-4xl font-medium pt-5'>Dispositivos</h4>
			<Outlet />
		</Container>
	)
}
