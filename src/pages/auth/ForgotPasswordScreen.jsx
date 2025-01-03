import React from 'react'

import { logoTass } from '@/assets/assetsplatform/PrivateRoutes'
import { InputComponent, InputSubmitComponent } from '@/Components'
import { showToast } from '@/helpers/toast'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { pathNavigation } from './constants'
import { useAuth } from './hooks/useLogin'

export const ForgotPasswordScreen = () => {
	const { submitFormForgotPassword, register, handleSubmit, errors } = useAuth()

	return (
		<div className=' w-full min-h-screen  items-center justify-center  space-x-6'>
			<div className='min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3'>
					<div className=' flex justify-center items-center py-2'>
						<img src={logoTass} width={390} alt='logoTass' />
					</div>
					<div className='mb-7'>
						<h1 className='text-1xl font-bold text-blck text-center'>Recuperacion de contraseña</h1>
					</div>
					<form
						action='flex flex-col'
						onSubmit={handleSubmit((data, event) => submitFormForgotPassword(data, event))}
					>
						<h2 className='text-sm font-bold text-black text-center pb-2'>
							! Ingresa el correo electronico de la cuenta la cual deseas recuperar la contraseña. !
						</h2>
						<InputComponent
							colors
							required
							name='email'
							type='email'
							register={register}
							label='Correo electronico'
							placeholder='name@gmail.com'
						/>
						{errors.email && showToast('❌ Ingresa correctamente el email ', 'error')}
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmitComponent text='Enviar email' />
						</div>
					</form>
					<p className='text-md font-normal text-blue-500 underline  py-2 text-center'>
						<Link to={pathNavigation.login}>¿Te llego el correo? Inicia sesion</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
