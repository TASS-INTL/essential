import React, { useState } from 'react'

import { BoardComponent, PaginationComponent } from '../../../Components'
import { notificationStore } from '../../../store/notificationStore'
import { tableTitle } from '../constants/constants'

export const TableNotification = () => {
	const arrayNotification = notificationStore((state) => state.arrayNotification)
	const [pageSelected, setPageSelected] = useState(1)
	const [array, setArray] = useState([1, 2, 3, 4, 5])

	console.log(arrayNotification)

	return (
		<div>
			<div className='w-full flex flex-row justify-end'>
				<div className='relative '>
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
			<BoardComponent
				dataHeader={tableTitle}
				dataBody={arrayNotification.notifications.result}
				to={`/user/notifications-screen/${1233345363}`}
			/>
			<div className='py-5 flex justify-center items-center'>
				<PaginationComponent
					pageSelected={pageSelected}
					dataPagination={arrayNotification.notifications.info}
					setPageSelected={setPageSelected}
					setArray={setArray}
					array={array}
				/>
			</div>
		</div>
	)
}
