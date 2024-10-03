import React from 'react'

import { InputComponent, InputSubmitComponent, SelectComponent } from '@/Components'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { APIProvider } from '@vis.gl/react-google-maps'

import { ErrorComponent, LoaderComponent, RemarksInput } from '../../../../Components'
import { MapGoogle } from '../../../../Components/mapGoogle/Map'
import { MapHandler } from '../../../../Components/mapGoogle/MapHandler'
import { PlaceAutocompleteClassic } from '../../../../Components/mapGoogle/PlaceAutocompleteClassic'
import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { useCreateTravel } from './hooks/useCreateTravel'

export const CreateTravel = ({ dataForm }) => {
	const {
		dateEnd,
		register,
		dateStart,
		addPlaces,
		setDateEnd,
		setDateStart,
		handleSubmit,
		selectedPlace,
		objectLocations,
		dataPreCrateTravel,
		handleCreateTravel,
		serviceRouteInformation,
		handleChangePermissions,
		handleChangeMarkerDraggable
	} = useCreateTravel(dataForm)

	if (dataPreCrateTravel.isLoading) return <LoaderComponent />

	if (dataPreCrateTravel.error || dataPreCrateTravel.data?.error)
		return <ErrorComponent error={dataPreCrateTravel.data?.message} />

	return (
		<div className='h-[95%]'>
			<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
				<MapHandler place={selectedPlace} />
				<div className='flex h-full'>
					<div className='w-[40%]'>
						<MapGoogle
							locations={objectLocations}
							selectedPlace={selectedPlace}
							permissionsData={dataPreCrateTravel?.data?.data?.permissions}
							dataRoute={serviceRouteInformation?.data}
							handleChangePermissions={handleChangePermissions}
							handleChangeMarkerDraggable={handleChangeMarkerDraggable}
							withDirecton={false}
						/>
					</div>
					<div className='w-[60%] overflow-y-scroll'>
						<form onSubmit={handleSubmit(handleCreateTravel)} className='flex flex-col'>
							{/* DATES */}
							<div className='flex mt-5'>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer class='flex' components={['DateTimePicker', 'DateTimePicker']}>
										<div className='flex gap-5'>
											<DateTimePicker
												label='Fecha de Instalacion'
												value={dateStart}
												onChange={(newValue) => setDateStart(newValue)}
											/>
											<DateTimePicker
												label='Fecha de Desinstalacion'
												value={dateEnd}
												onChange={(newValue) => setDateEnd(newValue)}
											/>
										</div>
									</DemoContainer>
								</LocalizationProvider>
							</div>
							{/* INPUTS TRAVELS */}
							{dataForm.service && (
								<div className='flex mt-5  justify-between'>
									<div className='w-[99%]'>
										<SelectComponent
											color
											option='did'
											name='service._id'
											register={register}
											label='Selecciona el servicio'
											arrayOptions={dataPreCrateTravel?.data?.data?.services}
										/>
									</div>
								</div>
							)}
							{/* INPUTS PLACES */}
							<div className='flex gap-4 mt-5'>
								<div className='w-[48%]'>
									<span className='mb-3'>Lugar de Instalacion</span>
									<PlaceAutocompleteClassic addPlaces={addPlaces} location='location_start' />
								</div>
								<div className='w-[48%]'>
									<span className='mb-3'>Lugar de Desinstalacion</span>
									<PlaceAutocompleteClassic addPlaces={addPlaces} location='location_end' />
								</div>
							</div>

							{/* INPUTS TYPE TREVEL */}
							<div className='flex mt-5 gap-4 '>
								<div className='w-[99%]'>
									<SelectComponent
										color
										register={register}
										label='Selecciona el tipo de viaje'
										name='type._id'
										arrayOptions={dataPreCrateTravel?.data?.data?.types_travel}
										option='name'
									/>
								</div>
							</div>

							{/* INPUTS INTALLER */}
							<div className='flex mt-5 gap-4 '>
								<div className='w-[48%]'>
									<SelectComponent
										color
										register={register}
										label='Selecciona el instalador'
										name='installers.id_installer'
										arrayOptions={dataPreCrateTravel?.data?.data?.installers}
										option='name'
									/>
								</div>
								<div className='w-[48%]'>
									<SelectComponent
										color
										register={register}
										label='Selecciona la operacion'
										name='installers.type_operation'
										arrayOptions={dataPreCrateTravel?.data?.data?.type_operations}
										option='name'
									/>
								</div>
							</div>
							{/* DRIVER SERVICE */}
							{dataForm.driver && (
								<div>
									<h4 className=' py-5'>Datos del conductor</h4>
									<InputComponent
										required
										name='driver.email'
										type='email'
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
										register={register}
										label='Placa'
										placeholder='XXXXX'
									/>
									<InputComponent
										color
										required
										name='driver.name'
										type='text'
										register={register}
										label='Nombre'
										placeholder='jhondue'
									/>
									<InputComponent
										color
										required
										name='driver.number_document'
										type='number'
										register={register}
										label='Numero de documento'
										placeholder='000 000 0000'
									/>
									<InputComponent
										color
										required
										name='driver.phone'
										type='number'
										register={register}
										label='Numero de celular'
										placeholder='000 000 0000'
									/>
								</div>
							)}
							{/* COMENTS SERVICE */}
							<RemarksInput text='Quieres dar alguna indicacion adicional ?' register={register} />
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
