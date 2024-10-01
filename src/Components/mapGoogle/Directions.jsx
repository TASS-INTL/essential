import { useEffect, useState } from 'react'

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

export const Directions = ({ origin, destination, setDataDirections }) => {
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
		setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ draggable: true, map }))
	}, [routesLibrary, map, origin, destination])

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

	useEffect(() => {
		setDataDirections(selected)
	}, [selected])

	useEffect(() => {
		if (!directionsRenderer) return
		google.maps.event.addListener(directionsRenderer, 'directions_changed', () => {
			const modifiedRoute = directionsRenderer.getDirections()
			setDataDirections(modifiedRoute.routes[0])
		})
	}, [directionsRenderer])

	if (!leg) return null

	return <></>
}
