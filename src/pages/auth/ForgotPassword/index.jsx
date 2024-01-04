import React from 'react'

import { Input, InputSubmit } from '../../../Components'
import { useAuth } from '../hooks/useLogin'

export const ForgotPassword = () => {
	const { values, handleValues, submitForm } = useAuth()

	return (
		<>
			<div className='container'>
				<header>
					<h1 className='title'>Recuperacion de contraseña</h1>
				</header>
				<div>
					<div className='card'>
						<form action='' onSubmit={submitForm}>
							<Input
								label={'email'}
								name={'email'}
								type={'text'}
								value={values.email}
								onChange={handleValues}
								error={'Ocurrio un error en el email'}
							/>
							<div className='contentButton'>
								<InputSubmit text='enviar email' />
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
