import React, { useEffect, useReducer, useRef, useState } from 'react'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { polygon } from '@turf/helpers'
import { APIProvider, ControlPosition, MapControl, useMapsLibrary } from '@vis.gl/react-google-maps'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete'
import { useForm } from 'react-hook-form'
import Select from 'react-select'

import { InputSubmitComponent, SelectComponent } from '../../../Components'
import { MapGoogle } from '../components/mapGoogle/Map'
import { DrawingActionKind, isCircle, isMarker, isPolygon, isRectangle } from '../components/mapGoogle/types'
import { useTravels } from './hooks/useTravels'

const API_KEY_GOOGLE_MAPS = import.meta.env.VITE_API_KEY_GOOGLE_MAPS

function reducer(state, action) {
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

				console.log(circle, 'circle')
				snapshot.position = overlay.getPosition()?.toJSON()
			} else if (isPolygon(overlay) || isPolyline(overlay)) {
				const array = []
				overlay
					.getPath()
					?.getArray()
					.map((item) => {
						array.push([item.lat(), item.lng()])
						return console.log('lat : ', item.lat(), 'lng : ', item.lng())
					})

				const result = polygon(
					[
						[
							[-5, 52],
							[-4, 56],
							[-2, 51],
							[-7, 54],
							[-5, 52]
						]
					],
					{ name: 'poly1' }
				)

				console.log(result, 'result')

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

const autocompleteModes = [
	{ id: 'classic', label: 'Google Autocomplete Widget' },
	{ id: 'custom', label: 'Custom Build' },
	{ id: 'custom-hybrid', label: 'Custom w/ Select Widget' }
]

export const CreateTravel = () => {
	const [state, dispatch] = useReducer(reducer, {
		past: [],
		now: [],
		future: []
	})
	const [selectedAutocompleteMode, setSelectedAutocompleteMode] = useState(autocompleteModes[0])
	const [selectedPlace, setSelectedPlace] = useState(null)
	//

	const { fetchDataInfoRegister, handleCreateTravel } = useTravels()
	const dataInfoRegister = fetchDataInfoRegister()
	const { register, handleSubmit, watch } = useForm()
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const [dataCoordinates, setDataCoordinates] = useState({ location_start: {}, location_end: {}, station: [] })

	const [value, setValue] = useState(null)
	const [ariaFocusMessage, setAriaFocusMessage] = useState('')
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	console.log(value, 'value')

	useEffect(() => {
		if (value) {
			geocodeByPlaceId(value?.value?.place_id)
				.then((results) => console.log(results[0]?.geometry?.location, 'result'))
				.catch((error) => console.error(error))
		}
	}, [value])

	const onFocus = ({ focused, isDisabled }) => {
		const msg = `You are currently focused on option ${focused.label}${isDisabled ? ', disabled' : ''}`
		setAriaFocusMessage(msg)
		return msg
	}

	const onMenuOpen = () => setIsMenuOpen(true)
	const onMenuClose = () => setIsMenuOpen(false)

	console.log(dataInfoRegister?.data?.data?.services)

	return (
		<div className='border rounded-2xl'>
			<div className='flex'>
				<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
					<MapGoogle
						customControlPermission
						MapHandlerPermission
						UndoRedoControlPermission
						dispatch={dispatch}
						state={state}
						selectedPlace={selectedPlace}
					/>
				</APIProvider>
				<div className='p-5 w-[60%]'>
					<form
						action=''
						onSubmit={handleSubmit((data) => {
							const device = dataInfoRegister?.data?.data?.devices.filter(
								(devices) => devices._id === data.device.id_device
							)
							const installer = dataInfoRegister?.data?.data?.installers.filter(
								(installers) => installers._id === data.installer.id_installer
							)
							const service = dataInfoRegister?.data?.data?.services.filter(
								(services) => services._id === data.service.did
							)
							const dataSend = {
								date_end: format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss'),
								date_start: format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss'),
								devices: [
									{
										did: device[0].did,
										id_device: device[0]._id,
										status: device[0].status,
										type_operation: 'INSTALLATION'
									}
								],
								installers: [
									{
										id_installer: installer[0]._id,
										name: installer[0].name,
										status: installer[0].status,
										type_operation: 'INSTALLATION'
									}
								],
								location_end: dataCoordinates.location_end,
								location_start: dataCoordinates.location_start,
								service: {
									did: service[0].did,
									id_service: service[0]._id
								}
							}
							handleCreateTravel(dataSend)
						})}
						className='flex  flex-col'
					>
						<div className='flex mt-5'>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer class='flex' components={['DateTimePicker', 'DateTimePicker']}>
									<div className='flex gap-5'>
										<DateTimePicker
											label='fecha de inicio'
											value={dateStart}
											onChange={(newValue) => setDateStart(newValue)}
										/>
										<DateTimePicker
											label='fecha de final'
											value={dateEnd}
											onChange={(newValue) => setDateEnd(newValue)}
										/>
									</div>
								</DemoContainer>
							</LocalizationProvider>
						</div>
						<div className='flex gap-4 mt-5'>
							<div className='w-[40%]'>
								<span>lugar de inicio</span>
								<GooglePlacesAutocomplete
									apiKey={API_KEY_GOOGLE_MAPS}
									autocompletionRequest={{
										bounds: [{ lat: 50, lng: 50 }]
									}}
									onLoadFailed={(error) => console.error('Could not inject Google script', error)}
									selectProps={{
										value,
										onChange: setValue
									}}
								/>
							</div>
							{/* <div className='w-[40%]'>
								<span>lugar de fin</span>
								<GooglePlacesAutocomplete
									apiKey={API_KEY_GOOGLE_MAPS}
									onLoadFailed={(error) => console.error('Could not inject Google script', error)}
								/>
							</div> */}
						</div>
						<div className='flex mt-5  justify-between'>
							<div className='w-[31%]'>
								<SelectComponent
									color
									option='did'
									name='service.did'
									register={register}
									label='Selecciona el servicio'
									arrayOptions={dataInfoRegister?.data?.data?.services}
								/>
							</div>
							<div className='w-[31%]'>
								<Select
									aria-labelledby='aria-label'
									ariaLiveMessages={{
										onFocus
									}}
									inputId='aria-example-input'
									name='aria-live-color'
									onMenuOpen={onMenuOpen}
									onMenuClose={onMenuClose}
									options={dataInfoRegister?.data?.data?.services}
								/>
							</div>

							{/* <div className='w-[31%]'>
								<SelectComponent
									color
									register={register}
									label='Selecciona el dispositivo'
									name='device.id_device'
									arrayOptions={dataInfoRegister?.data?.data?.devices}
									option='nickname'
								/>
							</div>
							<div className='w-[31%]'>
								<SelectComponent
									color
									register={register}
									label='Selecciona el instalador'
									name='installer.id_installer'
									arrayOptions={dataInfoRegister?.data?.data?.installers}
									option='name'
								/>
							</div> */}
						</div>
						<div className='flex justify-center pt-6 '>
							<InputSubmitComponent text='CREAR VIAJE' />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default function CustomAriaLive() {
	const [ariaFocusMessage, setAriaFocusMessage] = useState('')
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const style = {
		blockquote: {
			fontStyle: 'italic',
			fontSize: '.75rem',
			margin: '1rem 0'
		},
		label: {
			fontSize: '.75rem',
			fontWeight: 'bold',
			lineHeight: 2
		}
	}
}
