import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from 'react'

import { GoogleMapsContext, latLngEquals } from '@vis.gl/react-google-maps'

const useCircle = (props) => {
	const {
		onClick,
		onDrag,
		onDragStart,
		onDragEnd,
		onMouseOver,
		onMouseOut,
		onRadiusChanged,
		onCenterChanged,
		radius,
		center,
		...circleOptions
	} = props
	// This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)
	const callbacks = useRef({})
	Object.assign(callbacks.current, {
		onClick,
		onDrag,
		onDragStart,
		onDragEnd,
		onMouseOver,
		onMouseOut,
		onRadiusChanged,
		onCenterChanged
	})

	const circle = useRef(new google.maps.Circle()).current
	// update circleOptions (note the dependencies aren't properly checked
	// here, we just assume that setOptions is smart enough to not waste a
	// lot of time updating values that didn't change)
	circle.setOptions(circleOptions)

	useEffect(() => {
		if (!center) return
		if (!latLngEquals(center, circle.getCenter())) circle.setCenter(center)
	}, [center])

	useEffect(() => {
		if (radius === undefined || radius === null) return
		if (radius !== circle.getRadius()) circle.setRadius(radius)
	}, [radius])

	const map = useContext(GoogleMapsContext)?.map

	// create circle instance and add to the map once the map is available
	useEffect(() => {
		if (!map) {
			if (map === undefined) console.error('<Circle> has to be inside a Map component.')

			return
		}

		circle.setMap(map)

		return () => {
			circle.setMap(null)
		}
	}, [map])

	// attach and re-attach event-handlers when any of the properties change
	useEffect(() => {
		if (!circle) return

		// Add event listeners
		const googleMapsEvents = google.maps.event
		;[
			['click', 'onClick'],
			['drag', 'onDrag'],
			['dragstart', 'onDragStart'],
			['dragend', 'onDragEnd'],
			['mouseover', 'onMouseOver'],
			['mouseout', 'onMouseOut']
		].forEach(([eventName, eventCallback]) => {
			googleMapsEvents.addListener(circle, eventName, (e) => {
				const callback = callbacks.current[eventCallback]
				if (callback) callback(e)
			})
		})

		googleMapsEvents.addListener(circle, 'radius_changed', () => {
			const newRadius = circle.getRadius()
			callbacks.current.onRadiusChanged?.(newRadius)
		})

		googleMapsEvents.addListener(circle, 'center_changed', () => {
			const newCenter = circle.getCenter()
			callbacks.current.onCenterChanged?.(newCenter)
		})

		return () => {
			googleMapsEvents.clearInstanceListeners(circle)
		}
	}, [circle])

	return circle
}

export const Circle = forwardRef((props, ref) => {
	const circle = useCircle(props)

	useImperativeHandle(ref, () => circle)

	return null
})
