import React from 'react'

import { Outlet } from 'react-router-dom'

import { Container } from '../../../Components/Container'

export const Services = () => {
	return (
		<Container className='w-full'>
			<h4 className='text-pretty text-4xl font-medium pt-5'>Services</h4>
			<Outlet />
		</Container>
	)
}
