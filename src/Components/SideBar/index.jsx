import React, { useState } from 'react'

import { Link, useLocation } from 'react-router-dom'

import { useAuthProvider } from '../../auth/useAuthProvider'
import { userStore } from '../../store/userStore'

const Menus = [
	{ title: 'Inicio', src: 'Chart_fill', to: 'dashboard', pathname: '/user/users' },
	{ title: 'Chat', src: 'Chat', to: 'chat' },
	{ title: 'Usuarios', src: 'User', to: 'Users' },
	{ title: 'Dispositivos', src: 'Calendar', to: 'devices' },
	{ title: 'Archivos', src: 'Folder', gap: true, to: '' },
	{ title: 'Busqueda', src: 'Search', to: '' },
	{ title: 'Metricas', src: 'Chart', to: '' },
	{ title: 'Cuenta', src: 'User', gap: true, to: 'account' },
	{ title: 'Configuracion', src: 'Setting', to: 'settings' },
	{ title: 'Cerrar sesion', src: 'User' }
]

export const SideBar = () => {
	const [open, setOpen] = useState(false)
	const userData = userStore((state) => state.userData)
	const { logout } = useAuthProvider()
	const [selectButton, setSelectButton] = useState(0)
	const { pathname } = useLocation()

	return (
		<div className='flex'>
			<div className={` ${open ? 'w-72' : 'w-20 '} bg-dark-purple h-screen p-5  pt-8 relative duration-300`}>
				<img
					src='../src/assets/img/control.png'
					className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && 'rotate-180'}`}
					onClick={() => setOpen(!open)}
				/>
				<div className='flex gap-x-4 items-center'>
					<img
						src='../src/assets/img/logo.png'
						className={`cursor-pointer duration-500 ${open && 'rotate-[360deg]'}`}
					/>
					<h1 className={`text-white origin-left font-medium text-xl duration-200 ${!open && 'scale-0'}`}>
						{userData.name}
					</h1>
				</div>
				<ul className='pt-6'>
					{userData?.modules?.map((Menu, index) => (
						<Link key={index} to={`/user/${Menu.to}`}>
							<li
								key={index}
								className={`flex  
                            rounded-md p-2 cursor-pointer 
                            hover:bg-light-white 
                            text-gray-300 
                            text-sm 
                            items-center 
                            gap-x-4 
                            ${Menu.gap ? 'mt-9' : 'mt-2'} 
                            ${Menu.pathName === pathname && 'bg-light-white'} `}
								onClick={() => {
									Menu.title === 'Cerrar sesion' && logout()
									setSelectButton(index)
								}}
							>
								<img src={`../src/assets/img/${Menus[index].src}.png`} />
								<span className={`${!open && 'hidden'} origin-left duration-200`}>{Menu.title}</span>
							</li>
						</Link>
					))}
					<li
						className={`flex  
                            rounded-md p-2 cursor-pointer 
                            hover:bg-light-white 
                            text-gray-300 
                            text-sm 
                            items-center 
                            gap-x-4  mt-9 } 
                            ${selectButton === true && 'bg-light-white'} `}
						onClick={logout}
					>
						<img src={`../src/assets/img/${Menus[1].src}.png`} />
						<span className={`${!open && 'hidden'} origin-left duration-200`}>cerrar sesion</span>
					</li>
				</ul>
			</div>
		</div>
	)
}
