import React from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Landing } from '../pages/LandingPage'
import { userStore } from '../store/userStore'
import { pathRoutes } from './constants'
import { PrivateRouter } from './PrivateRouter'
import { PublicRouter } from './PublicRouter'

export const queryClient = new QueryClient()

export const AppRouter = () => {
	const { logged } = userStore((state) => state.userData)

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ToastContainer />
				<Routes>
					<Route path={pathRoutes.landing} element={<Landing />} />
					<Route path={pathRoutes.auth} element={<PublicRouter isAuthenticated={logged} />} />
					<Route path={pathRoutes.user} element={<PrivateRouter isAuthenticated={logged} />} />
				</Routes>
			</BrowserRouter>
		</QueryClientProvider>
	)
}
