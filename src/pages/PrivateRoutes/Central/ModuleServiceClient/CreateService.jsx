import React, { useEffect, useReducer, useState } from 'react'

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { APIProvider } from '@vis.gl/react-google-maps'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { MdOutlineReadMore } from 'react-icons/md'

import { emailSvg } from '../../../../assets/assetsplatform'
import { InputComponent, InputSubmitComponent, ModalComponent, SelectComponent } from '../../../../Components'
import { MapGoogle } from '../../../../Components/mapGoogle/Map'
import { MapHandler } from '../../../../Components/mapGoogle/MapHandler'
import { API_KEY_GOOGLE_MAPS, initialDataLocation } from '../../constants/constants'
import { CreateRouting } from '../../Routing/ModuleRouting'

// ============ Creacion de servicio ================

// para crear un servicio se hace hacen los siguientes pasos

// consultar los selects
//    los tipos de dispositivps ---> id, name
//    las rutas asociadas del cliente ---> id, did, name
//    los tipos de servicios ---> id,name

// Los inputs
//    fecha de inicio y fin ---> requerido
//    informacion de transportista
//       nombre
//       numero
//       informacion del conductor
//          nombre
//          placa del vehiculo
//          numero de documento
//          correo
//       informacion del contenedor
//          placa del contendedor
//          numero del contenedor
//          guayas
// Informacion adicional
// Observaciones

const typesServices = [
	{
		name: 'typo de serivico 1',
		_id: '1'
	},
	{
		name: 'typo servicio 2',
		_id: '2'
	}
]

const typesDevices = [
	{
		_id: '1',
		name: 'Device 1'
	},
	{
		_id: '2',
		name: 'Device 2'
	}
]

const routesClient = [
	{
		_id: '1',
		name_routing: 'Medellin - Cartagena'
	},
	{
		_id: '2',
		name_routing: 'Bogata - Cali'
	}
]

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
				const array = []
				// overlay
				// 	.getPath()
				// 	?.getArray()
				// 	.map((item) => {
				// 		array.push([item.lat(), item.lng()])
				// 	})

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

export const CreateService = () => {
	const { register, handleSubmit } = useForm()
	const [state, dispatch] = useReducer(reducer, {
		past: [],
		now: [],
		future: []
	})
	const [selectedPlace, setSelectedPlace] = useState(null)
	const [dateStart, setDateStart] = useState(dayjs('2024-04-17T15:30'))
	const [dateEnd, setDateEnd] = useState(dayjs('2024-04-17T15:30'))

	const [objectLocations, setObjectLocations] = useState(initialDataLocation)

	const handleCreateService = (data) => {
		data.date_end = format(dateStart.$d, 'yyyy-MM-dd hh:mm:ss')
		data.date_start = format(dateEnd.$d, 'yyyy-MM-dd hh:mm:ss')
		// data.place_end = dataCoordinates.place_end
		// data.place_start = dataCoordinates.place_start
		// data.station = dataCoordinates.station

		const sendJsonService = {
			type_device: {
				_id: '',
				name: ''
			},
			id_route: '',
			type_service: {
				_id: '',
				name: ''
			},
			date_start: '',
			date_end: '',
			carrier: {
				name: '',
				number: '',
				driver: {
					name: '',
					licence_plate: '',
					number_document: '',
					phone: '',
					email: ''
				},
				information_container: {
					licence_plate: '',
					type: '',
					number: '',
					seals: ['', '']
				}
			},
			information_aditional: '',
			remarks: ''
		}

		// handleCreateServiceClient(data)
	}

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)

	return (
		<div className='pt-2 px-2 h-[95%]'>
			<ModalComponent handleOpen={open} HandleClose={handleOpen} titleModal='Creacion de ruta'>
				<CreateRouting />
			</ModalComponent>
			<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
				<MapHandler place={selectedPlace} />
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
						<form onSubmit={handleSubmit(handleCreateService)} className='flex flex-col'>
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
							<div className='flex mt-5  justify-between'>
								<div className='w-[70%] flex  items-center'>
									<SelectComponent
										color
										option='name_routing'
										name='service.did'
										register={register}
										label='Rutas'
										arrayOptions={routesClient}
									/>
								</div>
								<div className='w-[30%] flex items-end justify-center text-sm'>
									<button
										onClick={handleOpen}
										className=' rounded-md w-4/5 ps-1 p-2.5 flex gap-1 justify-center items-center bg-black text-white'
									>
										<MdOutlineReadMore color='white' />
										<span>Nueva Ruta</span>
									</button>
								</div>

								{/* 
                        <div className='w-[41%]'>
									<SelectComponent
										color
										option='name'
										name='service.did'
										register={register}
										label='tipo de servicio'
										arrayOptions={typesServices}
									/>
								</div>
                         <div className='w-[31%]'>
									<SelectComponent
										color
										register={register}
										label='Selecciona el dispositivo'
										name='device.id_device'
										arrayOptions={typesDevices}
										option='name'
									/>
								</div> 
                        */}
							</div>
							{/* <div>
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
							</div> */}
							{/* <div className='flex flex-col'>
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
							</div> */}
							{/* SEND FORM */}
							{/* <div className='flex justify-center pt-6 '>
								<InputSubmitComponent text='CREAR VIAJE' />
							</div> */}
						</form>
					</div>
				</div>
			</APIProvider>
		</div>
	)
}
