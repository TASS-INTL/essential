import React, { useContext, useEffect } from 'react'

import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiNotification3Line } from 'react-icons/ri'

import avatar from '../assets/img/avatar.jpg'
import { SocketContext } from '../pages/PrivateRoutes/sockets/socketProvider'
import { userStore } from '../store/userStore'
import Notification from './Notification'
import UserProfile from './UserProfile'

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
	<TooltipComponent content={title} position='BottomCenter'>
		<button
			type='button'
			onClick={() => customFunc()}
			style={{ color }}
			className='relative text-xl rounded-full p-3 hover:bg-light-gray'
		>
			<span
				style={{ background: dotColor }}
				className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
			/>
			{icon}
		</button>
	</TooltipComponent>
)

const Navbar = () => {
	const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } =
		useContext(SocketContext)
	const userData = userStore((state) => state.userData)

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth)

		window.addEventListener('resize', handleResize)

		handleResize()

		return () => window.removeEventListener('resize', handleResize)
	}, [])

	useEffect(() => {
		if (screenSize <= 900) {
			setActiveMenu(false)
		} else {
			setActiveMenu(true)
		}
	}, [screenSize])

	const handleActiveMenu = () => setActiveMenu(!activeMenu)

	return (
		<div className='flex bg-black justify-end z-20'>
			<div className='flex'>
				<NavButton
					title='Notification'
					dotColor='rgb(254, 201, 15)'
					customFunc={() => handleClick('notification')}
					color={currentColor}
					icon={<RiNotification3Line color='black' />}
				/>
				<TooltipComponent content='Profile' position='BottomCenter'>
					<div
						className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
						onClick={() => handleClick('userProfile')}
					>
						<img className='rounded-full w-8 h-8' src={avatar} alt='user-profile' />
						<p>
							<span className='text-gray-400 font-bold ml-1 text-14'>{userData?.userName}</span>
						</p>
						<MdKeyboardArrowDown className='text-gray-400 text-14' />
					</div>
				</TooltipComponent>

				{isClicked.notification && <Notification />}
				{isClicked.userProfile && <UserProfile />}
				{/* {isClicked.cart && <Cart />}
				{isClicked.chat && <Chat />}
				 */}
			</div>
		</div>
	)
}

export default Navbar
