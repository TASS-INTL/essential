import { Container } from '@/Components/Container'
import React from 'react'

import { Outlet } from 'react-router-dom'


export const DevicesScreen = () => {
	return (
		<div className='relative flex flex-col w-full h-full'>
			<Outlet />
		</div>
	)
}
