import React from 'react'

import { ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps'

import { Directions } from './Directions'
import { UndoRedoControl } from './UndoRedoControl'
import { useDrawingManager } from './UseDrawingMager'

export const MapGoogle = ({ UndoRedoControlPermission, dispatch, state, locations }) => {
	const drawingManager = useDrawingManager(UndoRedoControlPermission)
	return (
		<>
			<Map
				style={{ width: '95%', margin: 'auto' }}
				defaultCenter={{ lat: 22.54992, lng: 0 }}
				defaultZoom={3}
				gestureHandling={'greedy'}
				disableDefaultUI={true}
			>
				{locations.location_start.formatted_address && locations.location_end.formatted_address && (
					<Directions
						origin={locations.location_start.formatted_address}
						destination={locations.location_end.formatted_address}
					/>
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
