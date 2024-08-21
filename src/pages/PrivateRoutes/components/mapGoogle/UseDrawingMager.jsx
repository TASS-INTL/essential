import { useEffect, useState } from 'react'

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps'

export function useDrawingManager(flagActivate) {
	if (!flagActivate) return
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
					google.maps.drawing.OverlayType.CIRCLE,
					google.maps.drawing.OverlayType.POLYGON,
					google.maps.drawing.OverlayType.POLYLINE,
					google.maps.drawing.OverlayType.RECTANGLE
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

		return () => {
			newDrawingManager.setMap(null)
		}
	}, [drawing, map])

	return drawingManager
}
