import React, { useState } from 'react'

import { usersStore } from '@/store/usersStore'

import { FormCreateUser } from './components'
import { useUsers } from './Hooks/useUser'

export const UsersScreen = () => {
	const { fetchDataUser, handleCreateUser, handleUpdateUser } = useUsers()

	const fetchUserList = fetchDataUser()
	const [methodForm, setMethodForm] = useState(true)
	const modalVisible = usersStore((state) => state.modal)
	const setModalVisible = usersStore((state) => state.setModalVisible)
	const [userUpdate, setUserUpdate] = useState(null)

	if (fetchUserList.isLoading) return <div>loading .....</div>

	const onPressUpdateUser = (idUserUpdate) => {
		const userUpdate = fetchUserList?.data?.data[0]?.users?.find((element) => element._id === idUserUpdate)
		setUserUpdate(userUpdate)
		setMethodForm(false)
		setModalVisible(true)
	}

	const onPressCreateUser = () => {
		setMethodForm(true)
		setModalVisible(true)
	}

	return (
		<div className='w-full bg-opacity-100'>
			<div className=' w-11/12 m-auto mt-8 rounded-1xl '>
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
						{fetchUserList?.data?.data?.results?.users?.map((list, index) => {
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
				handleCreateUser={handleCreateUser}
				handleUpdateUser={handleUpdateUser}
			/>
		</div>
	)
}
