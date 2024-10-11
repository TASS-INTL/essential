import { Container } from '@/Components/Container'
import React from 'react'

import { Outlet } from 'react-router-dom'

export const ServicesClientScreen = () => {
	return (
		<Container>
			<h4 className='text-pretty text-4xl font-medium pt-5'>ServicesClient</h4>
			<Outlet />
		</Container>
	)
}
