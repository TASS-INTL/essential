import './style.css'

import React from 'react'

import { useLocation } from 'react-router-dom'

import { Input, InputSubmit } from '../../../Components'
import { useAuth } from '../hooks/useLogin'

export const ValidateCode = () => {
	const { valueValidateCode, handleFormValidateCode, submitFormValidateCode } = useAuth()
	const {
		state: { screen }
	} = useLocation()

	return (
		<>
			<div className='container'>
				<div className='d-f j-c a-c f-d-c'>
					<h1 className='title'>Validacion de codigo</h1>
					<h2 className='subtitle'>ingresa el codigo</h2>
				</div>
				<div className='card d-f j-c a-c'>
					<form action='' onSubmit={(event) => submitFormValidateCode(event, screen)}>
						<Input
							label={'Validacion de codigo'}
							name={'code'}
							type={'text'}
							value={valueValidateCode.code}
							onChange={handleFormValidateCode}
							error={'Ocurrio un error en el codigo de verificacion'}
						/>
						<div className='contentButton'>
							<InputSubmit text='Comprobar' />
						</div>
					</form>
					{/* <button onClick={() => ResendCode()} className="contentButton mt-2">
            volver a enviar
          </button> */}
				</div>
			</div>
		</>
	)
}
