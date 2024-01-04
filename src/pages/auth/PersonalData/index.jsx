import './style.css'

import React, { useState } from 'react'

import 'react-phone-number-input/style.css'

import { Input, InputSubmit } from '@/Components'
import PhoneInput from 'react-phone-number-input'

import { useAuth } from '../hooks/useLogin'

const typeDocument = {
	CC: 'CC',
	CE: 'CE',
	TI: 'TI',
	RC: 'RC',
	PA: 'PA',
	NIT: 'NIT',
	SSN: 'SSN',
	NUIP: 'NUIP',
	DNI: 'DNI',
	NN: 'NN'
}

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

export const PersonalData = () => {
	const { valuePersonalData, handlePersonalData, submitFormValidateData } = useAuth()
	const [flagInput, setFlagInput] = useState(false)
	const [value, setValue] = useState()

	const [chekInput, setChekInput] = useState(valuePersonalData.terms_conditions)

	return (
		<div className='container-Personal'>
			<div className='card-personal'>
				<div className='box-title'>
					<h1 className='title'>TASS INTL</h1>
				</div>
				<div>
					<div className='card-form'>
						<form action='' onSubmit={submitFormValidateData}>
							<Input
								label={'nombre'}
								name={'name'}
								type={'text'}
								value={valuePersonalData.name}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
							<div className='box-label'>
								<label className='label' htmlFor=''>
									Tipo de persona
								</label>
								<select
									onChange={(event) => {
										handlePersonalData('type_person', event.target.value)
										if (event.target.value === 'Juridica') {
											setFlagInput(true)
										} else {
											setFlagInput(false)
										}
									}}
									value={valuePersonalData.type_person}
									name='select-type-person'
								>
									<option value='Natural'>Natural</option>
									<option value='Juridica'>Juridica</option>
								</select>
							</div>
							<div className='box-label'>
								<label className='label' htmlFor=''>
									Tipo de documento
								</label>
								<select
									onChange={(event) => {
										handlePersonalData('type_document_personal', event.target.value)
									}}
									value={valuePersonalData.type_document_personal}
									name='select'
								>
									<option value={typeDocument.CC}>{typeDocument.CC}</option>
									<option value={typeDocument.CE}>{typeDocument.CE}</option>
									<option value={typeDocument.TI}>{typeDocument.TI}</option>
									<option value={typeDocument.RC}>{typeDocument.RC}</option>
									<option value={typeDocument.PA}>{typeDocument.PA}</option>
									<option value={typeDocument.NIT}>{typeDocument.NIT}</option>
									<option value={typeDocument.SSN}>{typeDocument.SSN}</option>
									<option value={typeDocument.NUIP}>{typeDocument.NUIP}</option>
									<option value={typeDocument.DNI}>{typeDocument.DNI}</option>
									<option value={typeDocument.NN}>{typeDocument.NN}</option>
								</select>
							</div>
							<Input
								label={'numero de documento'}
								name={'number_document_personal'}
								type={'text'}
								value={valuePersonalData.number_document_personal}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
							{flagInput && (
								<>
									<div className='box-label'>
										<label className='label' htmlFor=''>
											Tipo de documento de la empresa
										</label>
										<select
											onChange={(event) => {
												handlePersonalData('type_document_company', event.target.value)
											}}
											value={valuePersonalData.type_document_company}
											name='select-type-document-company'
										>
											<option value={typeDocument.CC}>{typeDocument.CC}</option>
											<option value={typeDocument.CE}>{typeDocument.CE}</option>
											<option value={typeDocument.TI}>{typeDocument.TI}</option>
											<option value={typeDocument.RC}>{typeDocument.RC}</option>
											<option value={typeDocument.PA}>{typeDocument.PA}</option>
											<option value={typeDocument.NIT}>{typeDocument.NIT}</option>
											<option value={typeDocument.SSN}>{typeDocument.SSN}</option>
											<option value={typeDocument.NUIP}>{typeDocument.NUIP}</option>
											<option value={typeDocument.DNI}>{typeDocument.DNI}</option>
											<option value={typeDocument.NN}>{typeDocument.NN}</option>
										</select>
									</div>
									<Input
										label={'numero de documento de la compañia'}
										name={'number_document_company'}
										type={'text'}
										value={valuePersonalData.number_document_company}
										onChange={handlePersonalData}
										error={'Ocurrio un error en el email'}
									/>
								</>
							)}

							<PhoneInput
								international
								countryCallingCodeEditable={false}
								defaultCountry='US'
								placeholder='Enter phone number'
								value={value}
								onChange={setValue}
								style={stylesInput}
							/>
							<Input
								label={'country'}
								name={'country'}
								type={'text'}
								value={valuePersonalData.country}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
							<Input
								label={'region'}
								name={'region'}
								type={'text'}
								value={valuePersonalData.region}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
							<Input
								label={'city'}
								name={'city'}
								type={'text'}
								value={valuePersonalData.city}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
							<Input
								label={'Direccion'}
								name={'address'}
								type={'text'}
								value={valuePersonalData.address}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el address'}
							/>
							<Input
								label={'estado o provincia'}
								name={'state_province'}
								type={'text'}
								value={valuePersonalData.state_province}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el state_province'}
							/>
							<Input
								label={'code_postal'}
								name={'code_postal'}
								type={'text'}
								value={valuePersonalData.code_postal}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
							<Input
								label={'email'}
								name={'email'}
								type={'text'}
								value={valuePersonalData.email}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el email'}
							/>
							<Input
								label={'username'}
								name={'username'}
								type={'text'}
								value={valuePersonalData.username}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el username'}
							/>
							<Input
								label={'password'}
								name={'key'}
								type='password'
								value={valuePersonalData.key}
								onChange={handlePersonalData}
								error={'Ocurrio un error en el password'}
							/>
							<div>
								<input
									type='checkbox'
									name='terminos'
									id='terminos'
									value={chekInput}
									onChange={(e) => {
										handlePersonalData('terms_conditions', chekInput)
										setChekInput(!chekInput)
									}}
								/>
								<label htmlFor='terminos' className='terms'>
									Acepto los terminos y condiciones de uso de TASS INTL y la politica de privacidad
								</label>
							</div>
							<div className='contentButton'>
								<InputSubmit text='Siguiente' />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
