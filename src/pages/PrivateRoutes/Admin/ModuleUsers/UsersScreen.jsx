import React from 'react'

import { ErrorComponent, LoaderComponent } from '@/Components'
import { Container } from '@/Components/Container'
import { FormCreateUser } from '@/Components/FormCreateUser'

import { useUsers } from './Hooks/useUser'

export const UsersScreen = () => {
	//
	const {
		methodForm,
		userUpdate,
		modalVisible,
		handleOpen,
		handleCreateUser,
		handleDeleteUser,
		handleUpdateUser,
		onPressUpdateUser,
		onPressCreateUser,
		fetchUserList
	} = useUsers()

	if (fetchUserList.isLoading) return <LoaderComponent />

	if (fetchUserList.isError) return <ErrorComponent />

	return (
		<Container>
			<div className='m-auto mt-8 mx-16 rounded-1xl'>
				<div className='flex justify-between px-0 py-4 pt-10'>
					<h4 className=' text-pretty text-2xl'>Usuarios</h4>
					<button
						onClick={onPressCreateUser}
						className='bg-primary shadow-lg  p2-4 px-8 rounded-md text-white'
					>
						+ Craer Usuario
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
						{fetchUserList?.data?.data?.results?.users?.map((list, index) => {
							return (
								<div key={index} className=' flex flex-row py-2 '>
									<div className=' w-1/5 flex justify-start'>{list.name} </div>
									<div className=' w-2/5 flex justify-start'>{list.email}</div>
									<div className=' w-2/5 flex justify-start'>{list.updated_at}</div>
									<div className=' w-1/5 flex justify-start'>
										<button
											onClick={() => {
												onPressUpdateUser(list._id)
											}}
											className=' bg-white border-primary border-2 p2-4 px-5 rounded-sm text-primary'
										>
											Actualizar
										</button>
									</div>
									<div className=' w-1/5 flex justify-start'>
										<button
											onClick={() => {
												handleDeleteUser(list._id)
											}}
											className=' bg-red-600 border-primary border-2 p2-4 px-5 rounded-sm text-white'
										>
											Eliminar
										</button>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
			<FormCreateUser
				userUpdate={userUpdate}
				fetchUserList={fetchUserList}
				modalVisible={modalVisible}
				methodForm={methodForm}
				HandleClose={handleOpen}
				handleCreateUser={handleCreateUser}
				handleUpdateUser={handleUpdateUser}
			/>
		</Container>
	)
}
