import { METHODS_API } from '@/Api/constantsApi'
import { useApi } from '@/Api/useApi'
import { userStore } from '@/store/userStore'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { pathNavigation } from '../constants'

export const useAuthProvider = () => {
	const navigate = useNavigate()
	const { requestApi } = useApi()
	const userData = userStore((state) => state.userData)
	const setUserData = userStore((state) => state.setUserData)

	const login = async ({ email, password }) => {
		const response = await requestApi(METHODS_API.POST, 'auth2/login', {
			email,
			password
		})

		if (response?.completed) {
			if (response?.type_ === 'SingInCompleted') {
				localStorage.setItem('token', response?.data?.token)
				setUserData({
					...userData,
					logged: true,
					checking: false,
					uid: response?.data?._id,
					name: response?.data?.name,
					email: response?.data?.email,
					state: response?.data?.state,
					userName: response?.data?.username,
					tokenSesion: response?.data?.token,
					modules: response?.data?.user_policies?.modules,
					typeUser: response?.data?.type_master
				})
			} else {
				localStorage.setItem('token', response?.data?.token)
				setUserData({
					...userData,
					checking: false,
					email,
					tokenSesion: response?.data?.token
				})
				navigate(pathNavigation.validateCode, { state: { screen: 'login' } })
			}
		}
		return response
	}

	const ValidateCodeApi = async ({ code, screen }) => {
		const { email, tokenSesion, userName } = userData

		const dataSend = {
			code,
			email
		}

		if (screen === 'register') {
			dataSend.username = userName
		}

		const response = await requestApi(
			METHODS_API.POST,
			screen === 'login' ? `auth2/login/validateCode?to=${tokenSesion}` : 'singup/start/code',
			dataSend
		)

		if (response?.completed) {
			console.log(response?.data)

			if (screen === 'login') {
				localStorage.setItem('token', response?.data?.token)
				setUserData({
					...userData,
					logged: true,
					checking: false,
					uid: response?.data?._id,
					name: response?.data?.name,
					email: response?.data?.email,
					state: response?.data?.state,
					userName: response?.data?.username,
					tokenSesion: response?.data?.token,
					typeUser: response?.data?.type_master,
					modules: response?.data?.user_policies.modules
				})
			} else {
				setUserData({
					...userData,
					tokenRegister: response?.data?.key_process
				})
				navigate(pathNavigation.personalData)
			}
		}
		return response
	}

	const registerPersonalData = async (personalData) => {
		const { tokenRegister } = userData

		console.log('tokenRegister -->', userData)
		const response = await requestApi(METHODS_API.POST, `singup/finalized/?to=${tokenRegister}`, personalData)
		if (response.completed) {
			setUserData({
				...userData,
				email: '',
				userName: '',
				tokenRegister: ''
			})
			navigate(pathNavigation.login)
		}
		return response
	}

	const registerNameAndUserName = async ({ email, username }) => {
		const response = await requestApi(METHODS_API.POST, 'singup/start/email', {
			email,
			username
		})

		if (response?.completed) {
			setUserData({
				...userData,
				email,
				userName: username
			})
			navigate(pathNavigation.validateCode, { state: { screen: 'register' } })
		}
		return response
	}

	const verifyToken = async (state, setUserData) => {
		//  const token = await localStorage.getItem('token')
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
		const { email, tokenSesion } = userData
		const response = await requestApi(METHODS_API.POST, 'auth2/login/resendCode', {
			email,
			token: tokenSesion
		})

		return response
	}

	const forgotPassword = async ({ email }) => {
		const response = await requestApi(METHODS_API.GET, `auth2/resetPassword/${email}`, {
			email
		})

		return response
	}

	const logout = async () => {
		const response = await requestApi(METHODS_API.POST, 'auth2/logout')

		if (response?.completed || response?.type_ === 'ErrorServerGetCurrentSession') {
			setUserData({
				uid: null,
				name: null,
				email: null,
				logged: false,
				userName: null,
				checking: false,
				tokenSesion: null,
				modules: null,
				typeUser: null
			})
			localStorage.removeItem('token')
		}
	}

	const queryUserToken = () =>
		useQuery({
			queryKey: ['userHasToken'],
			queryFn: async () => await requestApi(METHODS_API.GET, `auth2/validate-session`)
		})

	return {
		login,
		logout,
		resendCode,
		verifyToken,
		forgotPassword,
		ValidateCodeApi,
		registerPersonalData,
		registerNameAndUserName,
		queryUserToken
	}
}
