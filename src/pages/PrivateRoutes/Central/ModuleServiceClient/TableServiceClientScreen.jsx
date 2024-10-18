import React, { useState } from 'react'

import { LoaderComponent, ModalComponent } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { InputSearch } from '@/Components/InputSearch'
import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'

import { CreateService } from './CreateService'
import { useServiceClient } from './hooks/useServiceClient'

export const TableServiceClientScreen = () => {
	const { getDataTableServiceClient } = useServiceClient()
	const { register, handleSubmit } = useForm()
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)

	const dataTableServicesClient = getDataTableServiceClient(1, '')

	if (dataTableServicesClient.isLoading) return <LoaderComponent />

	const HandlePagination = (data) => {}

	return (
		<>
			<div className='flex justify-between pt-5 py-20'>
				<Button variant='contained' onClick={handleOpen}>
					Crear Servicio
				</Button>
				<form onSubmit={handleSubmit(HandlePagination)}>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardDevice dataBody={dataTableServicesClient?.data?.data?.results} />
			{open && (
				<ModalComponent handleOpen={open} HandleClose={handleOpen} titleModal='Creacion del servicio'>
					<CreateService />
				</ModalComponent>
			)}
		</>
	)
}
