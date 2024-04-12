import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { InputComponent, InputSubmitComponent, LoaderComponent, SelectComponent } from '../../Components'
import { useDevice } from './Hooks/useDevices'

const dataDevice = {
	did: 'TA000200',
	nickname: 'TA000200',
	fv: {
		value: '1.0'
	},
	simcard: {
		iccid: '8988303000008064149',
		imsi: '295050902815128'
	},
	lote: '0001',
	mac: 'ABDF-34FA-45GA-23CB',
	imei: '023123',
	device_type: {
		_id: '66194be465a98489f190abfd',
		name: 'Olympo_E-Seal',
		name_consult: 'Olympo Gauya'
	}
}

const deviceType = [
	{
		_id: 'oooooooooo',
		name: 'Olympo_E-Seal',
		name_consult: 'Olympo Gauya'
	},
	{
		_id: 'iiiiiiiiiiiii',
		name: 'Olympo_E-iiii',
		name_consult: 'Olympo temperatura'
	},
	{
		_id: 'uuuuuuuuuuuuu',
		name: 'Olympo_E-uuuuu',
		name_consult: 'Olympo Moto'
	}
]

export const FactoryDevicesScreen = () => {
	const { register, handleSubmit, watch } = useForm()
	const { handleSyncDevice, fetchTypeDevice } = useDevice()
	const [objTypeDevice, setObjTypeDevice] = useState(null)

	const typeDevice = fetchTypeDevice()

	if (typeDevice.isLoading) return <LoaderComponent />

	// console.log(typeDevice?.data)

	return (
		<div className='w-full py-5 px-8'>
			<div className='w-full max-w-6xl mx-auto'>
				<div className=' font-bold text-2xl flex justify-center'>Creacion de dispositivo de fabrica</div>
				<form
					action=''
					onSubmit={handleSubmit((data, event) => {
						data.device_type = objTypeDevice
						console.log(data)
						// handleSyncDevice(dataDevice, event)
						// handleSyncDevice(data, event)
					})}
					className=' w-2/3 m-auto'
				>
					<InputComponent color register={register} name='did' type='text' label='did' />
					<InputComponent color register={register} name='fv' type='text' label='fv' />
					<InputComponent color register={register} name='imei' type='text' label='imei' />
					<InputComponent color register={register} name='lote' type='text' label='lote' />
					<InputComponent color register={register} name='mac' type='text' label='mac' />
					<InputComponent color register={register} name='nickname' type='text' label='nickname' />
					<InputComponent color register={register} name='simcard.iccid' type='text' label='iccid' />
					<InputComponent color register={register} name='simcard.imsi' type='text' label='imsi' />
					{/* <SelectComponent
						valueId
						name='type_device._id'
						register={register}
						label='Tipo de dispositivo'
						arrayOptions={typeDevice?.data?.data}
					/> */}
					<div>
						<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Tipo de dispositivo
						</label>
						<div className='relative rounded-md shadow-sm'>
							<select
								onChange={(event) => {
									const filterObj = deviceType.filter((obj) => obj._id === event.target.value)
									setObjTypeDevice(filterObj[0])
								}}
								className='border text-sm rounded-lg  block w-full ps-10 p-2.5  bg-black border-gray-600 placeholder-gray-400 text-white focus:ring-offset-gray-400 '
							>
								{deviceType.map((option) => (
									<option key={option._id} value={option._id}>
										{option.name}
									</option>
								))}
							</select>
						</div>
					</div>
					<div className=' flex flex-row justify-center mt-10'>
						<InputSubmitComponent text='Enlazar' />
					</div>
				</form>
			</div>
		</div>
	)
}
