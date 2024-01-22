import { useNavigate } from 'react-router-dom'

import api from '../Api/api'
import { constantsApi } from '../Api/constantsApi'
import { userStore } from '../store/userStore'

export const useAuthProvider = () => {
	const navigate = useNavigate()
	const { setUserData, userData } = userStore((state) => state)

	const login = async ({ email, password }) => {
		const response = await api(constantsApi.POST, 'auth2/login', {
			email,
			password
		})

		if (response?.completed) {
			if (response?.type_ === 'USER_HAS_SESSION') {
				localStorage.setItem('token', response.data[0].token)
				setUserData({
					...userData,
					logged: true,
					checking: false,
					uid: response.data[0].id,
					name: response.data[0].name,
					email: response.data[0].email,
					state: response.data[0].state,
					userName: response.data[0].username,
					tokenSesion: response.data[0].token,
					modules: response.data[0].user_policies.modules
				})
			} else {
				localStorage.setItem('token', response.data[0].token)
				setUserData({
					...userData,
					checking: false,
					email,
					tokenSesion: response.data[0].token
				})
				navigate('/auth/validate-code', { state: { screen: 'login' } })
			}
		}
		return response
	}

	const ValidateCodeApi = async ({ code, screen }) => {
		const { email, tokenSesion } = userData

		const response = await api(
			constantsApi.POST,
			screen === 'login' ? `auth2/login/validateCode/?to=${tokenSesion}` : 'singup/start/code',
			{
				code,
				email
			}
		)

		if (response?.completed) {
			if (screen === 'login') {
				localStorage.setItem('token', response.data[0].token)
				setUserData({
					...userData,
					logged: true,
					checking: false,
					uid: response.data[0].id,
					name: response.data[0].name,
					email: response.data[0].email,
					state: response.data[0].state,
					userName: response.data[0].username,
					tokenSesion: response.data[0].token,
					modules: response.data[0].user_policies.modules
				})
			} else {
				setUserData({
					...userData,
					tokenRegister: response.data[0].token
				})
				navigate('/auth/personal-data')
			}
		}
		return response
	}

	const registerPersonalData = async (personalData) => {
		const { tokenRegister } = userData
		const response = await api(constantsApi.POST, `singup/finalized/?to=${tokenRegister}`, personalData)
		if (response.completed) {
			setUserData({
				...userData,
				email: '',
				userName: '',
				tokenRegister: ''
			})
			navigate('/auth/login')
		}
		return response
	}

	const registerNameAndUserName = async ({ email, username }) => {
		const response = await api(constantsApi.POST, 'singup/start/email', {
			email,
			username
		})

		if (response?.completed) {
			setUserData({
				...userData,
				email,
				userName: username
			})
			navigate('/auth/validate-code', { state: { screen: 'register' } })
		}
		return response
	}

	const verifyToken = async (state, setUserData) => {
		//  const token = await localStorage.getItem('token')
		setUserData({
			...state,
			checking: false
		})

		//   if (!token) {
		//     setUserData({
		//       uid: null,
		//       checking: false,
		//       logged: false,
		//       name: null,
		//       email: null,
		//     });

		//    return false;
		//  }

		//  const res = await fetchWitchToken("/auth/renow");

		//  if (!res.ok) {
		//    setAuth({
		//      uid: null,
		//      checking: false,
		//      logged: false,
		//      name: null,
		//      email: null,
		//    });

		//    return false;
		//  }

		//  localStorage.setItem("token", res.token);

		//  setAuth({
		//    uid: res.user.uid,
		//    checking: false,
		//    logged: true,
		//    name: res.user.name,
		//    email: res.user.email,
		//  });

		//  return;
	}

	const resendCode = async () => {
		const { email, userName } = userData
		const response = await api(constantsApi.POST, 'singup/start/email', {
			email,
			username: userName
		})

		return response
	}

	const forgotPassword = async ({ email }) => {
		const response = await api(constantsApi.GET, `auth2/resetPassword/${email}`, {
			email
		})

		return response
	}

	const logout = async () => {
		const response = await api(constantsApi.POST, 'auth2/logout')
		if (response?.completed) {
			setUserData({
				uid: null,
				name: null,
				email: null,
				logged: false,
				userName: null,
				checking: false,
				tokenSesion: null
			})
			localStorage.removeItem('token')
		}
	}

	return {
		login,
		logout,
		resendCode,
		verifyToken,
		forgotPassword,
		ValidateCodeApi,
		registerPersonalData,
		registerNameAndUserName
	}
}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiY2FtaWxvZ29yZTk5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2NzgiLCJzdGF0dXMiOnRydWUsImlkIjoiNjVhODAxOTRjYmIzODBhZWM4NGE5NWNkIiwiaWRfbWFzdGVyIjoiNjVhODAxOTRjYmIzODBhZWM4NGE5NWNkIiwiZXhpc3QiOmZhbHNlfSwiZXhwIjoxNzA1Njc4OTY1LCJpYXQiOjE3MDU2NzUzNjV9.CdMjY_m9vFHvWA9EWdFnhzRBkmLCDJ2_toG4nO4s-00

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiY2FtaWxvZ29yZTk5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2NzgiLCJzdGF0dXMiOnRydWUsImlkIjoiNjVhODAxOTRjYmIzODBhZWM4NGE5NWNkIiwiaWRfbWFzdGVyIjoiNjVhODAxOTRjYmIzODBhZWM4NGE5NWNkIiwiZXhpc3QiOmZhbHNlfSwiZXhwIjoxNzA1Njc5ODg4LCJpYXQiOjE3MDU2NzYyODh9.QJyzxD-8KZ3--7GGUF7UHSkQu4VWntnhCosxGrPScjM
