import React, { useEffect, useRef, useState } from 'react'

import {
	AdvancedMarker,
	ControlPosition,
	Map,
	MapControl,
	Pin,
	useMap,
	useMapsLibrary
} from '@vis.gl/react-google-maps'

import { UndoRedoControl } from './UndoRedoControl'
import { useDrawingManager } from './UseDrawingMager'

export const MapGoogle = ({ UndoRedoControlPermission, dispatch, state }) => {
	const drawingManager = useDrawingManager(UndoRedoControlPermission)

	return (
		<>
			<Map
				style={{ width: '40%', height: '70vh' }}
				defaultCenter={{ lat: 22.54992, lng: 0 }}
				defaultZoom={3}
				gestureHandling={'greedy'}
				disableDefaultUI={true}
				onClick={() => {}}
			>
				{/* <AdvancedMarker position={{ lat: 29.5, lng: -81.2 }}>
					<Pin background={'#0f9d58'} borderColor={'#006425'} glyphColor={'#60d98f'} />
				</AdvancedMarker> */}
			</Map>

			{UndoRedoControlPermission && (
				<MapControl position={ControlPosition.TOP_CENTER}>
					<UndoRedoControl drawingManager={drawingManager} dispatch={dispatch} state={state} />
				</MapControl>
			)}
		</>
	)
}

export const PlaceAutocompleteClassic = ({ onPlaceSelect }) => {
	const [placeAutocomplete, setPlaceAutocomplete] = useState(null)
	const inputRef = useRef(null)
	const places = useMapsLibrary('places')

	useEffect(() => {
		if (!places || !inputRef.current) return

		const options = {
			fields: ['geometry', 'name', 'formatted_address']
		}

		setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options))
	}, [places])

	useEffect(() => {
		if (!placeAutocomplete) return

		placeAutocomplete.addListener('place_changed', () => {
			onPlaceSelect(placeAutocomplete.getPlace())
		})
	}, [onPlaceSelect, placeAutocomplete])

	return (
		<div className='autocomplete-container'>
			<input ref={inputRef} className='w-[12rem] h-6 mt-2 pl-5' />
		</div>
	)
}
