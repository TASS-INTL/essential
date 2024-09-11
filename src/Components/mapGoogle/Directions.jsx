import { useEffect, useState } from 'react'

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

export const Directions = ({ origin, destination }) => {
	const map = useMap()
	const routesLibrary = useMapsLibrary('routes')
	const [directionsService, setDirectionsService] = useState()
	const [directionsRenderer, setDirectionsRenderer] = useState()
	const [routes, setRoutes] = useState([])
	const [routeIndex, setRouteIndex] = useState(0)
	const selected = routes[routeIndex]
	const leg = selected?.legs[0]

	// Initialize directions service and renderer
	useEffect(() => {
		if (!routesLibrary || !map) return
		setDirectionsService(new routesLibrary.DirectionsService())
		setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
	}, [routesLibrary, map])

	// Use directions service
	useEffect(() => {
		if (!directionsService || !directionsRenderer) return

		directionsService
			.route({
				origin,
				destination,
				travelMode: google.maps.TravelMode.DRIVING,
				provideRouteAlternatives: true
			})
			.then((response) => {
				console.log('response routes ---> ', response)
				directionsRenderer.setDirections(response)
				setRoutes(response.routes)
			})

		return () => directionsRenderer.setMap(null)
	}, [directionsService, directionsRenderer, origin, destination])

	// Update direction route
	useEffect(() => {
		if (!directionsRenderer) return
		directionsRenderer.setRouteIndex(routeIndex)
	}, [routeIndex, directionsRenderer, origin, destination])

	if (!leg) return null

	return (
		<div className='directions'>
			<h2>{selected.summary}</h2>
			<p>
				Desde: {leg.start_address.split(',')[0]} Hacia: {leg.end_address.split(',')[0]}
			</p>
			<p>Distancia: {leg.distance?.text}</p>
			<p>Duracion: {leg.duration?.text}</p>

			<h2 className='pt-2'>Otras rutas</h2>
			<ul>
				{routes.map((route, index) => (
					<li key={route.summary}>
						* <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
					</li>
				))}
			</ul>
		</div>
	)
}
