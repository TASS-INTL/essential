import React, { useState } from 'react'

import { Button } from '@mui/material'
import { useForm } from 'react-hook-form'

import { LoaderComponent, ModalComponent } from '../../../../Components'
import { InputSearch } from '../../../../Components/InputSearch'
import { BoardDevice } from '../../Inventory/ModuleDevices/BoardDevice'
import { CreateService } from './CreateService'
import { useServiceClient } from './hooks/useServiceClient'

export const TableServiceClient = () => {
	const [page, setPage] = useState(1)
	const { fetchDataServiceClient } = useServiceClient()
	const { register, handleSubmit } = useForm()
	const [dataSearch, setDataSearch] = useState('')
	const [array, setArray] = useState([1, 2, 3, 4, 5])

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(!open)

	const dataTableServicesClient = fetchDataServiceClient(page, '')

	dataTableServicesClient.isLoading && <LoaderComponent />

	const HandlePagination = (data) => {
		setPageSelected(1)
		setArray([1, 2, 3, 4, 5])
		setDataSearch(data.search)
	}

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
