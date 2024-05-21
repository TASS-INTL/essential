import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'

import { InputComponent, InputSubmitComponent, LoaderComponent, SelectComponent } from '../../../Components'
import { useDevice } from '../ModuleDevices/hooks/useDevices'

export const FactoryDevicesScreen = () => {
	const { register, handleSubmit } = useForm()
	const { handleSyncDevice, fetchTypeDevice } = useDevice()

	const typeDevice = fetchTypeDevice()

	if (typeDevice?.isLoading) return <LoaderComponent />

	return (
		<div className='w-full py-5 px-8'>
			<div className='w-full max-w-6xl mx-auto'>
				<div className=' font-bold text-2xl flex justify-center'>Creacion de dispositivo de fabrica</div>
				<form
					onSubmit={handleSubmit((data, event) => {
						const filterObj = typeDevice?.data?.data?.filter((obj) => obj._id === data?.device_type?._id)
						data.device_type.name = filterObj[0]?.name
						data.device_type.name_consult = filterObj[0]?.name_consult
						handleSyncDevice(data, event)
					})}
					className=' w-2/3 m-auto'
				>
					<InputComponent required color register={register} name='did' type='text' label='did' />
					<InputComponent required color register={register} name='fv.value' type='text' label='fv' />
					<InputComponent required color register={register} name='imei' type='text' label='imei' />
					<InputComponent required color register={register} name='lote' type='text' label='lote' />
					<InputComponent required color register={register} name='mac' type='text' label='mac' />
					<InputComponent required color register={register} name='nickname' type='text' label='nickname' />
					<InputComponent required color register={register} name='simcard.iccid' type='text' label='iccid' />
					<InputComponent required color register={register} name='simcard.imsi' type='text' label='imsi' />
					<SelectComponent
						color
						required
						register={register}
						label='Selecciona el instalador'
						name='device_type._id'
						arrayOptions={typeDevice?.data?.data}
						option='name'
					/>
					<div className=' flex flex-row justify-center mt-10'>
						<InputSubmitComponent text='Enlazar' />
					</div>
				</form>
			</div>
		</div>
	)
}
