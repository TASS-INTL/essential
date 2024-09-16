import { useReducer, useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import api from '../../../../../Api/api'
import { METHODS_API } from '../../../../../Api/constantsApi'
import {
	DrawingActionKind,
	isCircle,
	isMarker,
	isPolygon,
	isPolyline,
	isRectangle
} from '../../../../../Components/mapGoogle/types'
import { calculateCircle } from '../../../../../helpers/routes'
import { showToast } from '../../../../../helpers/toast'
import { queryClient } from '../../../../../routes/AppRouter'
import { initialDataLocation, permission } from '../../../constants/constants'

const reducer = (state, action) => {
	switch (action.type) {
		// This action is called whenever anything changes on any overlay.
		// We then take a snapshot of the relevant values of each overlay and
		// save them as the new "now". The old "now" is added to the "past" stack
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

		// This action is called when a new overlay is added to the map.
		// We then take a snapshot of the relevant values of the new overlay and
		// add it to the "now" state. The old "now" is added to the "past" stack
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

		// This action is called when the undo button is clicked.
		// Get the top item from the "past" stack and set it as the new "now".
		// Add the old "now" to the "future" stack to enable redo functionality
		case DrawingActionKind.UNDO: {
			const last = state.past.slice(-1)[0]

			if (!last) return state

			return {
				past: [...state.past].slice(0, -1),
				now: last,
				future: state.now ? [...state.future, state.now] : state.future
			}
		}

		// This action is called when the redo button is clicked.
		// Get the top item from the "future" stack and set it as the new "now".
		// Add the old "now" to the "past" stack to enable undo functionality
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

const routing = {
	name_routing: '',
	location_start: {
		// Geocerca del punto de inicio
		location: {
			type: 'Polygon',
			coordinates: [
				[
					[100.0, 0.0],
					[101.0, 0.0],
					[101.0, 1.0],
					[100.0, 1.0],
					[100.0, 0.0]
				]
			]
		},
		// Permisos del punto de inicio
		permissions: permission,
		// Nombre del punto del inicio
		name: '',
		// Marker del punto de inicio
		market: {
			location: {
				type: 'Point',
				coordinates: [100.0, 0.0]
			},
			status: 'create'
		}
	},
	location_end: {
		// Geocerca del punto de inicio
		location: {
			type: 'Polygon',
			coordinates: [
				[
					[100.0, 0.0],
					[101.0, 0.0],
					[101.0, 1.0],
					[100.0, 1.0],
					[100.0, 0.0]
				]
			]
		},
		// Permisos del punto de inicio
		permissions: permission,
		// Nombre del punto del inicio
		name: '',
		// Marker del punto de inicio
		market: {
			location: {
				type: 'Point',
				coordinates: [100.0, 0.0]
			},
			status: 'create'
		}
	},
	stations: [
		{
			location: {
				type: 'Polygon',
				coordinates: [
					[
						[100.0, 0.0],
						[101.0, 0.0],
						[101.0, 1.0],
						[100.0, 1.0],
						[100.0, 0.0]
					]
				]
			},
			permissions: permission,
			name: '',
			market: {
				location: {
					type: 'Point',
					coordinates: [100.0, 0.0]
				},
				status: 'create'
			},
			info: {
				completed: false,
				order: 1
			}
		}
	],
	distance: {},
	duration: {},
	coordinates: [[123, 123]]
}

export const useRouting = () => {
	const { register, handleSubmit } = useForm()
	const [state, dispatch] = useReducer(reducer, {
		past: [],
		now: [],
		future: []
	})
	const [selectedPlace, setSelectedPlace] = useState(null)
	const [objectLocations, setObjectLocations] = useState(initialDataLocation)
	const [dataDirections, setDataDirections] = useState(null)

	const createServiceClient = useMutation({
		mutationFn: async (data) => await api(METHODS_API.POST, `module/routing/create-client`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateServiceClient'] })
	})

	const handleCreateServiceClient = async (data) => {
		const response = await createServiceClient.mutateAsync(data)
		response?.completed && showToast('Se a creado de manera exito el servicio', 'success')
		response?.error && showToast('❌ Algo ha salido mal al crear el serivicio' + response?.message, 'error')
	}

	const addPlaces = ({ location, data, fromDraggable }) => {
		if (location !== undefined) {
			const { geometry } = calculateCircle(
				data ? data?.geometry?.location?.lat() : fromDraggable?.lat,
				data ? data?.geometry?.location?.lng() : fromDraggable?.lng
			)

			if (data === null) {
				setObjectLocations((state) => ({
					...state,
					[location]: {
						...state[location],
						market: {
							location: {
								type: 'Point',
								coordinates: [fromDraggable.lat, fromDraggable.lng]
							},
							status: 'create'
						}
					}
				}))
			} else {
				setSelectedPlace(data)
				setObjectLocations((state) => ({
					...state,
					[location]: {
						location: geometry,
						permissions: permission,
						name: data?.formatted_address,
						info: { completed: false, order: 1 },
						market: {
							location: {
								type: 'Point',
								coordinates: [data?.geometry?.location?.lat(), data?.geometry?.location?.lng()]
							},
							status: 'create'
						}
					}
				}))
			}
		}
	}

	const handleSendData = (data) => {
		// stations
		const stationProcesed = []
		let count = 2
		if (state.now.length > 0) {
			state.now.forEach((element) => {
				const locationCoordinates = []
				element.snapshot.path.forEach((item) => {
					locationCoordinates.push([item.lat(), item.lng()])
				})
				const obj = {
					location: {
						type: 'Polygon',
						coordinates: locationCoordinates
					},
					permissions: permission,
					name: `station-${count}`,
					market: {
						location: {
							type: 'Point',
							coordinates: null
						},
						status: 'create'
					},
					info: {
						completed: false,
						order: count
					}
				}
				count++
				stationProcesed.push(obj)
			})
		}

		// coordinates, distance, duration
		const arrayCoordinates = []
		dataDirections?.overview_path?.forEach((item) => {
			arrayCoordinates.push([item.lat(), item.lng()])
		})

		// data send
		data.location_start = objectLocations.location_start
		data.location_end = objectLocations.location_end
		data.stations = stationProcesed
		data.distance = dataDirections.legs[0].distance
		data.duration = dataDirections.legs[0].duration
		data.coordinatesroute = arrayCoordinates
		data.location_end.info.order = count
		handleCreateServiceClient(data)
	}

	return {
		state,
		dispatch,
		register,
		handleSubmit,
		addPlaces,
		handleSendData,
		selectedPlace,
		objectLocations,
		setDataDirections
	}
}
