import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { arrayTapMonitoring, TapBottons } from '../../components/TapBottons'
import { BoardDevice } from '../../Inventory/ModuleDevices/BoardDevice'

export const Eventstravel = () => {
	const location = useLocation()
	const { idTravel } = useParams()

	const arrayTableTravelsEvents = travelsStore((state) => state.arrayTableTravelsEvents)

	return (
		<div>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<h2 className='text-normal py-3 pl-5'>Eventos en tiempo real</h2>
			<BoardDevice dataBody={arrayTableTravelsEvents?.results} />
		</div>
	)
}
