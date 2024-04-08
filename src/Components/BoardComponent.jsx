import React from 'react'

import { NavLink } from 'react-router-dom'

export const BoardComponent = ({ dataHeader, dataBody, functionOnClick }) => {
	return (
		<div className='relative overflow-x-scrolling overflow-y-scrolling shadow-md sm:rounded-lg'>
			<div className='overflow-scroll'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50'>
						<tr className=''>
							{dataHeader?.map((item) => (
								<th key={item.id} scope='col' className='px-6 py-3'>
									{item.title}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{dataBody?.length === 0 ? (
							<tr className=''>
								<td>
									<span>Lo sentimos, no se han encontrado resultados</span>
								</td>
							</tr>
						) : (
							dataBody?.map((item) => (
								<tr key={item._id} className='bg-white border-b  hover:bg-gray-50 '>
									<td className='w-4 p-4'>
										<div className='flex items-center'>
											<input
												id='checkbox-table-search-1'
												type='checkbox'
												className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 '
											/>
											<label htmlFor='checkbox-table-search-1' className='sr-only'>
												checkbox
											</label>
										</div>
									</td>
									<th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap '>
										{item.description || item.did}
									</th>
									<td className='px-6 py-4'>{item.nickname}</td>
									<td className='px-6 py-4'>{item.type || item.lote}</td>
									<td className='px-6 py-4'>{item.title || item.status}</td>
									<td className='px-6 py-4'>
										<NavLink
											to='/user/inventory-screen/general'
											className='font-medium text-blue-600  hover:underline cursor-pointer'
										>
											ver
										</NavLink>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
