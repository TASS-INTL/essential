import React from 'react'

import { useDevice } from './hooks/useDevices'
import { InputComponent, InputSubmitComponent, SelectComponent } from '@/Components'
import { typeStatus } from '../../constants/constants'

export const FormAssignDeviceScreen = () => {
	const { handleAssignDevice, handleSubmit, register } = useDevice()

	return (
		<div className='h-screen flex-1 p-7'>
			<h1 className=' text-xl font-bold text-center py-5'>Asignacion de dispositivo</h1>
			<form action='' onSubmit={handleSubmit((data, event) => handleAssignDevice(data, event))}>
				<InputComponent color required register={register} name='description' type='text' label='Description' />
				<InputComponent color required register={register} name='did' type='text' label='Id dispositivo' />
				<InputComponent
					color
					required
					register={register}
					name='nickname'
					type='text'
					label='Nickname ( opcional )'
				/>
				<SelectComponent
					color
					register={register}
					label='estado'
					name='status'
					arrayOptions={typeStatus}
					option='name'
				/>
				<div className=' flex flex-row justify-center my-5'>
					<InputSubmitComponent text='Asignar' />
				</div>
			</form>
		</div>
	)
}
