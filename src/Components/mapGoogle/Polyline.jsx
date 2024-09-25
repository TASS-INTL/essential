import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react'

import { GoogleMapsContext, useMapsLibrary } from '@vis.gl/react-google-maps'

function usePolyline(props) {
	const { onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut, pathArray, ...polylineOptions } = props
	// This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)
	const callbacks = useRef({})
	Object.assign(callbacks.current, {
		onClick,
		onDrag,
		onDragStart,
		onDragEnd,
		onMouseOver,
		onMouseOut
	})

	const geometryLibrary = useMapsLibrary('geometry')

	const polyline = useRef(new google.maps.Polyline()).current

	// update PolylineOptions (note the dependencies aren't properly checked
	// here, we just assume that setOptions is smart enough to not waste a
	// lot of time updating values that didn't change)
	useMemo(() => {
		polyline.setOptions(polylineOptions)
	}, [polyline, polylineOptions])

	// Obtenemos la referencia del mapa
	const map = useContext(GoogleMapsContext)?.map

	// update the path with the pathArray
	useMemo(() => {
		if (!pathArray || !geometryLibrary) return
		const path = pathArray.map((coord) => ({ lat: coord[0], lng: coord[1] }))
		polyline.setPath(path)
	}, [polyline, pathArray, geometryLibrary])

	// create polyline instance and add to the map once the map is available
	useEffect(() => {
		if (!map) {
			if (map === undefined) console.error('<Polyline> has to be inside a Map component.')

			return
		}

		polyline.setMap(map)

		return () => {
			polyline.setMap(null)
		}
	}, [map])

	// attach and re-attach event-handlers when any of the properties change
	useEffect(() => {
		if (!polyline) return

		// Add event listeners
		const gme = google.maps.event
		;[
			['click', 'onClick'],
			['drag', 'onDrag'],
			['dragstart', 'onDragStart'],
			['dragend', 'onDragEnd'],
			['mouseover', 'onMouseOver'],
			['mouseout', 'onMouseOut']
		].forEach(([eventName, eventCallback]) => {
			gme.addListener(polyline, eventName, (e) => {
				const callback = callbacks.current[eventCallback]
				if (callback) callback(e)
			})
		})

		return () => {
			gme.clearInstanceListeners(polyline)
		}
	}, [polyline])

	return polyline
}

export const Polyline = forwardRef((props, ref) => {
	const polyline = usePolyline(props)

	useImperativeHandle(ref, () => polyline, [])

	return null
})
