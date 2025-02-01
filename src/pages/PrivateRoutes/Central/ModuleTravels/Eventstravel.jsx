import React from 'react'

import { ErrorComponent, LoaderComponent, TitleWithLive } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { travelsStore } from '@/store/travelsStore'
import { useLocation, useParams } from 'react-router-dom'
import { travelInfoStore } from '@/store/travels/travelInfoStore'

export const EventsTravel = () => {
	const location = useLocation()
	const { idTravel } = useParams()

	const eventsTravelInfo = travelInfoStore((state) => state.events)
	console.log("EventsTravelInfo: ", eventsTravelInfo)

	// if (arrayTableTravelsEvents === null) return <LoaderComponent />

	// if (arrayTableTravelsEvents?.error) return <ErrorComponent error={arrayTableTravelsEvents.message} />

	return (
		<div className='bg-white p-3 pt-6 min-w-[500px]'>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			{/* Translado el componente de loader con un if  */}
			
			<div className='h-[81%]'>
				<TitleWithLive title='EVENTOS' inLive />
				{ eventsTravelInfo === null ? <LoaderComponent /> : <BoardDevice dataBody={eventsTravelInfo?.data.results} /> }
				{/* { arrayTableTravelsEvents?.error ? <ErrorComponent error={arrayTableTravelsEvents.message} /> : null }  */}
				{/* <BoardDevice dataBody={arrayTableTravelsEvents?.results} /> */}
			</div>
		</div>
	)
}
