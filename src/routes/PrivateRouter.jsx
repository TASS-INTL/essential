import { Navigate, Route, Routes } from 'react-router-dom'

import {
	AccountScreen,
	ChatScreen,
	DashboardScreen,
	DevicesScreen,
	GroupScreen,
	NotificationScreen,
	SettingsScreen,
	UsersScreen
} from '../pages/PrivateRoutes'
import { SocketProvider } from '../pages/PrivateRoutes/socketNotification/socketProvider'

export const PrivateRouter = ({ isAuthenticated }) => {
	return isAuthenticated ? <RoutesPrivate /> : <Navigate to='/auth/login-screen' />
}

const routesPrivate = {
	chatScreen: 'chatScreen',
	UsersScreen: 'UsersScreen',
	groupScreen: 'groupScreen',
	accountScreen: 'accountScreen',
	devicesScreen: 'devicesScreen',
	settingsScreen: 'settingsScreen',
	dashboardScreen: 'dashboardScreen',
	NotificationScreen: 'NotificationScreen'
}

export const RoutesPrivate = () => {
	return (
		<SocketProvider>
			<div className='flex'>
				<SideBar />
				<Routes>
					<Route path={routesPrivate.chatScreen} element={<ChatScreen />} />
					<Route path={routesPrivate.UsersScreen} element={<UsersScreen />} />
					<Route path={routesPrivate.groupScreen} element={<GroupScreen />} />
					<Route path={routesPrivate.accountScreen} element={<AccountScreen />} />
					<Route path={routesPrivate.devicesScreen} element={<DevicesScreen />} />
					<Route path={routesPrivate.settingsScreen} element={<SettingsScreen />} />
					<Route path={routesPrivate.dashboardScreen} element={<DashboardScreen />} />
					<Route path={routesPrivate.NotificationScreen} element={<NotificationScreen />} />
				</Routes>
			</div>
		</SocketProvider>
	)
}
