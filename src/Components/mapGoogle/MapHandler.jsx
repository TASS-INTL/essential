import { useEffect } from 'react'

import { useMap } from '@vis.gl/react-google-maps'

export const MapHandler = ({ place }) => {
	const map = useMap()

	useEffect(() => {
		if (!map || !place) return

		if (place.geometry?.viewport) {
			map.fitBounds(place.geometry?.viewport)
		}
	}, [map, place])

	return null
}
