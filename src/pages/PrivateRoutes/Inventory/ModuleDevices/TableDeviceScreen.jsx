import React from 'react'

import { ErrorComponent, LoaderComponent, TitleWithLive } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { InputSearch } from '@/Components/InputSearch'
import { deviceStore } from '@/store/deviceStore'
import { userStore } from '@/store/userStore'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export const TableDeviceScreen = () => {
	const { register, handleSubmit } = useForm()
	const arrayTabledevice = deviceStore((state) => state.arrayTabledevice)

	const userData = userStore((state) => state.userData)

	const handlePagination = (data) => {}

	if (arrayTabledevice === null) return <LoaderComponent />

	if (arrayTabledevice?.error) return <ErrorComponent error={arrayTabledevice.message} />

	return (
		<div className='px-16 py-4'>
			<div className='flex justify-between px-0 py-3 pt-2'>
				<Link
					to={
						userData.typeUser === 'factory'
							? '/user/devices-screen/factory-devices-screen'
							: '/user/devices-screen/assign-device-screen'
					}
					className='p-2 bg-black text-white rounded-lg flex justify-center items-center'
				>
					{userData.typeUser === 'factory' ? 'crear dispositivo' : 'Asignar dispositivo'}
				</Link>
				<div className='relative'>
					<form onSubmit={handleSubmit(handlePagination)}>
						<InputSearch register={register} />
					</form>
				</div>
			</div>
			<TitleWithLive title='DISPOSITIVOS' inLive />
			{arrayTabledevice.results.length > 0 && (
				<BoardDevice dataBody={arrayTabledevice?.results} to='devices-screen/device' />
			)}
		</div>
	)
}
