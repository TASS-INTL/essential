import React, { useEffect, useState } from 'react'

import { ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps'

import { permission } from '../../pages/PrivateRoutes/constants/constants'
import { Directions } from './Directions'
import { InfoWindowComponent } from './InfoWindowComponent'
import { MarkerWithInfowindow } from './MarkerWithInfowindow'
import { UndoRedoControl } from './UndoRedoControl'
import { useDrawingManager } from './UseDrawingMager'

export const MapGoogle = ({
	state,
	dispatch,
	locations,
	dataPrintModals,
	UndoRedoControlPermission,
	setDataDirections,
	addPlaces
}) => {
	const drawingManager = useDrawingManager()

	const changeStatePermission = (idPermission) => {
		const position = state.now.findIndex((element) => element._id === idPermission)
		state.now[position].showPermission = false
	}

	return (
		<>
			<Map
				style={{ width: '95%', margin: 'auto' }}
				defaultCenter={{ lat: 3.8515385, lng: -74.8861476 }}
				defaultZoom={5}
				gestureHandling={'greedy'}
				disableDefaultUI={true}
			>
				{/* Direction for the Route */}
				{locations.location_start.name && locations.location_end.name && (
					<Directions
						origin={locations.location_start.name}
						destination={locations.location_end.name}
						setDataDirections={setDataDirections}
					/>
				)}
				{/* marker and geofence of the location start */}
				{locations?.location_start?.market?.location?.coordinates[0] && (
					<>
						<MarkerWithInfowindow
							position={{
								lat: locations?.location_start?.market?.location?.coordinates[0],
								lng: locations?.location_start?.market?.location?.coordinates[1]
							}}
							location='location_start'
							addPlaces={addPlaces}
						/>
					</>
				)}
				{/* marker and geofence of the location end */}
				{locations?.location_end?.market?.location?.coordinates[1] && (
					<>
						<MarkerWithInfowindow
							position={{
								lat: locations?.location_end?.market?.location?.coordinates[0],
								lng: locations?.location_end?.market?.location?.coordinates[1]
							}}
							location='location_end'
							addPlaces={addPlaces}
						/>
					</>
				)}
				{/* permissions modal in the geofences */}
				{dataPrintModals && (
					<>
						{dataPrintModals?.map((item) => (
							<>
								{item.showPermission && (
									<InfoWindowComponent
										key={item._id}
										maxWidth={200}
										onCloseClick={() => changeStatePermission(item._id)}
										permission={permission}
										position={{
											lat: item.snapshot.path[0].lat(),
											lng: item.snapshot.path[0].lng()
										}}
									/>
								)}
							</>
						))}
					</>
				)}
			</Map>
			{UndoRedoControlPermission && (
				<MapControl position={ControlPosition.TOP_CENTER}>
					<UndoRedoControl drawingManager={drawingManager} dispatch={dispatch} state={state} />
				</MapControl>
			)}
		</>
	)
}
