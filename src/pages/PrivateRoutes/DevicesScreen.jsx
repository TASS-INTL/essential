import React from 'react'

import { useForm } from 'react-hook-form'

import { InputComponent, InputSubmitComponent, SelectComponent } from '../../Components'
import { typeStatus } from './constants'
import { useDevice } from './Hooks/useDevices'

export const DevicesScreen = () => {
	const { register, handleSubmit } = useForm()

	const { handleCreateUser } = useDevice()

	return (
		<div className='h-screen flex-1 p-7'>
			<h1 className='text-2xl font-semibold '>DevicesScreen</h1>

			<div className=' '>
				<form action='' onSubmit={handleSubmit((data, event) => handleCreateUser(data, event))}>
					<InputComponent required register={register} name='description' type='text' label='description' />
					<InputComponent required register={register} name='did' type='text' label='id dispositivo' />
					<InputComponent required register={register} name='nickname' type='text' label='nickname' />
					<SelectComponent register={register} label='estado' name='status' arrayOptions={typeStatus} />
					<div className=' flex flex-row justify-center mb-9'>
						<InputSubmitComponent text='crear' />
					</div>
				</form>
			</div>
		</div>
	)
}
