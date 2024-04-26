import React, { useEffect, useRef, useState } from 'react'

import maplibregl from 'maplibre-gl'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@stadiamaps/maplibre-search-box/dist/style.css'
import 'maplibre-gl/dist/maplibre-gl.css'

const apiKey = import.meta.env.VITE_API_KEY_MAP

export const Map = ({ setMapGlobal }) => {
	const region = 'sa-east-1'
	const map = useRef(null)
	const [zoom] = useState(10)
	const mapContainer = useRef(null)
	const mapName = 'explore.map.Here'

	useEffect(() => {
		const mapControl = (map.current = new maplibregl.Map({
			container: mapContainer.current,
			style: `https://maps.geo.${region}.amazonaws.com/maps/v0/maps/${mapName}/style-descriptor?key=${apiKey}`,
			center: [-75.60855, 6.13824],
			zoom: zoom,
			hash: true
		})
			.addControl(new maplibregl.NavigationControl(), 'top-right')
			.addControl(new maplibregl.ScaleControl()))

		setMapGlobal(mapControl)
	}, [])

	return <div ref={mapContainer} className='w-3/3 h-96 bg-black' />
}

// setDataCoordinates({
// 	...dataCoordinates,
// 	place_start: {
// 		common_name: Value.properties.name,
// 		lat: Value.geometry.coordinates[0],
// 		lng: Value.geometry.coordinates[1],
// 		country: Value.properties.country,
// 		county: Value.properties.county,
// 		region: Value.properties.region,
// 		type: Value.geometry.type,
// 		geo: {
// 			properties: { radius },
// 			type: circle.geometry.type,
// 			coordinates: circle.geometry.coordinates
// 		}
// 	}
// })
