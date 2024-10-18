import React from 'react'

import { ErrorComponent, InputComponent, InputSubmitComponent, LoaderComponent, SelectComponent } from '@/Components'
import { Container } from '@/Components/Container'
import { useForm } from 'react-hook-form'

import { useDevice } from './hooks/useDevicesFactory'

export const FactoryDevicesScreen = () => {
	const { register, handleSubmit } = useForm()
	const { handleSyncDevice, fetchTypeDevice } = useDevice()
	const typeDevice = fetchTypeDevice()

	if (typeDevice?.isLoading) return <LoaderComponent />

	if (typeDevice.isError) return <ErrorComponent error={typeDevice?.data?.message} />

	const handleSubmitCreateDevice = (data, event) => {
		const filterObj = typeDevice?.data?.data?.filter((obj) => obj._id === data?.device_type?._id)
		data.device_type.name = filterObj[0]?.name
		data.device_type.name_consult = filterObj[0]?.name_consult
		handleSyncDevice(data, event)
	}

	return (
		<Container>
			<div className='font-bold  text-xl flex justify-center'>Creacion de dispositivo de fabrica</div>
			<form onSubmit={handleSubmit(handleSubmitCreateDevice)} className=' w-2/3 m-auto'>
				<div className='flex gap-2'>
					<div className='w-1/2'>
						<InputComponent required color register={register} name='did' type='text' label='Did' />
					</div>
					<div className='w-1/2'>
						<InputComponent required color register={register} name='fv.value' type='text' label='Fv' />
					</div>
				</div>
				<div className='flex gap-2'>
					<div className='w-1/2'>
						<InputComponent required color register={register} name='imei' type='text' label='Imei' />
					</div>

					<div className='w-1/2'>
						<InputComponent required color register={register} name='lote' type='text' label='Lote' />
					</div>
				</div>
				<div className='flex gap-2'>
					<div className='w-1/2'>
						<InputComponent required color register={register} name='mac' type='text' label='Mac' />
					</div>
					<div className='w-1/2'>
						<InputComponent
							required
							color
							register={register}
							name='Nickname'
							type='text'
							label='nickname'
						/>
					</div>
				</div>
				<div className='flex gap-2'>
					<div className='w-1/2'>
						<InputComponent
							required
							color
							register={register}
							name='simcard.iccid'
							type='text'
							label='Iccid'
						/>
					</div>
					<div className='w-1/2'>
						<InputComponent
							required
							color
							register={register}
							name='simcard.imsi'
							type='text'
							label='Imsi'
						/>
					</div>
				</div>
				<SelectComponent
					color
					required
					register={register}
					label='Tipo de dispositivo'
					name='device_type._id'
					arrayOptions={typeDevice?.data?.data}
					option='name'
				/>
				<div className=' flex flex-row justify-center mt-3'>
					<InputSubmitComponent text='Enlazar' />
				</div>
			</form>
		</Container>
	)
}
