import React from 'react'

import { Input, InputSubmit } from '@/Components'
import { useLocation } from 'react-router-dom'

import { useAuth } from '../hooks/useLogin'

export const ValidateCode = () => {
	const { valueValidateCode, handleFormValidateCode, submitFormValidateCode, submitResendCode } = useAuth()
	const {
		state: { screen }
	} = useLocation()

	return (
		<div className='bg-gradient-to-r from-cyan-500 to-blue-500 w-full min-h-screen  items-center justify-center  space-x-6'>
			<div className='min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3'>
					<div className='mb-7'>
						<h1 className='text-4xl font-bold text-white text-center'>Validacion de codigo</h1>
						<h2 className='text-2xl font-bold text-white text-center'>ingresa el codigo</h2>
					</div>
					<form action='flex flex-col' onSubmit={(event) => submitFormValidateCode(event, screen)}>
						<Input
							label='Validacion de codigo'
							name='code'
							type='number'
							value={valueValidateCode.code}
							onChange={handleFormValidateCode}
							error={'Ocurrio un error en el codigo de verificacion'}
						/>
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmit text='Comprobar' />
						</div>
					</form>
					<p
						onClick={submitResendCode}
						className=' text-white text-center cursor-pointer hover:text-blue-300'
					>
						volver a enviar
					</p>
				</div>
			</div>
		</div>
	)
}
