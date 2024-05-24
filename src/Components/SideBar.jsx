import React, { useState } from 'react'

import { NavLink, useLocation } from 'react-router-dom'

import {
	Account,
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
import { useAuthProvider } from '../auth/useAuthProvider'
import { usersStore } from '../store/usersStore'
import { userStore } from '../store/userStore'

const icons = {
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
	Testing
}

export const SideBarComponent = () => {
	const { pathname } = useLocation()
	const { logout } = useAuthProvider()
	const [open, setOpen] = useState(true)
	const userData = userStore((state) => state.userData)
	const notification = usersStore((state) => state.notification)
	const [selectButton, setSelectButton] = useState(0)

	return (
		<aside
			id='separator-sidebar'
			className={`${
				open ? ' md:w-[20%] xl:w-[15%]' : 'w-20'
			} relative duration-300 top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0`}
			aria-label='Sidebar'
		>
			<img
				src='../src/assets/img/control.png'
				className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
				onClick={() => setOpen(!open)}
			/>
			<div className='h-full px-3 py-4 overflow-y-auto bg-black border-r-2 border-gray'>
				<div className=''>
					<h1 className='text-white gap-x-4 px-2'>{userData.userName}</h1>
				</div>
				<ul className='space-y-2 font-medium'>
					{userData?.modules?.map((menu, index) => (
						<NavLink key={index} to={`${menu.pathName}`}>
							<li
								key={index}
								className={`
                            flex 
                            justify-between
                            p-2 
                            text-gray-900 
                            rounded-lg 
                            dark:text-white 
                            hover:bg-gray-100 
                            dark:hover:bg-gray-700 
                            gap-x-4
                            ${menu.gap ? 'mt-9' : 'mt-2'}
									 ${pathname.includes(menu.pathName) && 'bg-light-white'}`}
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
										{menu.title}
									</span>
								</div>
								<div className='flex items-end'>
									{menu.name === 'Notifications' && notification && <>{`(${notification})`}</>}
								</div>
							</li>
						</NavLink>
					))}
					<li
						className={`
                     flex 
                     items-center 
                     p-2  
                     dark:text-white  
                     rounded-lg 
                     cursor-pointer 
                     hover:bg-light-white 
                     mt-1 ${selectButton === true && 'bg-light-white'} `}
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
