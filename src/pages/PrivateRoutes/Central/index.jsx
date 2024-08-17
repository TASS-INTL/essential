import React from 'react'

import { NavLink } from 'react-router-dom'

import { Container } from '../../../Components/Container'
import { icons } from '../../../Components/SideBar'
import { userStore } from '../../../store/userStore'

export const CentralScreen = () => {
	const { modules } = userStore((state) => state.userData)
	const { submodules } = modules.find((item) => item.name === 'Central')

	return (
		<Container>
			<h1 className='text-center text-3xl font-normal mt-12'>Central</h1>
			<div className='flex justify-center items-center gap-8'>
				{submodules.map((item) => (
					<NavLink
						to={`${item.pathName}`}
						className='card bg-gray-500 p-2 flex flex-col items-center justify-center hover:bg-gray-300 transition-opacity px-7 rounded-lg mt-10'
					>
						<img src={icons[item.src]} alt='icon module' />
						<span className=' pt-4'>Modulo {item.name_consult}</span>
					</NavLink>
				))}
			</div>
		</Container>
	)
}
