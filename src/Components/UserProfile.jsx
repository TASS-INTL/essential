import React, { useContext } from 'react'

import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider'
import { userStore } from '@/store/userStore'
import { BsCurrencyDollar, BsShield } from 'react-icons/bs'
import { FiCreditCard } from 'react-icons/fi'
import { MdOutlineCancel } from 'react-icons/md'

// import avatar from '../data/avatar.jpg'
import { SocketContext } from '../pages/PrivateRoutes/sockets/socketProvider'
import Button from './Button'

export const userProfileData = [
	{
		icon: <BsCurrencyDollar />,
		title: 'My Profile',
		desc: 'Account Settings',
		iconColor: '#03C9D7',
		iconBg: '#E5FAFB'
	},
	{
		icon: <BsShield />,
		title: 'My Inbox',
		desc: 'Messages & Emails',
		iconColor: 'rgb(0, 194, 146)',
		iconBg: 'rgb(235, 250, 242)'
	},
	{
		icon: <FiCreditCard />,
		title: 'My Tasks',
		desc: 'To-do and Daily Tasks',
		iconColor: 'rgb(255, 244, 229)',
		iconBg: 'rgb(254, 201, 15)'
	}
]

const UserProfile = () => {
	const { currentColor } = useContext(SocketContext)
	const userData = userStore((state) => state.userData)
	const { logout } = useAuthProvider()

	console.log('userData-->', userData)

	return (
		<div className='nav-item absolute right-1 top-16 bg-[#42464D] p-8 rounded-lg w-96 z-20'>
			<div className='flex justify-between items-center'>
				<p className='font-semibold text-lg text-white '>Perfil de Usuario</p>
				<Button
					icon={<MdOutlineCancel />}
					color='rgb(153, 171, 180)'
					bgHoverColor='light-gray'
					size='2xl'
					borderRadius='50%'
				/>
			</div>
			<div className='flex gap-5 items-center mt-6 border-color border-b-1 pb-6'>
				{/* <img className='rounded-full h-24 w-24' src={avatar} alt='user-profile' /> */}
				<div>
					<p className='font-semibold text-xl text-white '> {userData.name} </p>
					<p className='text-white text-sm '> {userData.typeUser} </p>
					<p className='text-white text-sm font-semibold '> {userData.email} </p>
				</div>
			</div>
			<div>
				{userProfileData.map((item, index) => (
					<div
						key={index}
						className='flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]'
					>
						<button
							type='button'
							style={{ color: item.iconColor, backgroundColor: item.iconBg }}
							className='text-white text-xl rounded-lg p-3 hover:bg-light-gray'
						>
							{item.icon}
						</button>

						<div>
							<p className='font-semibold text-white'>{item.title}</p>
							<p className='text-white text-sm '> {item.desc} </p>
						</div>
					</div>
				))}
			</div>
			<div className='mt-5'>
				<button
					type='button'
					onClick={logout}
					style={{ backgroundColor: currentColor, color: 'white', borderRadius: '10px' }}
					className='p-3 w-full hover:drop-shadow-xl'
				>
					Cerrar sesion
				</button>
			</div>
		</div>
	)
}

export default UserProfile
