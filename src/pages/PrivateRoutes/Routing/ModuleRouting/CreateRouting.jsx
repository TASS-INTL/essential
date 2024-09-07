import React, { useReducer, useState } from 'react'

import circle from '@turf/circle'
import { polygon } from '@turf/helpers'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useForm } from 'react-hook-form'

import { emailSvg } from '../../../../assets/assetsplatform'
import { InputComponent, SelectComponent } from '../../../../Components'
import { MapGoogle } from '../../../../Components/mapGoogle/Map'
import { MapHandler } from '../../../../Components/mapGoogle/MapHandler'
import { PlaceAutocompleteClassic } from '../../../../Components/mapGoogle/PlaceAutocompleteClassic'
import { DrawingActionKind, isCircle, isMarker, isPolygon, isRectangle } from '../../../../Components/mapGoogle/types'
import { API_KEY_GOOGLE_MAPS, initialDataLocation } from '../../constants/constants'

// flujo de creacin de una ruta

// 1. Ingresar el nombre de la ruta  // ✅
// 2. Ingresar el punto de inicio // ✅
// 3. Vizualizar en el mapa el punto de incio // ✅
// 4. Vizualizar la geocerca del punto de inicio // ✅
// 5. Vizualiar los permisos de la geocerca del punto de inicio // ✅
// 6. Poder modificar los permisos de esa geocerca, habalitar o deshabilitar // ✅
// 7. Repetir los pasos del 1 al 6 para el punto de fin // ✅
// 8. Poder agregar geo cercas
// 9. Dibujar una geocerca
// 10. Poder visualizar los permisos de la geocerca
// 11. Poder modificar los permisos de esa geocerca, habalitar o deshabilitar

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
			const { overlay } = action.payload

			const snapshot = {}

			if (isCircle(overlay)) {
				snapshot.center = overlay.getCenter()?.toJSON()
				snapshot.radius = overlay.getRadius()
			} else if (isMarker(overlay)) {
				const { lat, lng } = overlay.getPosition()?.toJSON()
				let center = [lat, lng]
				let radius = 5
				let options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } }
				let circle = turf.circle(center, radius, options)

				snapshot.position = overlay.getPosition()?.toJSON()
			} else if (isPolygon(overlay) || isPolyline(overlay)) {
				// console.log('entro', overlay.getPath())
				const array = []
				// overlay
				// 	.getPath()
				// 	?.getArray()
				// 	.map((item) => {
				// 		array.push([item.lat(), item.lng()])
				// 	})

				// const result = polygon(
				// 	[
				// 		[
				// 			[-5, 52],
				// 			[-4, 56],
				// 			[-2, 51],
				// 			[-7, 54],
				// 			[-5, 52]
				// 		]
				// 	],
				// 	{ name: 'poly1' }
				// )

				snapshot.path = overlay.getPath()?.getArray()
			} else if (isRectangle(overlay)) {
				snapshot.bounds = overlay.getBounds()?.toJSON()
			}

			return {
				past: [...state.past, state.now],
				now: [
					...state.now,
					{
						type: action.payload.type,
						geometry: action.payload.overlay,
						snapshot
					}
				],
				future: []
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
		permissions: [permission],
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
			permissions: [permission],
			name: '',
			market: {
				location: {
					type: 'Point',
					coordinates: [100.0, 0.0]
				},
				status: 'create'
			}
		}
	],
	location_end: {
		location: {
			lat: '',
			lng: ''
		},
		permissions: [],
		name: '',
		market: {
			location: {
				lat: '',
				lng: ''
			},
			status: ''
		}
	},
	coordinates: [[123, 123]],
	distance: ''
}

export const CreateRouting = () => {
	const { register, handleSubmit } = useForm()

	const [state, dispatch] = useReducer(reducer, {
		past: [],
		now: [],
		future: []
	})
	const [selectedPlace, setSelectedPlace] = useState(null)
	const [arrayOptionRoutes, setArrayOptionRoutes] = useState(null)
	const [objectLocations, setObjectLocations] = useState(initialDataLocation)

	const calculateCircle = (lat, lng) => {
		let center = [lat, lng]
		let radius = 5
		let options = { steps: 10, units: 'kilometers', properties: { foo: 'bar' } }
		let circle = turf.circle(center, radius, options)
		return circle
	}

	const addPlaces = ({ location, data }) => {
		// console.log(' data --> ', data?.geometry?.location?.lat)

		const { geometry } = calculateCircle(data?.geometry?.location?.lat(), data?.geometry?.location?.lng())
		// console.log('geoFenceCircle ---> ', geometry)

		setSelectedPlace(data)
		setObjectLocations((state) => ({
			...state,
			[location]: {
				location: geometry,
				permissions: [],
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

	return (
		<div className='h-[95%]'>
			<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
				<MapHandler place={selectedPlace} />
				<div className='flex h-full'>
					{/* MAP */}
					<div className='w-[40%]'>
						<MapGoogle
							customControlPermission
							MapHandlerPermission
							UndoRedoControlPermission
							dispatch={dispatch}
							state={state}
							selectedPlace={selectedPlace}
							setArrayOptionRoutes={setArrayOptionRoutes}
							directions
							locations={objectLocations}
						/>
					</div>
					{/* FORM */}
					<form className='w-[60%] overflow-y-scroll'>
						<div className='flex gap-4 mt-5'>
							<div className='w-[30%]'>
								<InputComponent
									required
									name='driver.email'
									type='email'
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
						<div>
							{arrayOptionRoutes && (
								<SelectComponent
									color
									option='summary'
									name='service.did'
									register={register}
									label='Rutas alternativas'
									arrayOptions={arrayOptionRoutes}
								/>
							)}
						</div>
					</form>
				</div>
			</APIProvider>
		</div>
	)
}
