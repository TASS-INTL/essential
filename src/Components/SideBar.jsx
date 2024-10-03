import React, { useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom'

import {
	Account,
	Admin,
	Central,
	Chating,
	Devices,
	factorydevices,
	Groups,
	Installers,
	Inventory,
	Monitoring,
	Notification,
	Services,
	ServicesClient,
	SesionLeft,
	Testing,
	Travels,
	Users
} from '../assets/assetsplatform/PrivateRoutes'
import { useAuthProvider } from '../pages/auth/hooks/useAuthProvider'
import { userStore } from '../store/userStore'

export const icons = {
	Account,
	Devices,
	Travels,
	Services,
	Installers,
	Monitoring,
	Chating,
	Notification,
	factorydevices,
	SesionLeft,
	Users,
	Groups,
	ServicesClient,
	Inventory,
	Testing,
	Central,
	Admin
}

export const SideBarComponent = () => {
	const { pathname } = useLocation()
	const { logout } = useAuthProvider()
	const [open, setOpen] = useState(false)
	const [selectButton, setSelectButton] = useState(0)
	const userData = userStore((state) => state.userData)

	return (
		<aside
			id='separator-sidebar'
			className={`${open ? 'md:w-[20%] xl:w-[15%]' : 'w-[4.5rem]'} absolute duration-300 top-0 left-0 h-screen`}
			aria-label='Sidebar'
		>
			<img
				src='../src/assets/img/control.png'
				className={`absolute cursor-pointer -right-3 top-16 w-7 border-primary
           border-2 rounded-full  ${!open && 'rotate-180'}`}
				onClick={() => setOpen(!open)}
			/>
			<div className='h-full px-3 py-4 overflow-y-auto bg-black'>
				<ul className='space-y-2 font-medium'>
					{userData?.modules?.map((menu, index) => (
						<NavLink key={index} to={`${menu.pathName}`}>
							<li
								key={index}
								className={`
                            flex 
                            justify-between
                            p-3 
                            text-gray-900 
                            rounded-lg 
                            dark:text-white 
                            hover:bg-gray-100 
                            dark:hover:bg-gray-700 
                            gap-x-4
                            ${menu.gap ? 'mt-9' : 'mt-2'}
									 ${pathname.includes(menu.pathName) && 'bg-lightWhite'}`}
								onClick={() => {
									menu.title === 'Cerrar sesion' && logout()
									setSelectButton(index)
								}}
							>
								<div className='flex'>
									<img
										src={icons[menu.src]}
										alt='icon'
										className='w-[24px] h-[20px] object-contain cursor-pointer'
									/>
									<span className={`${!open && 'hidden'} origin-left duration-200 ms-3 text-sm`}>
										{menu.name}
									</span>
								</div>
							</li>
						</NavLink>
					))}
					<li
						className={`
                     flex 
                     items-center 
                     p-3  
                     dark:text-white  
                     rounded-lg 
                     cursor-pointer 
                     hover:bg-lightWhite 
                     mt-1 ${selectButton === true && 'bg-lightWhite'} `}
						onClick={logout}
					>
						<img
							src={icons['SesionLeft']}
							alt='icon'
							className='w-[24px] h-[20px] object-contain cursor-pointer'
						/>
						<span className={`${!open && 'hidden'} origin-left duration-200 ms-3 text-sm`}>
							Cerrar sesion
						</span>
					</li>
				</ul>
			</div>
		</aside>
	)
}
