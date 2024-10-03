import { forwardRef, useEffect } from 'react'

import { ControlPosition, Map, MapControl, useMap } from '@vis.gl/react-google-maps'

import { Directions } from './Directions'
import { InfoWindowComponent } from './InfoWindowComponent'
import { MarkerWithInfowindow } from './MarkerWithInfowindow'
import { Polygon } from './Polygon'
import { Polyline } from './Polyline'
import { UndoRedoControl } from './UndoRedoControl'
import { useDrawingManager } from './UseDrawingMager'

export const MapGoogle = ({
	state,
	dispatch,
	locations,
	dataRoute,
	withDirecton,
	permissionsData,
	dataPrintModals,
	setDataDirections,
	handleChangePermissions,
	UndoRedoControlPermission,
	handleChangeMarkerDraggable
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
				defaultZoom={6}
				gestureHandling={'greedy'}
				disableDefaultUI={true}
			>
				{withDirecton && (
					<>
						{/* Direction for the Route */}
						{locations?.location_start?.name && locations?.location_end?.name && (
							<Directions
								origin={locations.location_start.name}
								destination={locations.location_end.name}
								setDataDirections={setDataDirections}
							/>
						)}
					</>
				)}
				{/* marker and geofence of the location start */}
				{locations?.location_start?.market?.location?.coordinates[0] && (
					<MarkerWithInfowindow
						position={{
							lat: locations?.location_start?.market?.location?.coordinates[1],
							lng: locations?.location_start?.market?.location?.coordinates[0]
						}}
						location='location_start'
						permissionsData={permissionsData}
						handleChangePermissions={handleChangePermissions}
						handleChangeMarkerDraggable={handleChangeMarkerDraggable}
					/>
				)}
				{/* marker and geofence of the location end */}
				{locations?.location_end?.market?.location?.coordinates[1] && (
					<MarkerWithInfowindow
						position={{
							lat: locations?.location_end?.market?.location?.coordinates[1],
							lng: locations?.location_end?.market?.location?.coordinates[0]
						}}
						location='location_end'
						permissionsData={permissionsData}
						handleChangePermissions={handleChangePermissions}
						handleChangeMarkerDraggable={handleChangeMarkerDraggable}
					/>
				)}
				{/* permissions modal in the geofences */}
				{dataPrintModals && (
					<>
						{dataPrintModals?.map((item) => (
							<>
								{item.showPermission && (
									<InfoWindowComponent
										key={item._id}
										maxWidth={400}
										onCloseClick={() => changeStatePermission(item._id)}
										permission={permissionsData?.data}
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
				{dataRoute?.data?.coordinatesroute && (
					<Polyline strokeWeight={7} strokeColor={'#8a2be2'} pathArray={dataRoute?.data?.coordinatesroute} />
				)}
				{dataRoute?.data?.stations?.length > 0 && (
					<>
						{dataRoute?.data?.stations.map((item) => (
							<Polygon key={item._id} strokeWeight={1.5} pathsArray={item?.location?.coordinates[0]} />
						))}
					</>
				)}
				{dataRoute?.data?.location_start && (
					<Polygon strokeWeight={1.5} pathsArray={dataRoute?.data?.location_start?.location.coordinates[0]} />
				)}
				{dataRoute?.data?.location_end && (
					<Polygon strokeWeight={1.5} pathsArray={dataRoute?.data?.location_end?.location.coordinates[0]} />
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
