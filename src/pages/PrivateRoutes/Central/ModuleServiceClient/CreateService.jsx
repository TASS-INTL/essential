import React from 'react'

import {
	ErrorComponent,
	InputComponent,
	InputSubmitComponent,
	LoaderComponent,
	ModalComponent,
	RemarksInput,
	SelectComponent
} from '@/Components'
import { MapGoogle } from '@/Components/mapGoogle/Map'
import { Polygon } from '@/Components/mapGoogle/Polygon'
import { Polyline } from '@/Components/mapGoogle/Polyline'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { APIProvider } from '@vis.gl/react-google-maps'
import { MdOutlineReadMore } from 'react-icons/md'

import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { CreateRouting } from '../../Routing/ModuleRouting'
import { useServiceClient } from './hooks/useServiceClient'

export const CreateService = () => {
	const {
		open,
		dataRoute,
		dateEnd,
		register,
		dateStart,
		handleOpen,
		setDateEnd,
		handleSubmit,
		setDateStart,
		handleCreateService,
		dataPreCreateService
	} = useServiceClient()

	if (dataPreCreateService?.isLoading || dataRoute?.isLoading) return <LoaderComponent />

	if (dataPreCreateService?.isError || dataRoute?.isError)
		return <ErrorComponent error={dataPreCreateService.massage} />

	return (
		<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
			<div className='pt-1 px-2 h-[95%]'>
				<ModalComponent handleOpen={open} HandleClose={handleOpen} titleModal='Creacion de ruta'>
					<CreateRouting />
				</ModalComponent>
				<div className='flex h-full'>
					<div className='w-[40%]'>
						<MapGoogle>
							{dataRoute?.data?.data?.coordinatesroute && (
								<Polyline
									strokeWeight={7}
									strokeColor={'#8a2be2'}
									pathArray={dataRoute?.data?.data?.coordinatesroute}
								/>
							)}
							{dataRoute?.data?.data?.stations?.length > 0 && (
								<>
									{dataRoute?.data?.data?.stations.map((item) => (
										<Polygon
											key={item._id}
											strokeWeight={1.5}
											pathsArray={item?.location?.coordinates[0]}
										/>
									))}
								</>
							)}
							{dataRoute?.data?.data?.location_start && (
								<Polygon
									strokeWeight={1.5}
									pathsArray={dataRoute?.data?.data?.location_start?.location.coordinates[0]}
								/>
							)}
							{dataRoute?.data?.data?.location_end && (
								<Polygon
									strokeWeight={1.5}
									pathsArray={dataRoute?.data?.data?.location_end?.location.coordinates[0]}
								/>
							)}
						</MapGoogle>
					</div>
					<div className='w-[60%] overflow-y-scroll px-3'>
						<form onSubmit={handleSubmit(handleCreateService)} className='flex flex-col'>
							{/* DATES */}
							<div className='flex'>
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
							{/* select routing */}
							<div className='flex mt-3  justify-between'>
								<div className='w-[70%] flex  items-center'>
									<SelectComponent
										color
										option='name_routing'
										name='id_route'
										register={register}
										label='Rutas para el viaje'
										arrayOptions={dataPreCreateService?.data?.data?.routes}
									/>
								</div>
								<div className='w-[30%] flex items-end justify-center text-sm'>
									<button
										onClick={handleOpen}
										className='rounded-md w-4/5 ps-1 p-2.5 flex gap-1 justify-center items-center bg-black text-white'
									>
										<MdOutlineReadMore color='white' />
										<span>Nueva Ruta</span>
									</button>
								</div>
							</div>
							{/* services */}
							<div className='flex justify-between mt-5'>
								<div className='w-[48%]'>
									<SelectComponent
										color
										option='name'
										name='type_service._id'
										register={register}
										label='tipo de servicio'
										arrayOptions={dataPreCreateService?.data?.data?.types_services}
									/>
								</div>
								<div className='w-[48%]'>
									<SelectComponent
										color
										option='name'
										name='type_device._id'
										register={register}
										label='Selecciona el dispositivo'
										arrayOptions={dataPreCreateService?.data?.data?.types_devices}
									/>
								</div>
							</div>
							{/* transportista */}
							<h2 className='py-2 text-center'>DATOS DEL TRANSPORTISTA</h2>
							<div className='flex justify-between mt-1'>
								<div className='w-[48%]'>
									<InputComponent
										required
										name='carrier.name'
										type='text'
										register={register}
										label='nombre del transportista'
										placeholder='Botero soto'
										color
									/>
								</div>
								<div className='w-[48%]'>
									<InputComponent
										color
										required
										name='carrier.phone_number'
										type='number'
										register={register}
										label='Numero de celular'
										placeholder='+57 000 000 0000'
									/>
								</div>
							</div>
							{/* dates driver  */}
							<h2 className='py-2 text-center'>DATOS DEL CONDUCTOR</h2>
							<div className='flex gap-2 flex-wrap'>
								<InputComponent
									required
									name='carrier.driver.email'
									type='email'
									register={register}
									label='Correo electronico'
									placeholder='name@gmail.com'
									color
								/>
								<InputComponent
									color
									required
									name='carrier.driver.licence_plate'
									type='text'
									register={register}
									label='Placa'
									placeholder='XXXXX'
								/>
								<InputComponent
									color
									required
									name='carrier.driver.name'
									type='text'
									register={register}
									label='Nombre'
									placeholder='jhondue'
								/>
								<InputComponent
									color
									required
									name='carrier.driver.number_document'
									type='number'
									register={register}
									label='Numero de documento'
									placeholder='000 000 0000'
								/>
								<InputComponent
									color
									required
									name='carrier.driver.phone'
									type='number'
									register={register}
									label='Numero de celular'
									placeholder='+57 000 000 0000'
								/>
							</div>
							{/* info container */}
							<h2 className='py-2 text-center'>INFORMACION DEL CONTENEDOR</h2>
							<div className='flex gap-4 flex-wrap'>
								<InputComponent
									color
									required
									name='carrier.information_container.licence_plate'
									type='text'
									register={register}
									label='Placa'
									placeholder='XXXXX'
								/>
								<InputComponent
									color
									required
									name='carrier.information_container.type'
									type='text'
									register={register}
									label='tipo de contenedor'
									placeholder='jhondue'
								/>
								<InputComponent
									color
									required
									name='carrier.information_container.number'
									type='number'
									register={register}
									label='Numero del contenedor'
									placeholder='000 000 0000'
								/>
							</div>
							{/* remarks */}
							<RemarksInput
								text='Quieres dar alguna indicacion adicional ?'
								register={register}
								nameRegister='remarks'
							/>
							{/* SEND FORM */}
							<div className='flex justify-center pt-6 '>
								<InputSubmitComponent text='CREAR SERVICIO' />
							</div>
						</form>
					</div>
				</div>
			</div>
		</APIProvider>
	)
}
