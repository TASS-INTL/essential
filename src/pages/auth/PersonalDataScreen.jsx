import React, { useEffect, useState } from 'react'

import 'react-phone-number-input/style.css'

import { InputComponent, InputSubmitComponent, SelectComponent } from '@/Components'
import { useForm } from 'react-hook-form'
import PhoneInput, { formatPhoneNumber } from 'react-phone-number-input'

import { emailSvg } from '../../assets/assetsplatform'
import { logoTass } from '../../assets/assetsplatform/PrivateRoutes'
import { ModalComponent } from '../../Components'
import { arrayOptions, typeDocument, typeUser } from './constants'
import { useAuth } from './hooks/useLogin'
import { TermsAndConditions } from './TermsAndConditions'

const stylesInput = {
	border: '1px solid #40587c',
	borderRadius: '8px',
	WebkitBoxSizing: 'borderBox',
	MozBoxsizing: 'border-box',
	boxSizing: 'border-box',
	color: 'black',
	fontSize: '1rem',
	height: '2.5rem',
	lineHeight: '1.5rem',
	padding: '0.75rem',
	width: '100%'
}

export const PersonalDataScreen = () => {
	const [value, setValue] = useState()
	const [flagInput, setFlagInput] = useState(false)
	const { submitFormValidateData } = useAuth()
	const { register, handleSubmit, watch } = useForm()
	const [modal, setModal] = useState(false)

	useEffect(() => {
		watch().type_person === 'Juridica' ? setFlagInput(true) : setFlagInput(false)
	}, [watch().type_person])

	const setModalVisible = () => setModal(true)

	return (
		<div className='w-full min-h-screen  items-center justify-center  space-x-6 '>
			<div className='min-h-screen flex  flex-row justify-center items-center'>
				<div className='w-7/12 '>
					<div className=' flex justify-center items-center py-2'>
						<img src={logoTass} width={390} alt='logoTass' />
					</div>
					<div className='mt-4'>
						<h1 className='text-xl mb-3 font-bold text-black text-center'>Registro de datos</h1>
					</div>
					<form onSubmit={handleSubmit((data, event) => submitFormValidateData(data, event))}>
						<div className='grid gap-3 mb-2 md:grid-cols-3'>
							<InputComponent
								color
								required
								register={register}
								label='nombre'
								name='name'
								type='text'
								placeholder='yondoe'
							/>
							<InputComponent
								color
								required
								register={register}
								label='email'
								name='email'
								type='text'
								placeholder='yondoe@gmail.com'
							/>
							<InputComponent
								color
								required
								register={register}
								label='username'
								name='username'
								type='text'
								placeholder='yondoe'
							/>
							<SelectComponent
								register={register}
								label='Tipo de persona'
								name='type_person'
								arrayOptions={arrayOptions}
								option='name'
							/>
							<SelectComponent
								register={register}
								label='Tipo de documento'
								name='type_document_personal'
								arrayOptions={typeDocument}
								option='name'
							/>
							<InputComponent
								color
								required
								register={register}
								label='numero de documento'
								name='number_document_personal'
								type='text'
							/>
							{flagInput && (
								<>
									<SelectComponent
										register={register}
										label='Tipo de documento de la empresa'
										name='type_document_company'
										arrayOptions={typeDocument}
										option='name'
									/>
									<InputComponent
										color
										required
										register={register}
										label='numero de documento de la compañia'
										name='number_document_company'
										type='text'
									/>
								</>
							)}
							<InputComponent
								color
								required
								register={register}
								label='country'
								name='country'
								type='text'
							/>
							<InputComponent
								color
								required
								register={register}
								label='region'
								name='region'
								type='text'
							/>
							<InputComponent color required register={register} label='city' name='city' type='text' />
							<InputComponent
								color
								required
								register={register}
								label='Direccion'
								name='address'
								type='text'
							/>
							<InputComponent
								color
								required
								register={register}
								label='estado o provincia'
								name='state_province'
								type='text'
							/>
							<InputComponent
								color
								required
								register={register}
								label='codigo postal'
								name='code_postal'
								type='text'
							/>
						</div>
						<div className='mb-2 gap-3 grid md:grid-cols-3 items-center justify-center'>
							<div>
								<label
									htmlFor={'phone number'}
									className={`block mb-1 text-sm font-medium text-gray-900`}
								>
									Numero de telefono
								</label>
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
							<InputComponent
								color
								required
								register={register}
								label='password'
								name='key'
								type='password'
								placeholder='•••••••••'
							/>
							<SelectComponent
								register={register}
								label='Tipo de usuario'
								name='type_role'
								arrayOptions={typeUser}
								option='name'
							/>
						</div>
						<div className='flex items-start justify-center mb-2'>
							<div className='flex items-center h-5'>
								<input
									required
									type='checkbox'
									{...register('terms_conditions')}
									className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
								/>
							</div>
							<label className='ms-2 text-sm font-medium text-gray-900'>
								Al continuar Acepta los terminos y condiciones de uso de TASS INTL y las
								<span onClick={setModalVisible} className='text-blue-600 hover:underline'>
									{' '}
									Politica de privacidad
								</span>
								.
							</label>
						</div>
						<div className=' flex flex-row justify-center mb-9'>
							<InputSubmitComponent text='Finalizar' />
						</div>
					</form>

					{modal && (
						<ModalComponent textModal='Terminos y condiciones' handleClose={setModal}>
							<TermsAndConditions />
						</ModalComponent>
					)}
				</div>
			</div>
		</div>
	)
}
