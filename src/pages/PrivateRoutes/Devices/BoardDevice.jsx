import React from 'react'

import { NavLink } from 'react-router-dom'

export const BoardDevice = ({ dataBody }) => {
	return (
		<div className='relative overflow-x-scrolling overflow-y-scrolling shadow-md sm:rounded-lg'>
			<div className='overflow-scroll'>
				{dataBody !== undefined && dataBody?.length > 0 ? (
					<>
						<table className='w-full text-sm text-left rtl:text-right text-gray-500'>
							<thead className='text-xs text-gray-700 uppercase bg-gray-50'>
								<tr className=''>
									{Object.keys(dataBody[0])?.map((item) => (
										<th key={item} scope='col' className='px-6 py-3'>
											{item}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{dataBody.map((item, index) => (
									<tr key={item._id} className='bg-white border-b  hover:bg-gray-50 '>
										{Object.values(dataBody[index])?.map((itemObj) => (
											<th
												key={itemObj}
												scope='row'
												className='px-6 py-4 font-medium whitespace-nowrap '
											>
												{itemObj}
											</th>
										))}
										<th
											scope='row'
											className='px-6 py-4 font-medium whitespace-nowrap underline text-blue-600 cursor-pointer'
										>
											<NavLink to={`/user/devices-screen/device/${item._id}/general`}>
												ver
											</NavLink>
										</th>
									</tr>
								))}
							</tbody>
						</table>
					</>
				) : (
					<div className='flex justify-center py-9'>
						<h2 className=' text-sm text-red-900'>
							no hay informacion que mostrar ocurrio un error o la informacion de esta tabla esta vacia
						</h2>
					</div>
				)}
			</div>
		</div>
	)
}
