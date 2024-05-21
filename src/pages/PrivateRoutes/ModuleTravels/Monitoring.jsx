import React, { useEffect, useState } from 'react'

import { useLocation, useParams } from 'react-router-dom'

import { travelsStore } from '../../../store/travelsStore'
import { TapBottons } from '../components'
import { Map } from '../components/Map'
import { arrayTapMonitoring } from '../components/TapBottons'
import { useMap } from '../Hooks/useMap'

export const Monitoring = () => {
	const location = useLocation()
	const { idTravel } = useParams()
	// const arrayTableTravelsMonitoring = travelsStore((state) => state.arrayTableTravelsMonitoring)
	const realTimeCoordinates = travelsStore((state) => state.realTimeCoordinates)
	const { createMarkerMap, setMapGlobal, mapGlobal, deleteMarkerMap } = useMap()
	const [markers, setMarkers] = useState(null)

	useEffect(() => {
		if (realTimeCoordinates?.loc_clean?.lat) {
			if (markers) {
				deleteMarkerMap(markers)
				setMarkers(null)
			}
			if (mapGlobal) {
				const marker = createMarkerMap(
					realTimeCoordinates.loc_clean.lng,
					realTimeCoordinates.loc_clean.lat,
					mapGlobal,
					false
				)
				setMarkers(marker)
			}
		}
	}, [realTimeCoordinates.loc_clean.lat, realTimeCoordinates.loc_clean.lng, mapGlobal])

	console.log(realTimeCoordinates, 'realTimeCoordinates')

	return (
		<div>
			<TapBottons
				location={location}
				idDevice={idTravel}
				path='travels-screen/travel'
				data={arrayTapMonitoring}
			/>
			<h1 className=' text-center py-4 text-3xl'>Monitoreo en tiempo real</h1>
			<Map width='100' height='100' setMapGlobal={setMapGlobal} />
		</div>
	)
}
