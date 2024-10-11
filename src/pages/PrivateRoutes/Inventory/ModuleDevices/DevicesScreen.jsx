import { Container } from '@/Components/Container'
import React from 'react'

import { Outlet } from 'react-router-dom'


export const DevicesScreen = () => {
	return (
		<Container>
			<Outlet />
		</Container>
	)
}
