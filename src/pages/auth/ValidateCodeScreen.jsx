import React, { useState } from 'react'

import { InputComponent, InputSubmitComponent } from '@/Components'
// Small utility to merge class names.
import { clsx } from 'clsx'
import { OTPInput } from 'input-otp'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { logoTass } from '../../assets/assetsplatform/PrivateRoutes'
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
		<div className=' min-h-screen  items-center justify-center  space-x-6'>
			<div className='min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3'>
					<div className=' flex justify-center items-center py-2'>
						<img src={logoTass} width={390} alt='logoTass' />
					</div>
					<div className='mt-7 mb-5'>
						<h1 className='text-2xl font-bold text-black text-center'>Validacion de codigo</h1>
						<h2 className='text-1xl font-bold text-black text-center'>
							Ingresa el codigo que hemos enviado a tu correo!
						</h2>
					</div>
					<form
						action='flex flex-col'
						onSubmit={handleSubmit((data, event) => submitFormValidateCode(data, event, screen))}
					>
						<InputComponent
							color
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
						className=' text-black text-center cursor-pointer hover:text-blue-300'
					>
						volver a enviar
					</p>
				</div>
			</div>
		</div>
	)
}
