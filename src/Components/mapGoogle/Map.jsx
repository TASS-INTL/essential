import {  ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps'
import { MapHandler } from './MapHandler'
import { UndoRedoControl } from './UndoRedoControl'
import { useDrawingManager } from './UseDrawingMager'

export const MapGoogle = ({ state, dispatch, selectedPlace, UndoRedoControlPermission, children }) => {
	const drawingManager = useDrawingManager()

	return (
		<>
			<MapHandler place={selectedPlace} />
			<Map
				style={{ width: '95%', margin: 'auto' }}
				defaultCenter={{ lat: 3.8515385, lng: -74.8861476 }}
				defaultZoom={6}
				gestureHandling={'greedy'}
				disableDefaultUI={true}
			>
				{children}
			</Map>
			{UndoRedoControlPermission && (
				<MapControl position={ControlPosition.TOP_CENTER}>
					<UndoRedoControl drawingManager={drawingManager} dispatch={dispatch} state={state} />
				</MapControl>
			)}
		</>
	)
}
