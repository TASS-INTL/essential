import React from 'react'

import { Container } from '@/Components/Container'
import { Outlet } from 'react-router-dom'

export const ServicesClientScreen = () => {
	return (
		<Container>
			<h4 className='text-pretty text-4xl font-medium pt-5 px-16'>Servicios cliente</h4>
			<Outlet />
		</Container>
	)
}
