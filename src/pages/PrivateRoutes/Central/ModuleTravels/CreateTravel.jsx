import React, { useEffect, useReducer, useState } from 'react'

import { emailSvg } from '@/assets/assetsplatform'
import { InputComponent, InputSubmitComponent, SelectComponent } from '@/Components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { APIProvider } from '@vis.gl/react-google-maps'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'

import { MapGoogle } from '../../../../Components/mapGoogle/Map'
import { MapHandler } from '../../../../Components/mapGoogle/MapHandler'
import { PlaceAutocompleteClassic } from '../../../../Components/mapGoogle/PlaceAutocompleteClassic'
import { API_KEY_GOOGLE_MAPS, initialDataLocation } from '../../constants/constants'
import { useTravels } from './hooks/useTravels'

export const CreateTravel = ({ dataForm }) => {
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
		setSelectedPlace(data)
		setObjectLocations((state) => ({ ...state, [location]: data }))
	}

	const handleCreate = () => {}

	return (
		<div className='h-[95%]'>
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
