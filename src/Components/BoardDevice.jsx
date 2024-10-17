import React from 'react'

import { NavLink } from 'react-router-dom'

import { NoData } from '.'

export const BoardDevice = ({ dataBody, to }) => {
	if (dataBody?.length === 0) return <NoData />

	return (
		<div className='overflow-x-scrolling overflow-y-scrolling shadow-md sm:rounded-lg w-full '>
			<div className='overflow-scroll'>
				<table className='w-full text-sm text-left rtl:text-right text-gray-500'>
					<thead className='text-[0.8rem] text-gray-700 uppercase bg-gray-50'>
						<tr className=''>
							{Object.keys(dataBody[0])?.map((item) => (
								<th key={item} scope='col' className='px-6 py-2'>
									{item}
								</th>
							))}
							<th></th>
						</tr>
					</thead>
					<tbody>
						{dataBody.map((item, index) => (
							<>
								<tr key={item._id} className='bg-white border-b hover:bg-gray-100 '>
									{Object.values(dataBody[index])?.map((itemObj, i) => (
										<th
											key={i}
											scope='row'
											className='px-6 py-2 font-medium whitespace-nowrap text-[0.7rem]'
										>
											{itemObj}
										</th>
									))}
									<th
										scope='row'
										className='px-6 py-4 font-medium whitespace-nowrap underline text-blue-600 cursor-pointer'
									>
										<NavLink to={`/user/${to}/${item._id}/general`}>Ver</NavLink>
									</th>
								</tr>
							</>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
