import { InputComponent, InputSubmitComponent } from '@/Components'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { logoTass } from '../../assets/assetsplatform/PrivateRoutes'
import imgBg2 from '../../assets/img/imgBg2.jpeg'
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
		<div className='w-full relative h-screen bg-red-50 flex'>
			<div className=' w-screen h-screen'>
				<img src={imgBg2} className='w-screen h-screen' alt='imegen de fondo' />
			</div>
			<div className='p-6 bg-white absolute right-0 w-3/6 h-screen flex flex-col justify-center'>
				<div className=' flex justify-center items-center py-2'>
					<img src={logoTass} width={390} alt='logoTass' />
				</div>
				<div className='mb-7'>
					<h2 className='text-md font-normal text-black py-2 text-center'>Inicia sesion</h2>
				</div>
				<form
					className='flex flex-col md:px-20'
					onSubmit={handleSubmit((data, event) => submitFormLogin(data, event))}
				>
					<InputComponent
						required
						name='email'
						type='email'
						register={register}
						label='Correo electronico'
						placeholder='name@gmail.com'
						color
					/>
					{errors.email && showToast('❌ Ingresa correctamente el email ', 'error')}
					<InputComponent
						label='Contraseña'
						register={register}
						name='password'
						required
						type='password'
						placeholder='•••••••••••'
						color
					/>
					{errors.password && showToast('❌ Debes ingresar de manera correcta la contraseña ', 'error')}

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
				<p className='text-md font-normal text-blue-500 underline py-2 text-center'>
					<Link to={pathNavigation.personalData}>¿Has olvidado la contraseña?</Link>
				</p>
			</div>
		</div>
	)
}
