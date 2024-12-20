import React from 'react'

import { ErrorComponent, LoaderComponent, ModalComponent } from '@/Components'
import { Container } from '@/Components/Container'
import { InputSearch } from '@/Components/InputSearch'

import { CreatePolicie } from './CreatePolicie'
import { usePolicies } from './hooks/usePolicies'

export const PoliciesScreen = () => {
	const { listPolicies, handleSubmit, handleSubmitPagination, register, open, handleOpen } = usePolicies()

	if (listPolicies.isLoading) return <LoaderComponent />

	if (listPolicies.isError || listPolicies.data.error)
		return <ErrorComponent error={listPolicies?.error?.message || listPolicies?.data?.message} />

	return (
		<Container>
			<div className='pl-[5%] px-7 py-4'>
				<div className='flex justify-between'>
					<form onSubmit={handleSubmit(handleSubmitPagination)}>
						<InputSearch register={register} placeholder='Buscar politica' />
					</form>
					<div className=' flex justify-between px-0 py-2'>
						<button onClick={handleOpen} className='bg-primary shadow-lg  py-1 px-8 rounded-md text-white'>
							+ Craer Politica
						</button>
					</div>
				</div>
				<div className='relative overflow-x-auto pt-5'>
					<table className='w-full text-sm text-left rtl:text-right text-gray-500 '>
						<thead className='text-xs text-gray-700 uppercase bg-gray-50  '>
							<tr>
								{Object.keys(listPolicies?.data?.data?.result[0]).map((keys) => (
									<th key={keys} scope='col' className='px-6 py-3'>
										{keys}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<tr className='bg-white border-b  '>
								{Object.values(listPolicies?.data?.data?.result[0]).map((keys, i) => (
									<td key={i} scope='col' className='px-6 py-3'>
										{keys}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<ModalComponent handleOpen={open} HandleClose={handleOpen} titleModal='Creacion de politica'>
				<CreatePolicie />
			</ModalComponent>
		</Container>
	)
}
