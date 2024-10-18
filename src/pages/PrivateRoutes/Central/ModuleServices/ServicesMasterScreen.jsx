import React from 'react'

import { Container } from '@/Components/Container'
import { Outlet } from 'react-router-dom'

export const ServicesMasterScreen = () => {
	return (
		<Container className='w-full'>
			<h4 className='text-pretty text-4xl font-medium pt-1 px-10'>Services</h4>
			<Outlet />
		</Container>
	)
}
