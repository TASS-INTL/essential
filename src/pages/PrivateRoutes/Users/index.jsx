import React, { useState } from 'react'

import { SelectComponent } from '@/Components/Select'

import { Input, InputSubmit } from '../../../Components'
import { Modal } from '../../../Components/Modal'
import { typeDocument } from '../../auth/PersonalData'
import { useUsers } from '../Hooks/useUser'

export const Users = () => {
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
	const [flag, setFlag] = useState(false)
	const [methodForm, setMethodForm] = useState(true)

	if (fetchUserList.isLoading) return <div>loading .....</div>

	const onPressUpdateUser = (idUserUpdate) => {
		const userUpdate = fetchUserList?.data?.data[0]?.users?.find((element) => element._id === idUserUpdate)
		setInputs(userUpdate)
		setMethodForm(false)
		setFlag(true)
	}

	return (
		<div className='w-full bg-gray-100 bg-opacity-100'>
			<div className=' w-5/6 m-auto mt-8 bg-white rounded-1xl '>
				<div className='flex justify-between px-8 py-4'>
					<div className=' text-pretty text-xl text'>Usuarios</div>
					<button
						onClick={() => {
							setMethodForm(true)
							setFlag(!flag)
						}}
						className='bg-dark-purple shadow-lg shadow-dark-purple p2-4 px-5 rounded-sm text-white'
					>
						+ Craer
					</button>
				</div>
				<table className=' bg-slate-400 w-full p-16 justify-between'>
					<thead className=''>
						<tr className=''>
							<th className=''>Nombre</th>
							<th>Rol</th>
							<th>Actualizacion</th>
							<th>Actualizar</th>
							<th>Eliminar</th>
						</tr>
					</thead>
					<tbody>
						{fetchUserList?.data?.data[0]?.users?.map((list, index) => {
							return (
								<tr key={list._id} className=' bg-blue-500'>
									<td>{list.name} </td>
									<td>{list.email}</td>
									<td>{list.updated_at}</td>
									<td>
										<button
											onClick={() => {
												onPressUpdateUser(list._id)
											}}
											className=' bg-yellow-300 shadow-lg  p2-4 px-5 rounded-sm text-white'
										>
											Actualizar
										</button>
									</td>
									<td>
										<button
											onClick={() => handleDeleteUser(list._id)}
											className=' bg-red-500 shadow-lg  p2-4 px-5 rounded-sm text-white'
										>
											eliminar
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
			{flag && (
				<Modal
					closeModal={() => setFlag(!flag)}
					textModal={methodForm ? 'Creacion de nuevo Usuario' : 'Actlializacion de usuario'}
				>
					<form action='' onSubmit={methodForm ? handleCreateUser : handleUpdateUser}>
						<div className='grid grid-cols-2'>
							<Input
								type='text'
								name='name'
								label='Nombre'
								value={inputs.name}
								onChange={handleValuesCreateUser}
								error='Ocurrio un error en el address'
							/>
							<Input
								label={'Nombre de usuaria'}
								name={'username'}
								type={'text'}
								value={inputs.username}
								onChange={handleValuesCreateUser}
								error={'Ocurrio un error en el address'}
							/>
							<Input
								label={'Correo electronico'}
								name={'email'}
								type={'email'}
								value={inputs.email}
								onChange={handleValuesCreateUser}
								error={'Ocurrio un error en el email'}
							/>
							<Input
								label={'Direccion'}
								name={'address'}
								type={'text'}
								value={inputs.address}
								onChange={handleValuesCreateUser}
								error={'Ocurrio un error en el address'}
							/>
							<Input
								label={'Pais'}
								name={'country'}
								type={'text'}
								value={inputs.country}
								onChange={handleValuesCreateUser}
								error={'Ocurrio un error en el email'}
							/>
							<Input
								label={'Region'}
								name={'region'}
								type={'text'}
								value={inputs.region}
								onChange={handleValuesCreateUser}
								error={'Ocurrio un error en el address'}
							/>
							<Input
								label={'Ciudad'}
								name={'city'}
								type={'text'}
								value={inputs.city}
								onChange={handleValuesCreateUser}
								error={'Ocurrio un error en el email'}
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
							<Input
								label={'Numero documento personal'}
								name={'number_document_personal'}
								type={'text'}
								value={inputs.number_document_personal}
								onChange={handleValuesCreateUser}
								error={'Ocurrio un error en el number_document_personal'}
							/>
							<Input
								label={'Contraseña'}
								name={'key'}
								type={'password'}
								value={inputs.key}
								onChange={handleValuesCreateUser}
								error={'Ocurrio un error en el number_document_personal'}
							/>
						</div>
						<div className='my-3 flex flex-row justify-center items-center'>
							<InputSubmit text='Siguiente' />
						</div>
					</form>
				</Modal>
			)}
		</div>
	)
}
