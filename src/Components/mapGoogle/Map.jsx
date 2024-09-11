import React, { useState } from 'react'

import { ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps'

import { permission } from '../../pages/PrivateRoutes/Routing/ModuleRouting/CreateRouting'
import { Circle } from './Circle'
import { Directions } from './Directions'
import { InfoWindowComponent } from './InfoWindowComponent'
import { MarkerWithInfowindow } from './MarkerWithInfowindow'
import { UndoRedoControl } from './UndoRedoControl'
import { useDrawingManager } from './UseDrawingMager'

const INITIAL_CENTER = { lat: 41.1897, lng: -96.0627 }

export const MapGoogle = ({ state, dispatch, locations, dataPrintModals, UndoRedoControlPermission }) => {
	const drawingManager = useDrawingManager()

	const [center, setCenter] = useState(INITIAL_CENTER)
	const [radius, setRadius] = useState(400)

	const changeCenter = (newCenter) => {
		if (!newCenter) return
		setCenter({ lng: newCenter.lng(), lat: newCenter.lat() })
	}

	const changeStatePermission = (idPermission) => {
		const position = state.now.findIndex((element) => element._id === idPermission)
		state.now[position].showPermission = false
	}

	return (
		<>
			<Map
				mapId={'bf51a910020fa25a'}
				style={{ width: '95%', margin: 'auto' }}
				defaultCenter={{ lat: 3.8515385, lng: -74.8861476 }}
				defaultZoom={5}
				gestureHandling={'greedy'}
				disableDefaultUI={true}
			>
				{/* Direction for the Route */}
				{locations.location_start.name && locations.location_end.name && (
					<Directions origin={locations.location_start.name} destination={locations.location_end.name} />
				)}
				{/* marker and geofence of the location start */}
				{locations?.location_start?.market?.location?.coordinates[0] && (
					<>
						<MarkerWithInfowindow
							position={{
								lat: locations?.location_start?.market?.location?.coordinates[0],
								lng: locations?.location_start?.market?.location?.coordinates[1]
							}}
						/>
						<Circle
							radius={radius}
							center={{
								lat: locations?.location_start?.market?.location?.coordinates[0],
								lng: locations?.location_start?.market?.location?.coordinates[1]
							}}
							onRadiusChanged={setRadius}
							onCenterChanged={changeCenter}
							strokeColor={'#0c4cb3'}
							strokeOpacity={1}
							strokeWeight={3}
							fillColor={'#3b82f6'}
							fillOpacity={0.3}
							editable
							draggable
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
						/>
						<Circle
							radius={radius}
							center={{
								lat: locations?.location_end?.market?.location?.coordinates[0],
								lng: locations?.location_end?.market?.location?.coordinates[1]
							}}
							onRadiusChanged={setRadius}
							onCenterChanged={changeCenter}
							strokeColor={'#0c4cb3'}
							strokeOpacity={1}
							strokeWeight={3}
							fillColor={'#3b82f6'}
							fillOpacity={0.3}
							editable
							draggable
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
