import { showToast } from '@/helpers/toast'
import { useForm } from 'react-hook-form'

import { useAuthProvider } from './useAuthProvider'

export const useAuth = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()
	const { login, ValidateCodeApi, registerPersonalData, registerNameAndUserName, resendCode, forgotPassword } =
		useAuthProvider()

	// Login
	const submitFormLogin = async (valuesLogin, e) => {
		e.preventDefault()
		const { email, password } = valuesLogin
		const response = await login({
			email,
			password
		})
		if (response?.error) {
			return showToast('❌ Algo ha salido mal, revisa tu correo o tu contraseña ' + response?.message, 'error')
		}
		response?.completed && showToast('Validacion de manera exitosa', 'success')
	}

	// Validate Code
	const submitFormValidateCode = async (valueValidateCode, event, screen) => {
		event.preventDefault()

		const { code } = valueValidateCode

		const response = await ValidateCodeApi({
			code,
			screen
		})

		response?.error && showToast('Algo ha salido mal ' + response?.message, 'error')
		response.success && showToast('Codigo ingresado con exito ' + response?.message, 'success')
	}

	// Register
	const submitFormRegister = async (valuesRegister, event) => {
		event.preventDefault()

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
			showToast('Se a reenviado el codigo de validacion al correo de manera exitosa ✅', 'success')
	}

	// Personal Data
	const submitFormValidateData = async (valuePersonalData, event) => {
		event.preventDefault()

		valuePersonalData.phone_number = {
			code: '+57',
			number: '3225713623'
		}

		const response = await registerPersonalData(valuePersonalData)

		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
		response?.completed && showToast('Se a completado de manera exitos el registro ✅', 'success')
	}

	// Forgot Password
	const submitFormForgotPassword = async (valuesForgot, event) => {
		event.preventDefault()
		const response = await forgotPassword({
			email: valuesForgot.email
		})
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
		response?.completed && showToast('Te enviamos la nueva contraseña al correo ✅', 'success')
	}

	return {
		submitFormLogin,
		submitResendCode,
		submitFormRegister,
		submitFormValidateData,
		submitFormValidateCode,
		submitFormForgotPassword,
		errors,
		handleSubmit,
		register
	}
}
