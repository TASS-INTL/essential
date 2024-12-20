import { logoTass } from '@/assets/assetsplatform/PrivateRoutes'
import { InputComponent, InputSubmitComponent } from '@/Components'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { pathNavigation } from './constants'
import { useAuth } from './hooks/useLogin'

export const RegisterScreen = () => {
	const { submitFormRegister } = useAuth()
	const { register, handleSubmit } = useForm()

	return (
		<div className='w-full min-h-screen  items-center justify-center  space-x-6'>
			<div className=' min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3 '>
					<div className=' flex justify-center items-center py-4'>
						<img src={logoTass} width={390} alt='logoTass' />
					</div>
					<div className='mb-7 mt-5'>
						<h1 className='text-4xl font-bold text-black text-center'>Regístrate</h1>
					</div>
					<form
						className='flex flex-col'
						action=''
						onSubmit={handleSubmit((data, event) => submitFormRegister(data, event))}
					>
						<InputComponent
							color
							required
							type='text'
							name='email'
							register={register}
							label='Correo electronico'
							placeholder='correo@gmail.com'
						/>
						<InputComponent
							color
							required
							type='text'
							name='username'
							register={register}
							placeholder='name123'
							label='Nombre de usuario'
						/>
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmitComponent text='Verificar' />
						</div>
					</form>
					<p className='text-md font-normal text-blue-500 underline py-2 text-center'>
						<Link to={pathNavigation.login}> ¿Ya tienes una cuenta? Inicia sesion</Link>
					</p>
					<p className='text-md font-normal text-blue-500 underline py-2 text-center'>
						<Link to={pathNavigation.personalData}> ¿Ya tienes una cuenta? Inicia sesion</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
