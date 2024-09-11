import React, { useReducer, useState } from 'react'

import { APIProvider } from '@vis.gl/react-google-maps'
import { useForm } from 'react-hook-form'

import { InputComponent, InputSubmitComponent, SelectComponent } from '../../../../Components'
import { MapGoogle } from '../../../../Components/mapGoogle/Map'
import { MapHandler } from '../../../../Components/mapGoogle/MapHandler'
import { PlaceAutocompleteClassic } from '../../../../Components/mapGoogle/PlaceAutocompleteClassic'
import { DrawingActionKind, isCircle, isMarker, isPolygon, isRectangle } from '../../../../Components/mapGoogle/types'
import { calculateCircle } from '../../../../helpers/routes'
import { API_KEY_GOOGLE_MAPS, initialDataLocation } from '../../constants/constants'

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

export const permission = [
	{
		_id: '66625f1a3c6de0255a3eb5fe',
		name: 'entry_close',
		values: {
			value: true
		},
		name_consult: 'Cerrar'
	},
	{
		_id: '66625f263c6de0255a3eb5ff',
		name: 'entry_open',
		values: {
			value: true
		},
		name_consult: 'Abrir'
	},
	{
		_id: '66625f363c6de0255a3eb600',
		name: 'geofence_entry_load',
		values: {
			value: true
		},
		name_consult: 'avisa entrada a la geocerca'
	},
	{
		_id: '66625f523c6de0255a3eb601',
		name: 'geofence_output_load',
		values: {
			value: true
		},
		name_consult: 'Sale de la geocerca'
	},
	{
		_id: '66625f653c6de0255a3eb602',
		name: 'entry_violation',
		values: {
			value: true
		},
		name_consult: 'violaciones'
	},
	{
		_id: '66625f723c6de0255a3eb604',
		name: 'date_entry_load',
		values: {
			value: true,
			date: '2024-04-17T03:30:00.000+0000'
		},
		name_consult: 'Fecha de entrada'
	},
	{
		_id: '66625f783c6de0255a3eb605',
		name: 'date_output_load',
		values: {
			value: true,
			date: '2024-04-17T03:30:00.000+0000'
		},
		name_consult: 'Fecha salida'
	},
	{
		_id: '66bbb472ed6fb16031a0c4d7',
		name: 'receive_commands',
		name_consult: 'Recivir comandos',
		values: {
			value: true
		}
	}
]

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
	coordinates: [[123, 123]],
	distance: {},
	duration: {}
}

export const CreateRouting = () => {
	const { register, handleSubmit } = useForm()
	const [state, dispatch] = useReducer(reducer, {
		past: [],
		now: [],
		future: []
	})
	const [selectedPlace, setSelectedPlace] = useState(null)
	const [objectLocations, setObjectLocations] = useState(initialDataLocation)

	const addPlaces = ({ location, data }) => {
		const { geometry } = calculateCircle(data?.geometry?.location?.lat(), data?.geometry?.location?.lng())
		setSelectedPlace(data)
		setObjectLocations((state) => ({
			...state,
			[location]: {
				location: geometry,
				permissions: permission,
				name: data?.formatted_address,
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

	const handleSendData = (data) => {
		// location start end location end
		console.log(objectLocations, 'objectLocations')
		// stations
		const station = []
		if (state.now.length > 0) {
			state.now.forEach((element, index) => {
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
					name: `station-${index + 1}`,
					market: {
						location: {
							type: 'Point',
							coordinates: null
						},
						status: 'create'
					},
					info: {
						completed: false,
						order: index + 1
					}
				}
				station.push(obj)
			})
		}
		console.log('station -->', station)

		// data send
		console.log('dataSend --> ', data)
	}

	console.log('state --->', state)

	return (
		<div className='h-[95%]'>
			<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
				<MapHandler place={selectedPlace} />
				<div className='flex bg-slate-500 h-2/4'>
					{/* MAP */}
					<div className='w-[40%]'>
						<MapGoogle
							customControlPermission
							MapHandlerPermission
							UndoRedoControlPermission
							dispatch={dispatch}
							state={state}
							selectedPlace={selectedPlace}
							directions
							locations={objectLocations}
							dataPrintModals={state?.now}
						/>
					</div>
					{/* FORM */}
					<form onSubmit={handleSubmit(handleSendData)} className='w-[60%] overflow-y-scroll'>
						<div className='flex gap-4 mt-5'>
							<div className='w-[30%]'>
								<InputComponent
									required
									name='name_routing'
									type='text'
									register={register}
									label='Nombre de la ruta'
									placeholder='Medellin - la guajira'
									color
								/>
							</div>
							<div className='w-[30%]'>
								<span className='mb-3'>Lugar de inicio</span>
								<PlaceAutocompleteClassic onPlaceSelect={addPlaces} location='location_start' />
							</div>
							<div className='w-[30%]'>
								<span className='mb-3'>Lugar de fin</span>
								<PlaceAutocompleteClassic onPlaceSelect={addPlaces} location='location_end' />
							</div>
						</div>
						<div className='flex justify-center pt-6 '>
							<InputSubmitComponent text='Crear Ruta' />
						</div>
					</form>
				</div>
			</APIProvider>
		</div>
	)
}
