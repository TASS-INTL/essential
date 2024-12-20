import React, { useState } from 'react'

import { ErrorComponent, InputComponent, InputSubmitComponent, LoaderComponent, RemarksInput } from '@/Components'

import { useCreatePolicie } from './hooks/useCreatePolicie'

export const CreatePolicie = () => {
	const {
		dataPreCreatePolicie,
		dataProcessinForCreatePolicies,
		register,
		handleSubmit,
		handleCreatePolicies,
		handleCheckboxChange,
		handleCheckboxChangeSubItem
	} = useCreatePolicie()

	if (dataPreCreatePolicie.isLoading) return <LoaderComponent />

	if (dataPreCreatePolicie.isError || dataPreCreatePolicie.data.error)
		return <ErrorComponent error={dataPreCreatePolicie?.error?.message || dataPreCreatePolicie?.data?.message} />

	console.log(dataProcessinForCreatePolicies)

	return (
		<div className='overflow-y-scroll'>
			<form action='' onSubmit={handleSubmit(handleCreatePolicies)}>
				<InputComponent
					required
					name='name'
					type='text'
					register={register}
					label='Nombre de la politica'
					placeholder='Operador administrativo'
					color
				/>
				{dataProcessinForCreatePolicies?.map((item) => (
					<div key={item._id}>
						<div className='flex items-center mb-4'>
							<input
								id={item._id}
								type='checkbox'
								value={item.isActive}
								className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2'
								onChange={(event) => handleCheckboxChange(event, item._id)}
							/>
							<label htmlFor={item._id} className='ms-2 text-sm font-medium text-gray-900 '>
								{item.name_consult}
							</label>
						</div>
						{item.isActive &&
							item.submodules.map((subItem) => (
								<div className=' ml-6 flex items-center mb-4' key={subItem._id}>
									<input
										id={subItem._id}
										type='checkbox'
										value={subItem.isActive}
										className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2'
										onChange={(event) => handleCheckboxChangeSubItem(event, item._id, subItem._id)}
									/>
									<label htmlFor={subItem._id} className='ms-2 text-sm font-medium text-gray-900 '>
										{subItem.name_consult}
									</label>
								</div>
							))}
					</div>
				))}

				<RemarksInput text='Descripcion' register={register} nameRegister='description' />
				<div className='flex justify-center pt-6'>
					<InputSubmitComponent text='Crear Politica' />
				</div>
			</form>
		</div>
	)
}
