import './style.css'

import { Link } from 'react-router-dom'

import { Input, InputSubmit } from '../../../Components'
import { useAuth } from '../hooks/useLogin'

export const Register = () => {
	const { valuesRegister, handleRegister, submitFormRegister } = useAuth()

	return (
		<div className='container-register'>
			<div className='d-f j-c a-c'>
				<h2 className='subtitle'>Registro</h2>
			</div>
			<div className='card d-f j-c a-c'>
				<form action='' onSubmit={submitFormRegister}>
					<Input
						label={'email'}
						name={'email'}
						type={'text'}
						value={valuesRegister.email}
						onChange={handleRegister}
						error={'Ocurrio un error en el email'}
					/>
					<Input
						label={'nombre de la cuenta'}
						name={'username'}
						type={'text'}
						value={valuesRegister.username}
						onChange={handleRegister}
						error={'Ocurrio un error en el email'}
					/>
					<div className='contentButton'>
						<InputSubmit text='Verificar la direccion de correo electronico' />
					</div>
					<p className='d-f j-c a-c'>
						<Link to={'/auth/login'}>iniciar session con una cuenta existente</Link>
					</p>
				</form>
			</div>
		</div>
	)
}
