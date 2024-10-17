import React from 'react'

import { ErrorComponent, LoaderComponent, TitleWithLive } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { arrayTapMonitoring, TapBottons } from '@/Components/TapBottons'
import { travelsStore } from '@/store/travelsStore'
import { useLocation, useParams } from 'react-router-dom'

export const EventsTravel = () => {
	const location = useLocation()
	const { idTravel } = useParams()

	const arrayTableTravelsEvents = travelsStore((state) => state.arrayTableTravelsEvents)

	if (arrayTableTravelsEvents === null) return <LoaderComponent />

	if (arrayTableTravelsEvents?.error) return <ErrorComponent error={arrayTableTravelsEvents.message} />

	console.log(arrayTableTravelsEvents)

	return (
		<div className='absolute top-0 right-0 h-full bg-white w-3/5'>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<div className='h-[81%] '>
				<TitleWithLive title='EVENTOS' inLive />
				<BoardDevice dataBody={arrayTableTravelsEvents?.results} />
			</div>
		</div>
	)
}
