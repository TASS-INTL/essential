import React, { useEffect, useRef, useState } from 'react'

import maplibregl from 'maplibre-gl'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import '@stadiamaps/maplibre-search-box/dist/style.css'
import 'maplibre-gl/dist/maplibre-gl.css'

const apiKey = import.meta.env.VITE_API_KEY_MAP

export const Map = ({ width, height, setMapGlobal }) => {
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

	return <div ref={mapContainer} className={`w-full h-80 bg-black my-3`} />
}
