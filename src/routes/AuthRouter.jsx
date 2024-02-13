import React from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'

import {
	ForgotPasswordScreen,
	LoginScreen,
	PersonalDataScreen,
	RegisterScreen,
	ValidateCodeScreen
} from '../pages/auth'
import { userStore } from '../store/userStore'

const PublicRouter = {
	loginScreen: 'login-screen',
	registerScreen: 'register-screen',
	PersonalDataScreen: 'personalData-screen',
	validateCodeScreen: 'validateCode-screen',
	forgotPasswordScreen: 'forgotPassword-screen'
}

export const AuthRouter = () => {
	const location = useLocation()
	const { tokenRegister } = userStore((state) => state.userData)

	console.log(location.pathname)
	if (location.pathname === '/auth/personal-data' && tokenRegister === null) {
		return <LoginScreen />
	}

	return (
		<Routes>
			<Route path={PublicRouter.loginScreen} element={<LoginScreen />} />
			<Route path={PublicRouter.registerScreen} element={<RegisterScreen />} />
			<Route path={PublicRouter.validateCodeScreen} element={<ValidateCodeScreen />} />
			<Route path={PublicRouter.PersonalDataScreen} element={<PersonalDataScreen />} />
			<Route path={PublicRouter.forgotPasswordScreen} element={<ForgotPasswordScreen />} />
		</Routes>
	)
}
