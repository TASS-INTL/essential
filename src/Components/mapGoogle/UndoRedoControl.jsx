import React, { useEffect, useReducer, useRef } from 'react'

import { useMap } from '@vis.gl/react-google-maps'

import { DrawingActionKind, isCircle, isMarker, isPolygon, isPolyline, isRectangle } from './types'

// Handle drawing manager events
function useDrawingManagerEvents(drawingManager, overlaysShouldUpdateRef, dispatch) {
	useEffect(() => {
		if (!drawingManager) return

		const eventListeners = []

		const addUpdateListener = (eventName, drawResult) => {
			console.log(eventName, 'eventName')
			const updateListener = google.maps.event.addListener(drawResult.overlay, eventName, () => {
				if (eventName === 'dragstart') {
					overlaysShouldUpdateRef.current = false
				}

				if (eventName === 'dragend') {
					overlaysShouldUpdateRef.current = true
				}

				if (eventName === 'click') {
					console.log('hola mundo')
					console.log(overlaysShouldUpdateRef)
					// overlaysShouldUpdateRef.current = true
				}

				if (overlaysShouldUpdateRef.current) {
					dispatch({ type: DrawingActionKind.UPDATE_OVERLAYS })
				}
			})

			eventListeners.push(updateListener)
		}

		const overlayCompleteListener = google.maps.event.addListener(
			drawingManager,
			'overlaycomplete',
			(drawResult) => {
				switch (drawResult.type) {
					case google.maps.drawing.OverlayType.CIRCLE:
						;['center_changed', 'radius_changed'].forEach((eventName) =>
							addUpdateListener(eventName, drawResult)
						)
						break

					case google.maps.drawing.OverlayType.MARKER:
						;['dragend'].forEach((eventName) => addUpdateListener(eventName, drawResult))

						break

					case google.maps.drawing.OverlayType.POLYGON:
					case google.maps.drawing.OverlayType.POLYLINE:
						;['mouseup', 'click'].forEach((eventName) => addUpdateListener(eventName, drawResult))

					case google.maps.drawing.OverlayType.RECTANGLE:
						;['bounds_changed', 'dragstart', 'dragend'].forEach((eventName) =>
							addUpdateListener(eventName, drawResult)
						)

						break
				}

				dispatch({ type: DrawingActionKind.SET_OVERLAY, payload: drawResult })
			}
		)

		eventListeners.push(overlayCompleteListener)

		return () => {
			eventListeners.forEach((listener) => google.maps.event.removeListener(listener))
		}
	}, [dispatch, drawingManager, overlaysShouldUpdateRef])
}

// Update overlays with the current "snapshot" when the "now" state changes
function useOverlaySnapshots(map, state, overlaysShouldUpdateRef) {
	useEffect(() => {
		if (!map || !state.now) return

		for (const overlay of state.now) {
			overlaysShouldUpdateRef.current = false

			overlay.geometry.setMap(map)

			const { radius, center, position, path, bounds } = overlay.snapshot

			if (isCircle(overlay.geometry)) {
				overlay.geometry.setRadius(radius ?? 0)
				overlay.geometry.setCenter(center ?? null)
			} else if (isMarker(overlay.geometry)) {
				overlay.geometry.setPosition(position)
			} else if (isPolygon(overlay.geometry) || isPolyline(overlay.geometry)) {
				overlay.geometry.setPath(path ?? [])
			} else if (isRectangle(overlay.geometry)) {
				overlay.geometry.setBounds(bounds ?? null)
			}

			overlaysShouldUpdateRef.current = true
		}

		return () => {
			for (const overlay of state.now) {
				overlay.geometry.setMap(null)
			}
		}
	}, [map, overlaysShouldUpdateRef, state.now])
}

export const UndoRedoControl = ({ drawingManager, dispatch, state }) => {
	const map = useMap()

	// We need this ref to prevent infinite loops in certain cases.
	// For example when the radius of circle is set via code (and not by user interaction)
	// the radius_changed event gets triggered again. This would cause an infinite loop.
	// This solution can be improved by comparing old vs. new values. For now we turn
	// off the "updating" when snapshot changes are applied back to the overlays.
	const overlaysShouldUpdateRef = useRef(false)

	useDrawingManagerEvents(drawingManager, overlaysShouldUpdateRef, dispatch)
	useOverlaySnapshots(map, state, overlaysShouldUpdateRef)

	return (
		<div className='mt-1'>
			<button
				onClick={() => dispatch({ type: DrawingActionKind.UNDO })}
				disabled={!state.past.length}
				className='cursor-pointer bg-white opacity-[.5] p-[2px] mr-1'
			>
				<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'>
					<path d='M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z' />
				</svg>
			</button>
			<button
				onClick={() => dispatch({ type: DrawingActionKind.REDO })}
				disabled={!state.future.length}
				className='cursor-pointer bg-white opacity-[.5] p-[2px]'
			>
				<svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 -960 960 960' width='24'>
					<path d='M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z' />
				</svg>
			</button>
		</div>
	)
}
