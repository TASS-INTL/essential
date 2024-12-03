import { useReducer, useState } from 'react'

import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
import { DrawingActionKind, isCircle, isMarker, isPolygon, isPolyline, isRectangle } from '@/Components/mapGoogle/types'
import { calculateCircle } from '@/helpers/routes'
import { showToast } from '@/helpers/toast'
import { initialDataLocation } from '@/pages/PrivateRoutes/constants/constants'
import { queryClient } from '@/routes/AppRouter'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

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

export const useRouting = () => {
	const { requestApi } = useApi()

	// states
	const { register, handleSubmit } = useForm()
	const [state, dispatch] = useReducer(reducer, {
		past: [],
		now: [],
		future: []
	})
	const [selectedPlace, setSelectedPlace] = useState(null)
	const [dataDirections, setDataDirections] = useState(null)
	const [objectLocations, setObjectLocations] = useState(initialDataLocation)
	const [permissionForGeoFences, setPermissionForGeoFences] = useState([])

	// Adding places location start and location end
	const addPlaces = ({ location, data, radius }) => {
		const { geometry } = calculateCircle({
			lat: data?.geometry?.location?.lat(),
			lng: data?.geometry?.location?.lng(),
			radius
		})

		setSelectedPlace(data)
		setObjectLocations((state) => ({
			...state,
			[location]: {
				location: geometry,
				permissions: null,
				name: data?.formatted_address,
				info: { status: location === 'location_start' ? 'current' : 'created', order: 1 },
				market: {
					location: {
						type: 'Point',
						coordinates: [data?.geometry?.location?.lng(), data?.geometry?.location?.lat()]
					},
					status: 'create'
				}
			}
		}))
	}

	const handleChangePermissionForGeoFences = (permission) => {
		setPermissionForGeoFences((prevState) => [...prevState, permission])
	}

	// change values merker when draggable is activate
	const handleChangeMarkerDraggable = ({ location, data }) => {
		setObjectLocations((state) => ({
			...state,
			[location]: {
				...state[location],
				market: {
					location: {
						type: 'Point',
						coordinates: [data?.lng, data?.lat]
					},
					status: 'create'
				}
			}
		}))
	}

	const handleChangeRadiusCircle = ({ location, lat, lng, radius }) => {
		const { geometry } = calculateCircle({
			lat,
			lng,
			radius
		})
		setObjectLocations((state) => ({
			...state,
			[location]: {
				...state[location],
				location: geometry
			}
		}))
	}

	// change permissions
	const handleChangePermissionsForLocationStartAndEnd = ({ location, permissions }) => {
		setObjectLocations((state) => ({
			...state,
			[location]: {
				...state[location],
				permissions
			}
		}))
	}

	// processing stations
	const processingStations = () => {
		const stationProcesed = []
		let count = 2
		if (state.now?.length > 0) {
			state.now.forEach((element, index) => {
				const locationCoordinates = []
				element.snapshot.path.forEach((item) => {
					locationCoordinates.push([item.lng(), item.lat()])
				})

				const obj = {
					location: {
						type: 'Polygon',
						coordinates: [locationCoordinates]
					},
					permissions: permissionForGeoFences[index],
					name: `station-${count}`,
					market: {
						location: {
							type: 'Point',
							coordinates: null
						},
						status: 'create'
					},
					info: {
						status: 'created',
						order: count
					}
				}
				count++
				stationProcesed.push(obj)
				locationCoordinates.push(locationCoordinates[0])
			})
		}

		return { stationProcesed, count }
	}

	// processing coordinates
	const processingCoordinates = () => {
		const arrayCoordinates = []
		dataDirections?.overview_path?.forEach((item) => {
			arrayCoordinates.push([item.lat(), item.lng()])
		})

		return arrayCoordinates
	}

	// send create routing
	const createRoutingClient = useMutation({
		mutationFn: async (data) => await requestApi(METHODS_API.POST, `module/routing/create-client`, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['postCreateRoutingClient'] })
	})

	// handle create routing
	const handleCreateRoutingClient = async (data) => {
		const response = await createRoutingClient.mutateAsync(data)
		response?.completed && showToast('Se a creado de manera exitosa la ruta', 'success')
		response?.error && showToast('❌ Algo ha salido mal al crear la ruta' + response?.message, 'error')
	}

	// get permission for routing
	const getPermissionsForRouting = () =>
		useQuery({
			queryKey: ['permissionsForRouting'],
			queryFn: async () => await requestApi(METHODS_API.GET, `module/routing/permissions/geofences`)
		})

	//
	const permissionsData = getPermissionsForRouting()

	// Sending all the information collected for the route
	const handleSendData = (data) => {
		try {
			// stations
			const { stationProcesed, count } = processingStations()

			// coordinates, distance, duration
			const cooordinatesProcessind = processingCoordinates()

			// data send
			data.stations = stationProcesed
			data.coordinatesroute = cooordinatesProcessind
			data.location_end = objectLocations?.location_end
			data.distance = dataDirections?.legs[0]?.distance
			data.duration = dataDirections?.legs[0]?.duration
			data.location_start = objectLocations?.location_start
			data.location_end.info.order = count
			data.viewport = dataDirections?.bounds
			showToast('Se a enviado a crear la ruta', 'warning')
			handleCreateRoutingClient(data)
		} catch (error) {
			console.error(error)
			showToast('Ocurrio un error debes llenar todos los campos', 'warning')
		}
	}

	const changeStatePermission = (idPermission) => {
		const position = state.now.findIndex((element) => element._id === idPermission)
		state.now[position].showPermission = false
	}

	return {
		state,
		dispatch,
		register,
		addPlaces,
		handleSubmit,
		selectedPlace,
		handleSendData,
		permissionsData,
		objectLocations,
		setDataDirections,
		changeStatePermission,
		getPermissionsForRouting,
		handleChangeRadiusCircle,
		handleChangeMarkerDraggable,
		handleChangePermissionForGeoFences,
		handleChangePermissionsForLocationStartAndEnd
	}
}
