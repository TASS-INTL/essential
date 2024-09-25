import React, { useState } from 'react'

import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { APIProvider } from '@vis.gl/react-google-maps'
import { MdOutlineReadMore } from 'react-icons/md'

import { InputComponent, InputSubmitComponent, ModalComponent, SelectComponent } from '../../../../Components'
import { MapGoogle } from '../../../../Components/mapGoogle/Map'
import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { CreateRouting } from '../../Routing/ModuleRouting'
import { useServiceClient } from './hooks/useServiceClient'

// ============ Creacion de servicio ================

// para crear un servicio se hace hacen los siguientes pasos

// consultar los selects
//    los tipos de dispositivos ---> id, name
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

const jsonService = {
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

export const CreateService = () => {
	const {
		open,
		data,
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

	const [mapReference, setMapReference] = useState(null)

	return (
		<div className='pt-2 px-2 h-[95%]'>
			{open && (
				<ModalComponent handleOpen={open} HandleClose={handleOpen} titleModal='Creacion de ruta'>
					<CreateRouting />
				</ModalComponent>
			)}
			<APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
				<div className='flex h-full'>
					<div className='w-[40%]'>
						<MapGoogle dataRoute={data} setMapReference={setMapReference} />
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
							{/* select routing */}
							<div className='flex mt-5  justify-between'>
								<div className='w-[70%] flex  items-center'>
									<SelectComponent
										color
										option='name_routing'
										name='id_route'
										register={register}
										label='Rutas'
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
										name='service.did'
										register={register}
										label='tipo de servicio'
										arrayOptions={typesServices}
									/>
								</div>
								<div className='w-[48%]'>
									<SelectComponent
										color
										register={register}
										label='Selecciona el dispositivo'
										name='device.id_device'
										arrayOptions={typesDevices}
										option='name'
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
										name='carrier.number'
										type='number'
										register={register}
										label='Numero de celular'
										placeholder='+57 000 000 0000'
									/>
								</div>
							</div>
							{/* dates driver  */}
							<h2 className='py-2 text-center'>DATOS DEL CONDUCTOR</h2>
							<div className='flex gap-4 flex-wrap'>
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
									name='carrier.driver.license_plate'
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
									name='carrier.information_container.license_plate'
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
