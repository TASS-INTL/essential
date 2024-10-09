import React from 'react'

import { Outlet } from 'react-router-dom'

import { Container } from '../../../../Components/Container'

export const DevicesScreen = () => {
	return (
		<Container>
			<Outlet />
		</Container>
	)
}
