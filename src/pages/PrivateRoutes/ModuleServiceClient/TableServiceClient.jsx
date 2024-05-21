import React, { useState } from 'react'

import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { BoardComponent, LoaderComponent } from '../../../Components'
import { InputSearch } from '../components'
import { tableHeaderService } from '../ModuleServices/constants'
import { useServiceClient } from './hooks/useServiceClient'

export const TableServiceClient = () => {
	const [page, setPage] = useState(1)
	const { fetchDataServiceClient } = useServiceClient()
	const { register, handleSubmit } = useForm()
	const [dataSearch, setDataSearch] = useState('')
	const [array, setArray] = useState([1, 2, 3, 4, 5])

	const dataTableServicesClient = fetchDataServiceClient(page, '')

	dataTableServicesClient.isLoading && <LoaderComponent />

	return (
		<>
			<div className='flex justify-between pt-5 py-20'>
				<Link
					to='/user/services-client-screen/create-service'
					className='p-2 bg-black text-white rounded-lg flex justify-center items-center'
				>
					Crear servicio
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
			<BoardComponent dataHeader={tableHeaderService} dataBody={dataTableServicesClient?.data?.data?.results} />
			{/* <div className='py-5 flex justify-center items-center'>
				<PaginationComponent
					pageSelected={pageSelected}
					dataPagination={arrayTableInventory?.info}
					setPageSelected={setPageSelected}
					setArray={setArray}
					array={array}
				/>
			</div> */}
		</>
	)
}
