import React from 'react'

import { useForm } from 'react-hook-form'

import { InputComponent, InputSubmitComponent, ModalComponent, SelectComponent } from '.'
import { typeDocument } from '../pages/auth/constants'

export const FormCreateUser = ({
	userUpdate,
	methodForm,
	modalVisible,
	HandleClose,
	fetchUserList,
	handleCreateUser,
	handleUpdateUser
}) => {
	const { register, handleSubmit } = useForm()

	const handleSendDataNewUser = (data, event) => {
		methodForm ? handleCreateUser(data, event) : handleUpdateUser({ ...data, _id: userUpdate._id }, event)
	}

	return (
		<>
			{modalVisible && (
				<ModalComponent
					handleOpen={modalVisible}
					HandleClose={HandleClose}
					titleModal={methodForm ? 'Creacion de nuevo Usuario' : 'Actlializacion de usuario'}
				>
					<form onSubmit={handleSubmit(handleSendDataNewUser)}>
						<div className='grid grid-cols-2 gap-5 mx-10'>
							<InputComponent
								color
								register={register}
								defaultValue={userUpdate?.name}
								required
								type='text'
								name='name'
								label='Nombre'
								placeholder='yondoe'
							/>
							<InputComponent
								color
								register={register}
								defaultValue={userUpdate?.username}
								required
								label='Nombre de usuari@'
								name='username'
								type='text'
								placeholder='yondoe99'
							/>
							<InputComponent
								color
								register={register}
								required
								label='Correo electronico'
								name='email'
								defaultValue={userUpdate?.email}
								type='email'
								placeholder='yondoe@gmail.com'
							/>
							<InputComponent
								color
								register={register}
								required
								defaultValue={userUpdate?.address}
								label='Direccion'
								name='address'
								type='text'
								placeholder='calle86sur#24-23'
							/>
							<InputComponent
								color
								defaultValue={userUpdate?.country}
								register={register}
								required
								label='Pais'
								name='country'
								type='text'
								placeholder='colombia'
							/>
							<InputComponent
								color
								defaultValue={userUpdate?.region}
								register={register}
								required
								label='Region'
								name='region'
								type='text'
								placeholder='Antioquia'
							/>
							<InputComponent
								color
								defaultValue={userUpdate?.city}
								register={register}
								required
								label='Ciudad'
								name='city'
								type='text'
								placeholder='Medellin'
							/>
							<SelectComponent
								register={register}
								label='Politicas'
								name='id_policies'
								arrayOptions={fetchUserList?.data?.data?.results?.policies}
								option='name'
							/>
							<SelectComponent
								register={register}
								label='Tipo de usuario'
								name='id_type_user'
								arrayOptions={fetchUserList?.data?.data?.results?.types_profiles}
								option='name'
							/>
							<SelectComponent
								register={register}
								label='Tipo de documento'
								name='type_document_personal'
								arrayOptions={typeDocument}
								option='name'
							/>
							<InputComponent
								color
								defaultValue={userUpdate?.number_document_personal}
								register={register}
								required
								label='Numero documento personal'
								name='number_document_personal'
								type='text'
								placeholder='000 0000 000'
							/>
							<InputComponent
								color
								register={register}
								required
								label='Contraseña'
								name='key'
								type='password'
								placeholder='•••••••••••'
							/>
						</div>
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmitComponent text='Crear usuario' />
						</div>
					</form>
				</ModalComponent>
			)}
		</>
	)
}
