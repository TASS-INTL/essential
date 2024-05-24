import React from 'react'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { travelsStore } from '../../../store/travelsStore'
import { InputSearch } from '../components'
import { BoardDevice } from '../ModuleDevices/BoardDevice'

export const TableTravels = () => {
	const { register, handleSubmit } = useForm()
	const arrayTableTravels = travelsStore((state) => state.arrayTableTravels)

	return (
		<>
			<div className='flex justify-between pt-5 py-20'>
				<Link
					to='/user/travels-screen/create-travel'
					className='p-2 bg-black text-white rounded-lg flex justify-center items-center'
				>
					Crear Viaje
				</Link>
				<form
					onSubmit={handleSubmit((data) => {
						setPageSelected(1)
						setArray([1, 2, 3, 4, 5])
						setDataSearch(data.search)
					})}
				>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardDevice dataBody={arrayTableTravels?.results} to='travels-screen/travel' />
		</>
	)
}
