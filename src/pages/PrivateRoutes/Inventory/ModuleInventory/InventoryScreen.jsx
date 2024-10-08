import React from 'react'

import { Container } from '@/Components/Container'
import { NavLink } from 'react-router-dom'

import { padlockClose } from '../../../../assets/assetsplatform'
import { userStore } from '../../../../store/userStore'

export const InventoryScreen = () => {
	const { modules } = userStore((state) => state.userData)

	const { submodules } = modules.find((item) => item.name === 'Inventory')

	return (
		<Container>
			<h1 className=' text-center text-3xl font-normal mt-12'>Inventario</h1>
			<div className='flex justify-center items-center'>
				{submodules.map((item) => (
					<NavLink
						key={item._id}
						to={`${item.pathName}`}
						className='card bg-gray-500 p-2 flex flex-col items-center justify-center hover:bg-white transition-opacity px-7 rounded-lg mt-10'
					>
						<img src={padlockClose} alt='moduleImage' />
						<span className=' pt-4'>Modulo {item.name_consult}</span>
					</NavLink>
				))}
			</div>
		</Container>
	)
}
