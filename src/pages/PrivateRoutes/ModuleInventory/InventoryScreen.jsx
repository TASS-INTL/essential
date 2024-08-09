import React from 'react'

import { NavLink, Outlet } from 'react-router-dom'

import { padlockClose } from '../../../assets/assetsplatform'
import { Container } from '../../../Components/Container'
import { userStore } from '../../../store/userStore'

export const InventoryScreen = () => {
	const { modules } = userStore((state) => state.userData)

	const { submodules } = modules.find((item) => item.name === 'Inventory')

	console.log(submodules, 'modules inventory')

	return (
		<Container>
			<h1 className=' text-center text-3xl font-normal mt-12'>Inventario</h1>

			<div className='flex justify-center items-center'>
				{submodules.map((item) => (
					<NavLink
						to={`${item.pathName}`}
						className='card bg-gray-500 p-2 flex flex-col items-center justify-center hover:bg-white transition-opacity px-7 rounded-lg mt-10'
					>
						<img src={padlockClose} alt='' />
						<span className=' pt-4'>Modulo {item.name_consult}</span>
					</NavLink>
				))}
			</div>
			{/* <Outlet /> */}
		</Container>
	)
}
