import React from 'react'

import { Container } from '@/Components/Container'
import { Outlet } from 'react-router-dom'

export const TravelsScreen = () => {
	return (
		<Container>
			<Outlet />
		</Container>
	)
}
