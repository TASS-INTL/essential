import { useEffect, useState } from 'react'

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

export function useDrawingManager(showDrawingManager, handleNewData) {
	if (showDrawingManager === undefined) return

	const map = useMap()
	const drawing = useMapsLibrary('drawing')

	const [drawingManager, setDrawingManager] = useState()

	

	useEffect(() => {
		if (!map || !drawing) return
		// https://developers.google.com/maps/documentation/javascript/reference/drawing
		const newDrawingManager = new drawing.DrawingManager({
			map,
			drawingControl: true,
			drawingControlOptions: {
				position: google.maps.ControlPosition.BLOCK_START_INLINE_START,
				drawingModes: [
					google.maps.drawing.OverlayType.MARKER,
					// google.maps.drawing.OverlayType.CIRCLE,
					google.maps.drawing.OverlayType.POLYGON
					// google.maps.drawing.OverlayType.POLYLINE,
					// google.maps.drawing.OverlayType.RECTANGLE
				]
			},
			markerOptions: {
				draggable: true
			},
			circleOptions: {
				editable: true
			},
			polygonOptions: {
				editable: true,
				draggable: true
			},
			rectangleOptions: {
				editable: true,
				draggable: true
			},
			polylineOptions: {
				editable: true,
				draggable: true
			}
		})

		setDrawingManager(newDrawingManager)

		const markerCompleteListener = google.maps.event.addListener(
			newDrawingManager,
			'markercomplete',
			(drawResult) => {
				drawResult._id = crypto.randomUUID()
				const location = {
					lat: drawResult.getPosition().lat(),
					lng: drawResult.getPosition().lng()
				}
				const geoFence = {
					id: crypto.randomUUID(),
					type: 'Marker',
					name: "New Station",
					location: {
						type: "Point",
						coordinates: null
					},
					market: {
						location: {
							type: "Point",
							coordinates: [location.lng, location.lat]
						},
						status: 'create'
					},
					permissions: [],
					info: {
						status: 'created',
						order: 0,
						radius: 0,
						editable: true,
						name_map: "",
						coordinates_center: [location.lng, location.lat]
					},
					select: true 
				};

				handleNewData({
					geofence: geoFence,
					type: 'Marker'
				})

				drawResult.setMap(null)
			})

		const polygonCompleteListener = google.maps.event.addListener(
			newDrawingManager,
			'polygoncomplete',
			(drawResult) => {
				drawResult._id = crypto.randomUUID()
				const events = ['click', 'dragend', 'dragstart', 'mouseup']

				const calculateCentroid = (coords) => {
                    let area = 0;
                    let cx = 0;
                    let cy = 0;
                    
                    for (let i = 0; i < coords.length; i++) {
                        const j = (i + 1) % coords.length;
                        const [xi, yi] = coords[i];
                        const [xj, yj] = coords[j];
                        
                        const factor = (xi * yj - xj * yi);
                        area += factor;
                        cx += (xi + xj) * factor;
                        cy += (yi + yj) * factor;
                    }
                    
                    area /= 2;
                    const f = area * 6;
                    return [cx / f, cy / f];
                };

				const locationCoordinates = []
				drawResult.getPath().forEach((coordinate) => {
					locationCoordinates.push([coordinate.lng(), coordinate.lat()])
				})

				const [centerLng, centerLat] = calculateCentroid(locationCoordinates)
				const geoFence = {
					id: crypto.randomUUID(),
					type: 'Polygon',
					name: "New Station",
					location: {
						type: "Polygon",
						coordinates: [locationCoordinates]
					},
					market: {
						location: {
							type: "Point",
							coordinates: [centerLng, centerLat]
						},
						status: 'none'
					},
					permissions: [],
					info: {
						status: 'created',
						order: 0,
						radius: 0,
						editable: true,
						name_map: "",
						coordinates_center: [ centerLng, centerLat]
					},
					select: true
				};

				handleNewData({
					geofence: geoFence,
					type: 'Polygon'
				})

				drawResult.setMap(null)
			})

		return () => {
			newDrawingManager.setMap(null)
		}
	}, [drawing, map])

	return drawingManager
}
