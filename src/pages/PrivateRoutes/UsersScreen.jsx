import React, { useState } from 'react'

import { InputComponent, InputSubmitComponent, ModalComponent, SelectComponent } from '@/Components'
import { usersStore } from '@/store/usersStore'

import { typeDocument } from '../auth/PersonalDataScreen'
import { useUsers } from './Hooks/useUser'

export const UsersScreen = () => {
	const {
		inputs,
		setInputs,
		fetchDataUser,
		handleValuesCreateUser,
		handleCreateUser,
		handleDeleteUser,
		handleUpdateUser
	} = useUsers()

	const fetchUserList = fetchDataUser()
	const [methodForm, setMethodForm] = useState(true)
	const modalVisible = usersStore((state) => state.modal)
	const setModalVisible = usersStore((state) => state.setModalVisible)

	if (fetchUserList.isLoading) return <div>loading .....</div>

	const onPressUpdateUser = (idUserUpdate) => {
		const userUpdate = fetchUserList?.data?.data[0]?.users?.find((element) => element._id === idUserUpdate)
		setInputs(userUpdate)
		setMethodForm(false)
		setModalVisible(true)
	}

	const onPressCreateUser = () => {
		setMethodForm(true)
		setModalVisible(true)
	}

	return (
		<div className='w-full bg-opacity-100'>
			<div className=' w-11/12 m-auto mt-8  rounded-1xl '>
				<div className='flex justify-between px-0 py-4 pt-10'>
					<h4 className=' text-pretty text-2xl'>Usuarios</h4>
					<button
						onClick={onPressCreateUser}
						className='bg-dark-purple shadow-lg  p2-4 px-8 rounded-md text-white'
					>
						+ Craer
					</button>
				</div>
				<div className='bg-zinc-100 py-5 '>
					<div className=' flex justify-between items-center px-6 '>
						<strong className=''>Nombre</strong>
						<strong>Correo</strong>
						<strong>U.Actualizacion</strong>
						<strong></strong>
						<strong></strong>
					</div>
					<div className='border-2 border-l-blue-600 border-black mt-3 py-3 px-3 '>
						{fetchUserList?.data?.data[0]?.users?.map((list, index) => {
							return (
								<div key={index} className=' flex flex-row '>
									<div className=' w-1/5 flex justify-start '>{list.name} </div>
									<div className=' w-2/5 flex justify-start '>{list.email}</div>
									<div className=' w-2/5 flex justify-start '>{list.updated_at}</div>
									<div className=' w-1/5 flex justify-start '>
										<button
											onClick={() => {
												onPressUpdateUser(list._id)
											}}
											className=' bg-white border-dark-purple border-2 p2-4 px-5 rounded-sm text-dark-purple'
										>
											Actualizar
										</button>
									</div>
									{/* <div className=' w-1/5 flex justify-start border-2 border-black'>
									<button
										onClick={() => handleDeleteUser(list._id)}
										className=' bg-red-500 shadow-lg  p2-4 px-5 rounded-sm text-white'
									>
										eliminar
									</button>
								</div> */}
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{modalVisible && (
				<ModalComponent textModal={methodForm ? 'Creacion de nuevo Usuario' : 'Actlializacion de usuario'}>
					<form onSubmit={methodForm ? handleCreateUser : handleUpdateUser}>
						<div className='grid grid-cols-2'>
							<InputComponent
								type='text'
								name='name'
								label='Nombre'
								value={inputs.name}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el address'
							/>
							<InputComponent
								label='Nombre de usuaria'
								name='username'
								type='text'
								value={inputs.username}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el address'
							/>
							<InputComponent
								label='Correo electronico'
								name='email'
								type='email'
								value={inputs.email}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el email'
							/>
							<InputComponent
								label='Direccion'
								name='address'
								type='text'
								value={inputs.address}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el address'
							/>
							<InputComponent
								label='Pais'
								name='country'
								type='text'
								value={inputs.country}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el email'
							/>
							<InputComponent
								label='Region'
								name='region'
								type='text'
								value={inputs.region}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el address'
							/>
							<InputComponent
								label='Ciudad'
								name='city'
								type='text'
								value={inputs.city}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el email'
							/>
							<div>
								<label className='mt-2 block text-sm font-medium leading-6 text-white' htmlFor=''>
									tipo de personas
								</label>
								<div className='relative rounded-md shadow-sm'>
									<select
										onChange={(event) => {
											handleValuesCreateUser('id_policies', event.target.value)
										}}
										value={inputs.id_policies}
										name={inputs.id_policies}
										className='block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									>
										{fetchUserList?.data?.data[0].policies.map((option) => {
											return (
												<option key={option._id} value={option._id}>
													{option.name}
												</option>
											)
										})}
									</select>
								</div>
							</div>
							<div>
								<label className='mt-2 block text-sm font-medium leading-6 text-white' htmlFor=''>
									tipo de personas
								</label>
								<div className='relative rounded-md shadow-sm'>
									<select
										onChange={(event) => {
											handleValuesCreateUser('id_type_user', event.target.value)
										}}
										value={inputs.id_type_user}
										name={inputs.id_type_user}
										className='block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									>
										{fetchUserList?.data?.data[0].types_profiles.map((option) => {
											return (
												<option key={option._id} value={option._id}>
													{option.name}
												</option>
											)
										})}
									</select>
								</div>
							</div>
							<SelectComponent
								label='Tipo de documento'
								handlePersonalData={handleValuesCreateUser}
								value={inputs.type_document_personal}
								name='select-type_document_personal'
								arrayOptions={typeDocument}
								valueChange={'type_document_personal'}
							/>
							<InputComponent
								label='Numero documento personal'
								name='number_document_personal'
								type='text'
								value={inputs.number_document_personal}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el number_document_personal'
							/>
							<InputComponent
								label='Contraseña'
								name='key'
								type='password'
								value={inputs.key}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el number_document_personal'
							/>
						</div>
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmitComponent text='Siguiente' />
						</div>
					</form>
				</ModalComponent>
			)}
		</div>
	)
}
