import React, { useEffect, useState } from 'react'

import 'react-phone-number-input/style.css'

import { InputComponent, InputSubmitComponent, SelectComponent } from '@/Components'
import PhoneInput from 'react-phone-number-input'

import { useAuth } from './hooks/useLogin'

export const typeDocument = [
	{ id: 1, name: 'CC' },
	{ id: 2, name: 'CE' },
	{ id: 3, name: 'TI' },
	{ id: 4, name: 'RC' },
	{ id: 5, name: 'PA' },
	{ id: 6, name: 'NIT' },
	{ id: 7, name: 'SSN' },
	{ id: 8, name: 'NUIP' },
	{ id: 9, name: 'DNI' },
	{ id: 10, name: 'NN' }
]

const stylesInput = {
	backgroundColor: '#03091e',
	border: '1px solid #40587c',
	borderRadius: '8px',
	WebkitBoxSizing: 'borderBox',
	MozBoxsizing: 'border-box',
	boxSizing: 'border-box',
	color: '#fff',
	fontSize: '1rem',
	height: '2.5rem',
	lineHeight: '1.5rem',
	padding: '0.75rem',
	width: '100%'
}

const arrayOptions = [
	{ id: 1, name: 'Natural' },
	{ id: 2, name: 'Juridica' }
]

export const PersonalDataScreen = () => {
	const { valuePersonalData, handlePersonalData, submitFormValidateData } = useAuth()
	const [flagInput, setFlagInput] = useState(false)
	const [value, setValue] = useState()

	const [chekInput, setChekInput] = useState(valuePersonalData.terms_conditions)

	useEffect(() => {
		valuePersonalData.type_person === 'Juridica' ? setFlagInput(true) : setFlagInput(false)
	}, [valuePersonalData.type_person])

	console.log(valuePersonalData)

	return (
		<div className='bg-primary w-full min-h-screen  items-center justify-center  space-x-6'>
			<div className='min-h-screen flex  flex-row justify-center'>
				<div className=' w-7/12 '>
					<div className='mt-9'>
						<h1 className='text-xl  font-bold text-white text-center'>REGISTRO DE DATOS PERSONALES</h1>
					</div>

					<form>
						<div className='grid gap-6 mb-6 md:grid-cols-2'>
							<InputComponent
								label={'nombre'}
								name={'name'}
								type={'text'}
								value={valuePersonalData.name}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>

							<InputComponent
								label={'email'}
								name={'email'}
								type={'text'}
								value={valuePersonalData.email}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
							<InputComponent
								label={'username'}
								name={'username'}
								type={'text'}
								value={valuePersonalData.username}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el username'}
							/>

							<SelectComponent
								label='Tipo de persona'
								handlePersonalData={handlePersonalData}
								value={valuePersonalData.type_person}
								name='select-type-person'
								arrayOptions={arrayOptions}
								valueChange={'type_person'}
							/>

							<SelectComponent
								label='Tipo de documento'
								handlePersonalData={handlePersonalData}
								value={valuePersonalData.type_document_personal}
								name='select-type_document_personal'
								arrayOptions={typeDocument}
								valueChange={'type_document_personal'}
							/>

							<InputComponent
								label={'numero de documento'}
								name={'number_document_personal'}
								type={'text'}
								value={valuePersonalData.number_document_personal}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
							{flagInput && (
								<>
									<SelectComponent
										label='Tipo de documento de la empresa'
										handlePersonalData={handlePersonalData}
										value={valuePersonalData.type_document_company}
										name='select-type_document_company'
										arrayOptions={typeDocument}
										valueChange={'type_document_company'}
									/>
									<InputComponent
										label={'numero de documento de la compañia'}
										name={'number_document_company'}
										type={'text'}
										value={valuePersonalData.number_document_company}
										onChange={handlePersonalData}
										error={'Ocurrio un error en el email'}
									/>
								</>
							)}

							<InputComponent
								label={'country'}
								name={'country'}
								type={'text'}
								value={valuePersonalData.country}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>

							<InputComponent
								label={'region'}
								name={'region'}
								type={'text'}
								value={valuePersonalData.region}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>

							<InputComponent
								label={'city'}
								name={'city'}
								type={'text'}
								value={valuePersonalData.city}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>

							<InputComponent
								label={'Direccion'}
								name={'address'}
								type={'text'}
								value={valuePersonalData.address}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el address'}
							/>

							<InputComponent
								label={'estado o provincia'}
								name={'state_province'}
								type={'text'}
								value={valuePersonalData.state_province}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el state_province'}
							/>

							<InputComponent
								label={'codigo postal'}
								name={'code_postal'}
								type={'text'}
								value={valuePersonalData.code_postal}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
						</div>
						<div className='mb-6'>
							<PhoneInput
								international
								countryCallingCodeEditable={false}
								defaultCountry='US'
								placeholder='Enter phone number'
								value={value}
								onChange={setValue}
								style={stylesInput}
							/>
						</div>

						<div className='mb-6'>
							<InputComponent
								label={'password'}
								name={'key'}
								type='password'
								value={valuePersonalData.key}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el password'}
								placeholder='•••••••••'
							/>
						</div>
						<div className='flex items-start mb-6'>
							<div className='flex items-center h-5'>
								<input
									id='remember'
									type='checkbox'
									value=''
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
									required
								/>
							</div>
							<label
								type='checkbox'
								name='terminos'
								id='terminos'
								htmlFor='remember'
								className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
								value={chekInput}
								onChange={(e) => {
									handlePersonalData('terms_conditions', chekInput)
									setChekInput(!chekInput)
								}}
							>
								Acepto los terminos y condiciones de uso de TASS INTL y la{' '}
								<a href='#' className='text-blue-600 hover:underline dark:text-blue-500'>
									Politica de privacidad
								</a>
								.
							</label>
						</div>
						<div className=' flex flex-row justify-center mb-9'>
							<InputSubmitComponent text='Finalizar' />
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
