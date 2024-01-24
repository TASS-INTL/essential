import { useEffect, useState } from 'react'

import { useAuthProvider } from '@/auth/useAuthProvider'
import { showToast } from '@/helpers/toast'
import { userStore } from '@/store/userStore'

const initialStateLogin = {
	email: '',
	password: ''
}

const initialStateRegister = {
	email: '',
	username: ''
}

const initialStateValidateCode = {
	code: ''
}

const initialStatePersonalData = {
	name: '',
	key: '',
	city: '',
	email: '',
	region: '',
	country: '',
	address: '',
	username: '',
	phone_number: {
		code: '',
		number: ''
	},
	code_postal: '',
	state_province: '',
	number_document_company: 0,
	number_document_personal: '',
	type_person: 'natural',
	terms_conditions: false,
	type_document_company: 'NN',
	type_document_personal: 'CC'
}

const initialStateForgotPassword = {
	email: ''
}

export const useAuth = () => {
	const { login, ValidateCodeApi, registerPersonalData, registerNameAndUserName, resendCode, forgotPassword } =
		useAuthProvider()
	const {
		userData: { email, userName }
	} = userStore((state) => state)
	const [valuesLogin, setValuesLogin] = useState(initialStateLogin)
	const [valuesRegister, setValuesRegister] = useState(initialStateRegister)
	const [valueValidateCode, setValueValidateCode] = useState(initialStateValidateCode)
	const [valuePersonalData, setValuePersonalData] = useState(initialStatePersonalData)
	const [valuesForgot, setValuesForgot] = useState(initialStateForgotPassword)

	useEffect(() => {
		setValuePersonalData({
			...valuePersonalData,
			email,
			username: userName
		})
	}, [])

	// Login
	const handleValuesLogin = (key, value) => {
		setValuesLogin({
			...valuesLogin,
			[key]: value
		})
	}

	const submitFormLogin = async (e) => {
		e.preventDefault()
		if (Object.values(valuesLogin).some((value) => value === '')) {
			return showToast('❌ Debes ingresar el correo', 'error')
		}
		const { email, password } = valuesLogin
		const response = await login({
			email,
			password
		})
		if (response?.error) {
			setValuesLogin(initialStateLogin)
			return showToast('❌ Algo ha salido mal ' + response?.message, 'error')
		}
		response?.completed && showToast('Validacion de manera exitosa', 'success')
	}

	// Validate Code
	const handleFormValidateCode = (key, value) => {
		setValueValidateCode({
			...valueValidateCode,
			[key]: value
		})
	}

	const submitFormValidateCode = async (event, screen) => {
		event.preventDefault()

		if (Object.values(valueValidateCode).some((value) => value === '')) {
			return showToast('❌ Debes ingresar el codigo de verificacion', 'error')
		}

		const { code } = valueValidateCode

		const response = await ValidateCodeApi({
			code,
			screen
		})

		response?.error && showToast('Algo ha salido mal ' + response?.message, 'error')
		response.success && showToast('Codigo ingresado con exito ' + response?.message, 'success')
	}

	// Register
	const handleRegister = (key, value) => {
		setValuesRegister({
			...valuesRegister,
			[key]: value
		})
	}

	const submitFormRegister = async (event) => {
		event.preventDefault()

		if (Object.values(valuesRegister).some((value) => value === '')) {
			return showToast('❌ Debes ingresar todos los campos', 'error')
		}

		const { email, username } = valuesRegister

		const response = await registerNameAndUserName({
			email,
			username
		})

		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
		response?.completed && showToast('Validacion del correo de manera exitosa', 'success')
	}

	// resend code
	const submitResendCode = async () => {
		const response = await resendCode()

		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
		response?.completed &&
			showToast('Se a reenviado el codigo de validacion al correo de manera exitosa', 'success')
	}

	// Personal Data
	const handlePersonalData = (key, value) => {
		setValuePersonalData({
			...valuePersonalData,
			[key]: value
		})
	}

	const submitFormValidateData = async (event) => {
		event.preventDefault()

		if (Object.values(valuePersonalData).some((value) => value === '')) {
			return showToast('❌ Debes ingresar todos los campos', 'error')
		}

		const response = await registerPersonalData(valuePersonalData)

		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
		response?.completed && showToast('Se a completado de manera exitos el registro', 'success')
	}

	// Forgot Password
	const handleForgotPassword = (key, value) => {
		setValuesForgot({
			...valuesForgot,
			[key]: value
		})
	}

	const submitFormForgotPassword = async (event) => {
		event.preventDefault()

		if (Object.values(valuesForgot).some((value) => value === '')) {
			return showToast('❌ Debes ingresar todos los campos', 'error')
		}

		const { email } = valuesForgot

		const response = await forgotPassword({
			email
		})

		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
		response?.completed && showToast('Te enviamos la nueva contraseña al correo', 'success')
	}

	return {
		valuesLogin,
		valuesRegister,
		valueValidateCode,
		valuePersonalData,
		valuesForgot,
		submitFormLogin,
		submitResendCode,
		submitFormRegister,
		submitFormValidateData,
		submitFormValidateCode,
		submitFormForgotPassword,
		handleRegister,
		handleValuesLogin,
		handlePersonalData,
		handleFormValidateCode,
		handleForgotPassword
	}
}
