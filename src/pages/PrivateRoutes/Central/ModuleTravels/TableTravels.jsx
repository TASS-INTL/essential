import React, { useState } from 'react'

import { travelsStore } from '@/store/travelsStore'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'

import { CreateTravel } from '.'
import { ModalComponent } from '../../../../Components'
import { InputSearch } from '../../../../Components/InputSearch'
import { initialStateTravel } from '../../constants/constants'
import { BoardDevice } from '../../Inventory/ModuleDevices/BoardDevice'

export const TableTravels = () => {
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)
	const { register, handleSubmit } = useForm()
	const arrayTableTravels = travelsStore((state) => state.arrayTableTravels)

	const handlePagination = (data) => {
		setPageSelected(1)
		setArray([1, 2, 3, 4, 5])
		setDataSearch(data.search)
	}

	return (
		<>
			<div className='flex justify-between pt-5 py-20'>
				<Button variant='contained' onClick={handleOpen}>
					Crear Viaje
				</Button>
				<form onSubmit={handleSubmit(handlePagination)}>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardDevice dataBody={arrayTableTravels?.results} to='travels-screen/travel' />
			<ModalComponent handleOpen={open} HandleClose={handleOpen} titleModal='Creacion del Viaje'>
				<CreateTravel dataForm={initialStateTravel} />
			</ModalComponent>
		</>
	)
}
