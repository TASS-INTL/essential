import React from 'react'

import { useLocation, useParams } from 'react-router-dom'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'


export const Monitoring = () => {
	const location = useLocation()
	const { idTravel } = useParams()

	return (
		<>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<h1 className=' text-center py-4 text-3xl'>Monitoreo en tiempo real</h1>
			{/* <Map
				width='100'
				height='100'
				setMapGlobal={setMapGlobal}
				center={[realTimeCoordinates?.loc_clean?.lng, realTimeCoordinates?.loc_clean?.lat]}
			/> */}
			{/* <table>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50'>
					<tr className=''>
						{tableTitleInventory?.map((item) => (
							<th key={item.id} scope='col' className='px-6 py-3'>
								{item.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{arrayTableTravelsMonitoring?.results?.map((item) => (
						<tr key={item._id} className='bg-white border-b  hover:bg-gray-50 '>
							<th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
								{item.did}
							</th>
							<td className='px-6 py-4'>{item.mid}</td>
							<td className='px-6 py-4'>{item.time_received}</td>
							<td className='px-6 py-4'>{item.time}</td>
							<td className='px-6 py-4'>{item?.loc_clean?.lng}</td>
							<td className='px-6 py-4'>{item?.loc_clean?.lat}</td>
						</tr>
					))}
				</tbody>
			</table> */}
		</>
	)
}
