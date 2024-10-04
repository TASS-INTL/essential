import React from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { LoaderComponent } from '../../../../Components'
import { ErrorComponent } from '../../../../Components/ErrorComponent'
import { arrayTapMonitoring, TapBottons } from '../../../../Components/TapBottons'
import { travelsStore } from '../../../../store/travelsStore'
import { BoardDevice } from '../../Inventory/ModuleDevices/BoardDevice'

export const Eventstravel = () => {
	const location = useLocation()
	const { idTravel } = useParams()

	const arrayTableTravelsEvents = travelsStore((state) => state.arrayTableTravelsEvents)

	// console.log(arrayTableTravelsEvents)

	if (arrayTableTravelsEvents === null) return <LoaderComponent />

	// if (arrayTableTravelsEvents.error) return <ErrorComponent error={arrayTableTravelsEvents.message} />

	return (
		<>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<h2 className='text-normal py-3 pl-5'>Eventos en tiempo real</h2>
			{/* <BoardDevice dataBody={arrayTableTravelsEvents?.results} /> */}
		</>
	)
}
