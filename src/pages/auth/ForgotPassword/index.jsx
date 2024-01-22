import React from 'react'

import { Input, InputSubmit } from '@/Components'
import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useLogin'

export const ForgotPassword = () => {
	const { valuesForgot, submitFormForgotPassword, handleForgotPassword } = useAuth()

	return (
		<div className='bg-dark-purple w-full min-h-screen  items-center justify-center  space-x-6'>
			<div className='min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3'>
					<div className='mb-7'>
						<h1 className='text-4xl font-bold text-white text-center'>Recuperacion de contraseña</h1>
					</div>
					<form action='flex flex-col' onSubmit={submitFormForgotPassword}>
						<h2 className='text-sm font-bold text-white text-center'>
							Ingresa el correo electronico de la cuenta de la cual deseas recuperar la contraseña
						</h2>
						<Input
							label={'Correo electronico'}
							name={'email'}
							type={'text'}
							value={valuesForgot.email}
							onChange={handleForgotPassword}
							error={'Ocurrio un error en el email'}
						/>
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmit text='Enviar email' />
						</div>
					</form>
					<p className='text-md font-normal text-white py-2 text-center'>
						<Link to={'/auth/login'}>¿Te llego el correo? Inicia sesion</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
