import { useEffect, useState } from 'react'

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

export const Directions = ({ origin, destination, setDataDirections, onRouteChange }) => {
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
        
        if (!directionsService) {
            setDirectionsService(new routesLibrary.DirectionsService())
        }
        if (!directionsRenderer) {
            const renderer = new routesLibrary.DirectionsRenderer({ 
                draggable: true, 
                map,
                suppressMarkers: true
            })
            setDirectionsRenderer(renderer)

            // Agregar listener para cambios en la ruta
            renderer.addListener('directions_changed', () => {
				
                const result = renderer.getDirections();
				console.log("RENDERER LISTENER :", result)
                if (result) {
                    const route = result.routes[0];
                    const leg = route.legs[0];
                    
                    setDataDirections(route);
                    
                    if (onRouteChange) {
                        onRouteChange({
                            origin: {
                                lat: leg.start_location.lat(),
                                lng: leg.start_location.lng()
                            },
                            destination: {
                                lat: leg.end_location.lat(),
                                lng: leg.end_location.lng()
                            }
                        });
                    }
                }
            });

			// renderer.addListen')
        }
    }, [routesLibrary, map])

    // Use directions service
    useEffect(() => {
        if (!directionsService || !directionsRenderer) return

        const fetchRoute = async () => {
            try {
                const response = await directionsService.route({
                    origin,
                    destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                    provideRouteAlternatives: true
                })
				console.log("REsponse direction service: ", response)
                directionsRenderer.setDirections(response)
                setRoutes(response.routes)
            } catch (error) {
                console.error("Error fetching directions:", error)
            }
        }

        fetchRoute()
    }, [directionsService, directionsRenderer, origin.lat, destination.lng])

    return null
}
