import { ControlPosition, Map, MapControl } from '@vis.gl/react-google-maps'

import { MapHandler } from './MapHandler'
import { UndoRedoControl } from './UndoRedoControl'
import { useDrawingManager } from './UseDrawingMager'

export const MapGoogle = ({ state, dispatch, selectedPlace, showDrawingManager, children }) => {
	const drawingManager = useDrawingManager(showDrawingManager)

	return (
		<>
			<MapHandler place={selectedPlace} />
			<Map
				style={{ width: '40%', height: '100%' }}
				defaultCenter={{ lat: 3.8515385, lng: -74.8861476 }}
				defaultZoom={6}
				gestureHandling={'greedy'}
				disableDefaultUI={true}
			>
				{children}
			</Map>
			{!!showDrawingManager && (
				<MapControl position={ControlPosition.TOP_CENTER}>
					<UndoRedoControl drawingManager={drawingManager} dispatch={dispatch} state={state} />
				</MapControl>
			)}
		</>
	)
}
