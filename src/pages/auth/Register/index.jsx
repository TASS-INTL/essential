import { Input, InputSubmit } from '@/Components'
import { Link } from 'react-router-dom'

import { useAuth } from '../hooks/useLogin'

export const Register = () => {
	const { valuesRegister, handleRegister, submitFormRegister } = useAuth()

	return (
		<div className='w-full min-h-screen  items-center justify-center  space-x-6'>
			<div className='bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen p-6 flex flex-col items-center justify-center'>
				<div className='w-1/1 md:w-1/3 '>
					<div className='mb-7'>
						<h1 className='text-4xl font-bold text-white text-center'>Registro</h1>
					</div>
					<form className='flex flex-col' action='' onSubmit={submitFormRegister}>
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
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmit text='Verificar' />
						</div>
					</form>
					<p className='text-md font-normal text-white py-2 text-center'>
						<Link to={'/auth/login'}>Iniciar sesion con una cuenta existente</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
