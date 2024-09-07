import { useEffect, useRef, useState } from 'react'

import { useMapsLibrary } from '@vis.gl/react-google-maps'

export const PlaceAutocompleteClassic = ({ onPlaceSelect, location }) => {
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
			onPlaceSelect({ data: placeAutocomplete.getPlace(), location })
		})
	}, [onPlaceSelect, placeAutocomplete])

	return (
		<div className='autocomplete-container'>
			<input
				className='border text-sm rounded-lg text-black block w-full ps-2 p-2.5 border-gray-600 placeholder-gray-400 focus:ring-offset-gray-400'
				ref={inputRef}
			/>
		</div>
	)
}
