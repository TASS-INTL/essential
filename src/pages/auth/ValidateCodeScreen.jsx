import React from 'react'

import { InputComponent, InputSubmitComponent } from '@/Components'
// Small utility to merge class names.
import { clsx } from 'clsx'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

import { logoTass } from '../../assets/assetsplatform/PrivateRoutes'
import imgBg2 from '../../assets/img/imgBg2.jpeg'
import { useAuth } from './hooks/useLogin'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const ValidateCodeScreen = () => {
	const { handleFormValidateCode, submitFormValidateCode, submitResendCode } = useAuth()

	const {
		state: { screen }
	} = useLocation()
	const { register, handleSubmit } = useForm()

	return (
		<div className='w-full relative h-screen bg-red-50 flex'>
			<div className=' w-screen h-screen'>
				<img src={imgBg2} className='w-screen h-screen' alt='imegen de fondo' />
			</div>
			<div className='p-6 bg-white absolute right-0 w-3/6 h-screen flex flex-col justify-center'>
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
					action='flex flex-col md:px-20'
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
				<p onClick={submitResendCode} className=' text-black text-center cursor-pointer hover:text-blue-300'>
					volver a enviar
				</p>
			</div>
		</div>
	)
}
