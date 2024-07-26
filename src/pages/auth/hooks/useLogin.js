import { useAuthProvider } from '@/auth/useAuthProvider'
import { showToast } from '@/helpers/toast'

export const useAuth = () => {
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
			showToast('Se a reenviado el codigo de validacion al correo de manera exitosa', 'success')
	}

	// Personal Data
	const submitFormValidateData = async (valuePersonalData, event) => {
		event.preventDefault()

		if (Object.values(valuePersonalData).some((value) => value === '')) {
			return showToast('❌ Debes ingresar todos los campos', 'error')
		}

		const response = await registerPersonalData(valuePersonalData)

		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
		response?.completed && showToast('Se a completado de manera exitos el registro', 'success')
	}

	// Forgot Password
	const submitFormForgotPassword = async (valuesForgot, event) => {
		event.preventDefault()
		const response = await forgotPassword({
			email: valuesForgot.email
		})
		response?.error && showToast('❌ Algo ha salido mal ' + response?.message, 'error')
		response?.completed && showToast('Te enviamos la nueva contraseña al correo', 'success')
	}

	return {
		submitFormLogin,
		submitResendCode,
		submitFormRegister,
		submitFormValidateData,
		submitFormValidateCode,
		submitFormForgotPassword
	}
}
