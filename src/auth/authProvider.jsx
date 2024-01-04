import { useNavigate } from 'react-router-dom'

import api from '../Api/api'
import { constantsApi } from '../Api/constantsApi'

export const AuthProvider = () => {
	const navigate = useNavigate()

	const login = async ({ email, password }) => {
		const response = await api(constantsApi.POST, 'auth2/login', {
			email,
			password
		})

		if (response.completed) {
			navigate('/auth/validate-code', { state: { screen: 'login' } })
		}
		return response
	}

	const ValidateCodeApi = async (state, { code, screen }) => {
		const { userData, setUserData } = state
		const response = await api(constantsApi.POST, 'singup/start/code', {
			code,
			email: userData.email
		})

		if (response.completed) {
			if (screen === 'login') {
				localStorage.setItem('token', response.data[0].token)
				setUserData({
					...userData,
					uid: response.data[0].token,
					checking: false,
					logged: true,
					name: response.data[0].username,
					email: response.data[0].email
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

	const registerPersonalData = async (state, personalData) => {
		const {
			userData: { tokenRegister }
		} = state
		const response = await api(constantsApi.POST, `singup/finalized/?to=${tokenRegister}`, personalData)
		if (response.completed) {
			navigate('/auth/login')
		}
		return response
	}

	const registerNameAndUserName = async (state, { email, username }) => {
		const { setUserData } = state
		const response = await api(constantsApi.POST, 'singup/start/email', {
			email,
			username
		})

		if (response.completed) {
			setUserData({
				uid: null,
				checking: false,
				logged: false,
				name: '',
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

	const logout = (setUserData) => {
		localStorage.removeItem('token')
		setUserData({
			uid: null,
			checking: false,
			logged: false,
			name: null,
			email: null
		})
	}

	return {
		login,
		ValidateCodeApi,
		verifyToken,
		logout,
		registerNameAndUserName,
		registerPersonalData
	}
}
