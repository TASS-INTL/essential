import React from 'react'

import { useForm } from 'react-hook-form'

import { emailSvg, lock } from '../../../assets/assetsplatform'
import { InputComponent, InputSubmitComponent, ModalComponent, SelectComponent } from '../../../Components'
import { typeDocument } from '../../auth/constants'

export const FormCreateUser = ({
	userUpdate,
	fetchUserList,
	modalVisible,
	methodForm,
	handleCreateUser,
	handleUpdateUser
}) => {
	const { register, handleSubmit } = useForm()

	return (
		<>
			{modalVisible && (
				<ModalComponent textModal={methodForm ? 'Creacion de nuevo Usuario' : 'Actlializacion de usuario'}>
					<form
						onSubmit={handleSubmit((data, event) => {
							methodForm
								? handleCreateUser(data, event)
								: handleUpdateUser({ ...data, _id: userUpdate._id }, event)
						})}
					>
						<div className='grid grid-cols-2'>
							<InputComponent
								register={register}
								defaultValue={userUpdate?.name}
								required
								type='text'
								name='name'
								label='Nombre'
								placeholder='yondoe'
								svg={emailSvg}
							/>
							<InputComponent
								register={register}
								defaultValue={userUpdate?.username}
								required
								label='Nombre de usuari@'
								name='username'
								type='text'
								placeholder='yondoe99'
								svg={emailSvg}
							/>
							<InputComponent
								register={register}
								required
								label='Correo electronico'
								name='email'
								defaultValue={userUpdate?.email}
								type='email'
								placeholder='yondoe@gmail.com'
								svg={emailSvg}
							/>
							<InputComponent
								register={register}
								required
								defaultValue={userUpdate?.address}
								label='Direccion'
								name='address'
								type='text'
								placeholder='calle86sur#24-23'
								svg={emailSvg}
							/>
							<InputComponent
								defaultValue={userUpdate?.country}
								register={register}
								required
								label='Pais'
								name='country'
								type='text'
								placeholder='colombia'
								svg={emailSvg}
							/>
							<InputComponent
								defaultValue={userUpdate?.region}
								register={register}
								required
								label='Region'
								name='region'
								type='text'
								placeholder='Antioquia'
								svg={emailSvg}
							/>
							<InputComponent
								defaultValue={userUpdate?.city}
								register={register}
								required
								label='Ciudad'
								name='city'
								type='text'
								placeholder='Medellin'
								svg={emailSvg}
							/>
							<SelectComponent
								register={register}
								label='Politicas'
								name='id_policies'
								arrayOptions={fetchUserList?.data?.data[0].policies}
								valueId
							/>
							<SelectComponent
								register={register}
								label='Tipo de usuario'
								name='id_type_user'
								arrayOptions={fetchUserList?.data?.data[0].types_profiles}
								valueId
							/>
							<SelectComponent
								register={register}
								label='Tipo de documento'
								name='type_document_personal'
								arrayOptions={typeDocument}
							/>
							<InputComponent
								defaultValue={userUpdate?.number_document_personal}
								register={register}
								required
								label='Numero documento personal'
								name='number_document_personal'
								type='text'
								placeholder='0000000000'
								svg={emailSvg}
							/>
							<InputComponent
								register={register}
								required
								label='Contraseña'
								name='key'
								type='password'
								placeholder='•••••••••••'
								svg={lock}
							/>
						</div>
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmitComponent text='Siguiente' />
						</div>
					</form>
				</ModalComponent>
			)}
		</>
	)
}
