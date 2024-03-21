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
		<div className='bg-gray-800 w-full py-5 px-8'>
			<div className='w-full max-w-6xl mx-auto'>
				<form action='' onSubmit={handleSubmit((data, event) => handleSyncDevice(data, event))}>
					<InputComponent required register={register} name='did' type='text' label='did' />
					<InputComponent required register={register} name='fv' type='text' label='fv' />
					<InputComponent required register={register} name='imei' type='text' label='imei' />
					<InputComponent required register={register} name='lote' type='text' label='lote' />
					<InputComponent required register={register} name='mac' type='text' label='mac' />
					<InputComponent register={register} name='nickname' type='text' label='nickname' />
					<InputComponent required register={register} name='simcard.iccid' type='text' label='iccid' />
					<InputComponent required register={register} name='simcard.imsi' type='text' label='imsi' />
					<div className=' flex flex-row justify-center mb-9'>
						<InputSubmitComponent text='Enlazar' />
					</div>
				</form>
			</div>
		</div>
	)
}
