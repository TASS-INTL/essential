import React from 'react'

import { Container } from '@/Components/Container'
import { Outlet } from 'react-router-dom'

export const TravelsScreen = () => {
	return (
		<div className='relative flex flex-col w-full h-full'>
			<Outlet />
		</div>
	)
}
