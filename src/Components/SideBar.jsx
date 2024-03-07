import React, { useEffect, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useAuthProvider } from '../auth/useAuthProvider'
import { usersStore } from '../store/usersStore'
import { userStore } from '../store/userStore'

export const SideBarComponent = () => {
	const { pathname } = useLocation()
	const { logout } = useAuthProvider()
	const [open, setOpen] = useState(true)
	const userData = userStore((state) => state.userData)
	const notification = usersStore((state) => state.notification)
	const [selectButton, setSelectButton] = useState(0)

	return (
		<div className='flex'>
			<aside
				id='separator-sidebar'
				className={`${
					open ? 'w-72' : 'w-20 '
				} relative duration-300  top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0`}
				aria-label='Sidebar'
			>
				<img
					src='../src/assets/img/control.png'
					className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
					onClick={() => setOpen(!open)}
				/>
				<div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
					<ul className='space-y-2 font-medium'>
						{userData?.modules?.map((menu, index) => (
							<Link key={index} to={`${menu.pathName}`}>
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
                             px-2
                            ${menu.gap ? 'mt-9' : 'mt-2'}
									 ${menu.pathName === pathname && 'bg-light-white'}`}
									onClick={() => {
										menu.title === 'Cerrar sesion' && logout()
										setSelectButton(index)
									}}
								>
									<div className='flex'>
										<svg
											className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
											aria-hidden='true'
											xmlns='http://www.w3.org/2000/svg'
											fill='currentColor'
											viewBox='0 0 22 21'
										>
											<path d='M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z' />
											<path d='M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z' />
										</svg>
										<span className={`${!open && 'hidden'} origin-left duration-200 ms-3`}>
											{menu.title}
										</span>
									</div>
									<div className='flex items-end'>
										{menu.name === 'Notifications' && notification && <>{`(${notification})`}</>}
									</div>
								</li>
							</Link>
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
                     gap-x-4  
                     mt-2 ${selectButton === true && 'bg-light-white'} `}
							onClick={logout}
						>
							<svg
								className=' w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
								aria-hidden='true'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 22 21'
							>
								<path
									stroke='currentColor'
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3'
								/>
							</svg>
							<span className={`${!open && 'hidden'} origin-left duration-200 ms-3`}>Cerrar sesion</span>
						</li>
					</ul>
				</div>
			</aside>
		</div>
	)
}
