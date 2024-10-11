import React from 'react'

import { useForm } from 'react-hook-form'

import { useService } from './hooks/useService'
import { LoaderComponent } from '@/Components'
import { InputSearch } from '@/Components/InputSearch'
import { BoardDevice } from '@/Components/BoardDevice'

export const TableServicesMasterScreen = () => {

	const { fetchDataService } = useService()
	const { register, handleSubmit } = useForm()

	const dataTableServices = fetchDataService(1, '')

	dataTableServices.isLoading && <LoaderComponent />

	const handleSubmitPagination = (data) => {}

	return (
		<div className=''>
			<div className='flex justify-end py-2'>
				<form onSubmit={handleSubmit(handleSubmitPagination)}>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardDevice dataBody={dataTableServices?.data?.data?.results} />
		</div>
	)
}
