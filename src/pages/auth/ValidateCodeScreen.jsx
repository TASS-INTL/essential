import React, { useState } from 'react'

import { InputComponent, InputSubmitComponent } from '@/Components'
// Small utility to merge class names.
import { clsx } from 'clsx'
import { OTPInput } from 'input-otp'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { useAuth } from './hooks/useLogin'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const ValidateCodeScreen = () => {
	const { valueValidateCode, handleFormValidateCode, submitFormValidateCode, submitResendCode } = useAuth()
	const [counter, setCounter] = useState('')

	const {
		state: { screen }
	} = useLocation()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	return (
		<div className='bg-primary min-h-screen  items-center justify-center  space-x-6'>
			<div className='min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3'>
					<div className='mb-7'>
						<h1 className='text-4xl font-bold text-white text-center'>Validacion de codigo</h1>
						<h2 className='text-2xl font-bold text-white text-center'>ingresa el codigo</h2>
					</div>
					<form
						action='flex flex-col'
						onSubmit={handleSubmit((data, event) => submitFormValidateCode(data, event, screen))}
					>
						<InputComponent
							register={register}
							label='Validacion de codigo'
							name='code'
							type='number'
							onChange={handleFormValidateCode}
							error={'Ocurrio un error en el codigo de verificacion'}
						/>
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmitComponent text='Comprobar' />
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
