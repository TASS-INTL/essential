import { useReducer } from 'react'

import { DrawingActionKind, isCircle, isMarker, isPolygon, isRectangle } from '@/Components/mapGoogle/types'

const reducer = (state, action) => {
	switch (action.type) {
		case DrawingActionKind.UPDATE_OVERLAYS: {
			const overlays = state.now.map((overlay) => {
				const snapshot = {}
				const { geometry } = overlay

				if (isCircle(geometry)) {
					snapshot.center = geometry.getCenter()?.toJSON()
					snapshot.radius = geometry.getRadius()
				} else if (isMarker(geometry)) {
					snapshot.position = geometry.getPosition()?.toJSON()
				} else if (isPolygon(geometry) || isPolyline(geometry)) {
					snapshot.path = geometry.getPath()?.getArray()
				} else if (isRectangle(geometry)) {
					snapshot.bounds = geometry.getBounds()?.toJSON()
				}

				return {
					...overlay,
					snapshot
				}
			})

			return {
				now: [...overlays],
				past: [...state.past, state.now],
				future: []
			}
		}
		case DrawingActionKind.SET_OVERLAY: {
			const { overlay, _id } = action.payload
			const snapshot = {}
			if (isCircle(overlay)) {
				snapshot.center = overlay.getCenter()?.toJSON()
				snapshot.radius = overlay.getRadius()
			} else if (isMarker(overlay)) {
				snapshot.position = overlay.getPosition()?.toJSON()
			} else if (isPolygon(overlay) || isPolyline(overlay)) {
				snapshot.path = overlay.getPath()?.getArray()
			} else if (isRectangle(overlay)) {
				snapshot.bounds = overlay.getBounds()?.toJSON()
			}
			const objChange = state.now.find((item) => item._id === _id)
			if (objChange) {
				const position = state.now.findIndex((element) => element._id === objChange?._id)
				objChange.showPermission = true
				state.now.splice(position, 1, objChange)

				return {
					past: [...state.past, state.now],
					now: [...state.now],
					future: []
				}
			} else {
				return {
					past: [...state.past, state.now],
					now: [
						...state.now,
						{
							type: action.payload.type,
							geometry: action.payload.overlay,
							snapshot,
							showPermission: true,
							_id
						}
					],
					future: []
				}
			}
		}
		case DrawingActionKind.UNDO: {
			const last = state.past.slice(-1)[0]

			if (!last) return state

			return {
				past: [...state.past].slice(0, -1),
				now: last,
				future: state.now ? [...state.future, state.now] : state.future
			}
		}
		case DrawingActionKind.REDO: {
			const next = state.future.slice(-1)[0]
			if (!next) return state
			return {
				past: state.now ? [...state.past, state.now] : state.past,
				now: next,
				future: [...state.future].slice(0, -1)
			}
		}
	}
}

export const useMapLogic = () => {
	const [state, dispatch] = useReducer(reducer, {
		past: [],
		now: [],
		future: []
	})

	return { state, dispatch }
}
