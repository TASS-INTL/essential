import React from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'

import {
	ForgotPasswordScreen,
	LoginScreen,
	PersonalDataScreen,
	RegisterScreen,
	ValidateCodeScreen
} from '../pages/auth'
import { pathNavigation } from '../pages/auth/constants'
import { userStore } from '../store/userStore'

export const PublicRouter = {
	loginScreen: 'login-screen',
	registerScreen: 'register-screen',
	PersonalDataScreen: 'personal-data-screen',
	validateCodeScreen: 'validate-code-screen',
	forgotPasswordScreen: 'forgot-password-screen'
}

export const AuthRouter = () => {
	const location = useLocation()
	const { tokenRegister } = userStore((state) => state.userData)

	if (location.pathname === pathNavigation.personalData && tokenRegister === null) {
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
