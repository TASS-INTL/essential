import React, { useEffect, useReducer, useState } from 'react'

import { emailSvg } from '@/assets/assetsplatform'
import { InputComponent, InputSubmitComponent, SelectComponent } from '@/Components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { polygon } from '@turf/helpers'
import { APIProvider } from '@vis.gl/react-google-maps'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'

import { MapGoogle } from '../../components/mapGoogle/Map'
import { MapHandler } from '../../components/mapGoogle/MapHandler'
import { PlaceAutocompleteClassic } from '../../components/mapGoogle/PlaceAutocompleteClassic'
import {
	DrawingActionKind,
	isCircle,
	isMarker,
	isPolygon,
	isPolyline,
	isRectangle
} from '../../components/mapGoogle/types'
import { initialDataLocation } from '../../constants/constants'
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

export const CreateTravel = ({ dataForm, handleCreate }) => {
	const { register, handleSubmit } = useForm(dataForm)
	const [state, dispatch] = useReducer(reducer, {
		past: [],
		now: [],
		future: []
	})
	const [selectedPlace, setSelectedPlace] = useState(null)
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))
	const { fetchDataInfoRegister, handleCreateTravel } = useTravels()
	const dataInfoRegister = fetchDataInfoRegister()
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const [objectLocations, setObjectLocations] = useState(initialDataLocation)

	const addPlaces = ({ location, data }) => {
		console.log('entro aca', location, data)
		setSelectedPlace(data)
		setObjectLocations((state) => ({ ...state, [location]: data }))
	}

	return (
		<div className='border-2 rounded-2xl h-[95%]'>
			<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
				{/* <MapHandler place={selectedPlace} /> */}
				<div className='flex h-full'>
					<div className='w-[40%]'>
						<MapGoogle
							customControlPermission
							MapHandlerPermission
							UndoRedoControlPermission
							dispatch={dispatch}
							state={state}
							selectedPlace={selectedPlace}
							locations={objectLocations}
						/>
					</div>
					<div className='w-[60%] overflow-y-scroll'>
						<form onSubmit={handleSubmit(handleCreate)} className='flex flex-col'>
							{/* DATES */}
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
							{/* INPUTS PLACES */}
							<div className='flex gap-4 mt-5'>
								<div className='w-[40%]'>
									<span className='mb-3'>Lugar de inicio</span>
									<PlaceAutocompleteClassic onPlaceSelect={addPlaces} location='location_start' />
								</div>
								<div className='w-[40%]'>
									<span className='mb-3'>Lugar de fin</span>
									<PlaceAutocompleteClassic onPlaceSelect={addPlaces} location='location_end' />
								</div>
							</div>
							{/* INPUTS TRAVELS */}
							{dataForm.service && (
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
									</div>
								</div>
							)}
							{/* DRIVER SERVICE */}
							{dataForm.driver && (
								<div>
									<h4 className=' py-5'>Datos del conductor</h4>
									<InputComponent
										required
										name='driver.email'
										type='email'
										svg={emailSvg}
										register={register}
										label='Correo electronico'
										placeholder='name@gmail.com'
										color
									/>
									<InputComponent
										color
										required
										name='driver.license_plate'
										type='text'
										svg={emailSvg}
										register={register}
										label='Placa'
										placeholder='XXXXX'
									/>
									<InputComponent
										color
										required
										name='driver.name'
										type='text'
										svg={emailSvg}
										register={register}
										label='Nombre'
										placeholder='jhondue'
									/>
									<InputComponent
										color
										required
										name='driver.number_document'
										type='number'
										svg={emailSvg}
										register={register}
										label='Numero de documento'
										placeholder='000 000 0000'
									/>
									<InputComponent
										color
										required
										name='driver.phone'
										type='number'
										svg={emailSvg}
										register={register}
										label='Numero de celular'
										placeholder='000 000 0000'
									/>
								</div>
							)}
							{/* COMENTS SERVICE */}
							{dataForm.driver && (
								<div className='flex flex-col'>
									<label htmlFor='story' className='py-1'>
										Quieres dar alguna indicacion adicional ?
									</label>
									<textarea
										className='border border-black p-3 rounded-lg'
										{...register('remarks', {
											validate: {
												pattern: (value) => !/[!]/.test(value)
											}
										})}
									/>
								</div>
							)}
							{/* SEND FORM */}
							<div className='flex justify-center pt-6 '>
								<InputSubmitComponent text='CREAR VIAJE' />
							</div>
						</form>
					</div>
				</div>
			</APIProvider>
		</div>
	)
}
