import { InputComponent, InputSubmitComponent } from '@/Components'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { emailSvg, lock } from '../../assets/assetsplatform/index'
import { MouseColorComponente } from '../../Components'
import { showToast } from '../../helpers/toast'
import { pathNavigation } from './constants'
import { useAuth } from './hooks/useLogin'

export const LoginScreen = () => {
	const { submitFormLogin } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	return (
		<MouseColorComponente>
			<div className='w-full items-center justify-center space-x-6'>
				<div className=' bg-primary min-h-screen p-6 flex flex-col items-center justify-center'>
					<div className='w-1/1 md:w-1/3 '>
						<div className='mb-7'>
							<h1 className='text-2xl font-bold text-white text-center'>TASS INTERNATIONAL</h1>
							<h2 className='text-md font-normal text-white py-2 text-center'>Inicia sesion</h2>
						</div>

						<form
							className='flex flex-col'
							action=''
							onSubmit={handleSubmit((data, event) => {
								submitFormLogin(data, event)
							})}
						>
							<InputComponent
								required
								name='email'
								type='email'
								value='email'
								svg={emailSvg}
								register={register}
								label='Correo electronico'
								placeholder='name@gmail.com'
							/>
							{errors.email && showToast('❌ Ingresa correctamente el email ', 'error')}

							<InputComponent
								label='Contraseña'
								register={register}
								name='password'
								required
								type='password'
								value='password'
								svg={lock}
								placeholder='•••••••••••'
							/>
							{errors.password &&
								showToast('❌ Debes ingresar de manera correcta la contraseña ', 'error')}

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
