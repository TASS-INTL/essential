import { InputComponent, InputSubmitComponent } from '@/Components'
import { Link } from 'react-router-dom'

import { email, lock } from '../../assets/assetsplatform/index'
import { MouseColorComponente } from '../../Components'
import { pathNavigation } from './constants'
import { useAuth } from './hooks/useLogin'

export const LoginScreen = () => {
	const { valuesLogin, handleValuesLogin, submitFormLogin } = useAuth()

	return (
		<MouseColorComponente>
			<div className='w-full items-center justify-center space-x-6'>
				<div className=' bg-primary min-h-screen p-6 flex flex-col items-center justify-center'>
					<div className='w-1/1 md:w-1/3 '>
						<div className='mb-7'>
							<h1 className='text-2xl font-bold text-white text-center'>TASS INTERNATIONAL</h1>
							<h2 className='text-md font-normal text-white py-2 text-center'>Inicia sesion</h2>
						</div>

						<form className='flex flex-col' action='' onSubmit={submitFormLogin}>
							<InputComponent
								label={'Correo electronico'}
								name={'email'}
								type={'email'}
								value={valuesLogin.email}
								onChange={handleValuesLogin}
								svg={email}
								placeholder='name@gmail.com'
							/>
							<InputComponent
								label={'Contraseña'}
								name={'password'}
								type={'password'}
								value={valuesLogin.password}
								onChange={handleValuesLogin}
								svg={lock}
								placeholder='•••••••••••'
							/>
							<div className='my-3 flex flex-row justify-center items-center'>
								<InputSubmitComponent text='Siguiente' />
							</div>
						</form>

						<p className='text-md font-normal text-blue-500 underline py-2 text-center'>
							<Link to={pathNavigation.register}>No tienes una cuenta? Registrate</Link>
						</p>
						<p className='text-md font-normal text-blue-500 underline py-2 text-center'>
							<Link to={pathNavigation.forgotPassword}>¿Has olvidado la contraseña?</Link>
						</p>
					</div>
				</div>
			</div>
		</MouseColorComponente>
	)
}
