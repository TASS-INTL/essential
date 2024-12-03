import React from 'react'

import { ErrorComponent, LoaderComponent } from '@/Components'
import { BoardDevice } from '@/Components/BoardDevice'
import { InputSearch } from '@/Components/InputSearch'
import { useForm } from 'react-hook-form'

import { useService } from './hooks/useService'

export const TableServicesMasterScreen = () => {
	const { fetchDataService } = useService()
	const { register, handleSubmit } = useForm()

	const dataTableServicesMaster = fetchDataService(1, '')

	if (dataTableServicesMaster?.isLoading) return <LoaderComponent />

	console.log(dataTableServicesMaster)
	if (dataTableServicesMaster?.error) return <ErrorComponent error={dataTableServicesMaster.error.message} />

	const handleSubmitPagination = () => {}

	return (
		<div className='px-16'>
			<div className='flex justify-end py-2'>
				<form onSubmit={handleSubmit(handleSubmitPagination)}>
					<InputSearch register={register} />
				</form>
			</div>
			<BoardDevice dataBody={dataTableServicesMaster?.data?.data?.results} />
		</div>
	)
}
