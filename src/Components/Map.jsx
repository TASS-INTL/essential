import React, { useRef } from 'react'

export const Map = ({ width, height, setMapGlobal, center }) => {
	const mapContainer = useRef(null)

	return <div ref={mapContainer} className={`w-full h-80 bg-black my-3`} />
}
