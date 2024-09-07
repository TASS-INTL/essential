import React, { useState } from 'react'

import {
	AdvancedMarker,
	ControlPosition,
	InfoWindow,
	Map,
	MapControl,
	Marker,
	useAdvancedMarkerRef
} from '@vis.gl/react-google-maps'

import { permission } from '../../pages/PrivateRoutes/Routing/ModuleRouting/CreateRouting'
import { Circle } from './Circle'
import { Directions } from './Directions'
import { UndoRedoControl } from './UndoRedoControl'
import { useDrawingManager } from './UseDrawingMager'

const INITIAL_CENTER = { lat: 41.1897, lng: -96.0627 }

export const MapGoogle = ({ UndoRedoControlPermission, dispatch, state, locations, setArrayOptionRoutes }) => {
	const drawingManager = useDrawingManager(UndoRedoControlPermission)

	const [center, setCenter] = React.useState(INITIAL_CENTER)
	const [radius, setRadius] = React.useState(400)

	const changeCenter = (newCenter) => {
		if (!newCenter) return
		setCenter({ lng: newCenter.lng(), lat: newCenter.lat() })
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
					<Directions
						origin={locations.location_start.name}
						destination={locations.location_end.name}
						setArrayOptionRoutes={setArrayOptionRoutes}
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
			</Map>
			{UndoRedoControlPermission && (
				<MapControl position={ControlPosition.TOP_CENTER}>
					<UndoRedoControl drawingManager={drawingManager} dispatch={dispatch} state={state} />
				</MapControl>
			)}
		</>
	)
}

export const MarkerWithInfowindow = ({ position }) => {
	const [infowindowOpen, setInfowindowOpen] = useState(true)
	const [markerRef, marker] = useAdvancedMarkerRef()

	return (
		<>
			<AdvancedMarker
				draggable
				ref={markerRef}
				onClick={() => setInfowindowOpen(true)}
				position={{ lat: position.lat, lng: position.lng }}
				title={'AdvancedMarker that opens an Infowindow when clicked.'}
			/>
			{infowindowOpen && (
				<InfoWindow anchor={marker} maxWidth={400} onCloseClick={() => setInfowindowOpen(false)}>
					<div className='p-2'>
						{permission.map((item) => (
							<div key={item._id} div className='flex justify-center items-center'>
								<div className='p-3'>{item.name_consult}</div>
								<div className='relative inline-block w-11 h-5'>
									<input
										value={item.values.value}
										id={item._id}
										type='checkbox'
										className='peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-slate-800 cursor-pointer transition-colors duration-300'
									/>
									<label
										for={item._id}
										className='absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer'
									></label>
								</div>
							</div>
						))}
					</div>
				</InfoWindow>
			)}
		</>
	)
}
