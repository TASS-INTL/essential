import React from 'react'

import { BoardComponent } from '../../Components'
import { notificationStore } from '../../store/notificationStore'
import { tableTitle } from './constants/constants'
import { useSocket } from './Hooks/useSocket'

export const NotificationScreen = () => {
	const arrayNotification = notificationStore((state) => state.arrayNotification)

	const { sendReadSocket } = useSocket()

	return (
		<div className='w-full'>
			<div className='w-full max-w-6xl mx-auto rounded-1xl'>
				<div className='flex justify-between px-0 py-10 pt-10'>
					<h4 className='text-pretty text-4xl font-medium'>Notificaciones</h4>
					<div className='relative'>
						<div className='absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none'>
							<svg
								className='w-5 h-5 text-gray-500 '
								aria-hidden='true'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
									clipRule='evenodd'
								></path>
							</svg>
						</div>
						<input
							type='text'
							id='table-search'
							className='block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
							placeholder='Search for items'
						/>
					</div>
				</div>
				<BoardComponent dataHeader={tableTitle} dataBody={arrayNotification} functionOnClick={sendReadSocket} />
				<div className='py-5 flex justify-center items-center'>
					<nav aria-label='Page navigation example'>
						<ul className='inline-flex -space-x-px text-sm'>
							<li>
								<a
									href='#'
									className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 '
								>
									Previous
								</a>
							</li>
							<li>
								<a
									href='#'
									className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
								>
									1
								</a>
							</li>
							<li>
								<a
									href='#'
									className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
								>
									2
								</a>
							</li>
							<li>
								<a
									href='#'
									aria-current='page'
									className='flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
								>
									3
								</a>
							</li>
							<li>
								<a
									href='#'
									className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
								>
									4
								</a>
							</li>
							<li>
								<a
									href='#'
									className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 '
								>
									5
								</a>
							</li>
							<li>
								<a
									href='#'
									className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 '
								>
									Next
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</div>
	)
}
