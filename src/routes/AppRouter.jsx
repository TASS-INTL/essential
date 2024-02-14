import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { Landing } from '../pages/LandingPage'
import { userStore } from '../store/userStore'
import { pathRoutes } from './constants'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

export const AppRouter = () => {
	const userData = userStore((state) => state.userData)
	return (
		<Routes>
			<Route path={pathRoutes.landing} element={<Landing />} />
			<Route path={pathRoutes.auth} element={<PublicRouter isAuthenticated={userData.logged} />} />
			<Route path={pathRoutes.user} element={<PrivateRouter isAuthenticated={userData.logged} />} />
		</Routes>
	)
}
