import { Input, InputSubmit } from '@/Components'
import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useLogin'

export const Login = () => {
	const { valuesLogin, handleValuesLogin, submitFormLogin } = useAuth()

	return (
		<div className='w-full min-h-screen  items-center justify-center  space-x-6'>
			<div className=' bg-dark-purple min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3 '>
					<div className='mb-7'>
						<h1 className='text-2xl font-bold text-white text-center'>TASS INTERNATIONAL</h1>
						<h2 className='text-md font-normal text-white py-2 text-center'>Inicia sesion</h2>
					</div>
					<form className='flex flex-col' action='' onSubmit={submitFormLogin}>
						<Input
							label={'Correo electronico'}
							name={'email'}
							type={'email'}
							value={valuesLogin.email}
							onChange={handleValuesLogin}
							error={'Ocurrio un error en el email'}
						/>
						<Input
							label={'Contraseña'}
							name={'password'}
							type={'password'}
							value={valuesLogin.password}
							onChange={handleValuesLogin}
							error={'Ocurrio un error en el email'}
						/>
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmit text='Siguiente' />
						</div>
					</form>
					<p className='text-md font-normal text-white py-2 text-center'>
						<Link to={'/auth/register'}>No tienes una cuenta? Registrate</Link>
					</p>
					<p className='text-md font-normal  text-white py-2 text-center'>
						<Link to={'/auth/forgot-password'}>¿Ha olvidado la contraseña?</Link>
					</p>
					{/* BORRAR */}
					{/* <p className='text-md font-normal  text-white py-2 text-center'>
						<Link to={'/dashboard'}>¿Ha olvidado la contraseña?</Link>
					</p> */}
				</div>
			</div>
		</div>
	)
}
