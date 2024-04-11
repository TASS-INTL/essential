import React from 'react'

import { useForm } from 'react-hook-form'

import { InputComponent, InputSubmitComponent } from '../../Components'
import { useDevice } from './Hooks/useDevices'

const data = {
	did: 'TA00012',
	nickname: '',
	fv: '1.0',
	simcard: {
		iccid: '8988303000008064149',
		imsi: '295050902815128'
	},
	lote: '9000',
	mac: 'ABDF-34FA-45GA-23CB',
	imei: '023123'
}

export const FactoryDevicesScreen = () => {
	const { register, handleSubmit } = useForm(data)
	const { handleSyncDevice } = useDevice()

	return (
		<div className='w-full py-5 px-8'>
			<div className='w-full max-w-6xl mx-auto'>
				<div className=' font-bold text-2xl flex justify-center'>Creacion de dispositivo de fabrica</div>
				<form
					action=''
					onSubmit={handleSubmit((data, event) => handleSyncDevice(data, event))}
					className=' w-2/3 m-auto'
				>
					<InputComponent color required register={register} name='did' type='text' label='did' />
					<InputComponent color required register={register} name='fv' type='text' label='fv' />
					<InputComponent color required register={register} name='imei' type='text' label='imei' />
					<InputComponent color required register={register} name='lote' type='text' label='lote' />
					<InputComponent color required register={register} name='mac' type='text' label='mac' />
					<InputComponent color register={register} name='nickname' type='text' label='nickname' />
					<InputComponent color required register={register} name='simcard.iccid' type='text' label='iccid' />
					<InputComponent color required register={register} name='simcard.imsi' type='text' label='imsi' />
					<div className=' flex flex-row justify-center mt-10'>
						<InputSubmitComponent text='Enlazar' />
					</div>
				</form>
			</div>
		</div>
	)
}
