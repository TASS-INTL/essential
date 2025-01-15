import React from 'react'

import {
	ErrorComponent,
	InputComponent,
	InputSubmitComponent,
	LoaderComponent,
	RemarksInput,
	SelectComponent
} from '@/Components'

import { useCreateProfile } from './hooks/useCreateProfile'

export const CreateProfile = () => {
	const { dataPreCreate, register, handleSubmit, handleCreateProfile } = useCreateProfile()

	console.log(dataPreCreate?.data?.data)

	if (dataPreCreate.isLoading) return <LoaderComponent />

	if (dataPreCreate.isError || dataPreCreate.data.error)
		return <ErrorComponent error={dataPreCreate?.error?.message || dataPreCreate?.data?.message} />

	return (
		<div>
			<form action='' onSubmit={handleSubmit(handleCreateProfile)}>
				<InputComponent
					required
					name='name'
					type='text'
					register={register}
					label='Nombre del perfil'
					placeholder='admin'
					color
				/>
				<SelectComponent
					register={register}
					label='Politica'
					name='id_policy'
					arrayOptions={dataPreCreate?.data?.data?.policies}
					option='name'
				/>
				<SelectComponent
					register={register}
					label='tipo de usuario'
					name='id_type_user'
					arrayOptions={dataPreCreate?.data?.data?.types_users}
					option='name'
				/>
				<div className='py-1'>
					<RemarksInput text='Descripcion' register={register} nameRegister='description' />
				</div>
				<div className='flex justify-center pt-6'>
					<InputSubmitComponent text='Crear perfil' />
				</div>
			</form>
			{/* <SelectComponent
				register={register}
				label='Tipo de documento de la empresa'
				name='type_document_company'
				arrayOptions={typeDocument}
				option='name'
			/> */}
		</div>
	)
}
