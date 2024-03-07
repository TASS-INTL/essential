import { InputComponent, InputSubmitComponent } from '@/Components'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { emailSvg, user } from '../../assets/assetsplatform/index'
import { pathNavigation } from './constants'
import { useAuth } from './hooks/useLogin'

export const RegisterScreen = () => {
	const { submitFormRegister } = useAuth()
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	return (
		<div className='w-full min-h-screen  items-center justify-center  space-x-6'>
			<div className='bg-primary min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3 '>
					<div className='mb-7'>
						<h1 className='text-4xl font-bold text-white text-center'>Registrate</h1>
					</div>
					<form
						className='flex flex-col'
						action=''
						onSubmit={handleSubmit((data, event) => submitFormRegister(data, event))}
					>
						<InputComponent
							required
							name='email'
							type='text'
							svg={emailSvg}
							register={register}
							label='Correo electronico'
							placeholder='correo@gmail.com'
						/>

						<InputComponent
							required
							label='Nombre de usuario'
							name='username'
							type='text'
							svg={user}
							placeholder='name123'
							register={register}
						/>

						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmitComponent text='Verificar' />
						</div>
					</form>
					<p className='text-md font-normal text-blue-500 underline py-2 text-center'>
						<Link to={pathNavigation.login}> ¿Ya tienes una cuenta? Inicia sesion</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
