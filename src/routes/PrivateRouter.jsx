import { Navigate, Route, Routes } from 'react-router-dom'

import { SideBarComponent } from '../Components'
import { pathNavigation } from '../pages/auth/constants'
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
	return isAuthenticated ? <RoutesPrivate /> : <Navigate to={pathNavigation.login} />
}

const routesPrivate = {
	chatScreen: 'chat-screen',
	usersScreen: 'users-screen',
	groupScreen: 'group-screen',
	accountScreen: 'account-screen',
	devicesScreen: 'devices-screen',
	settingsScreen: 'settings-screen',
	dashboardScreen: 'dashboard-screen',
	notificationScreen: 'notification-screen'
}

export const RoutesPrivate = () => {
	return (
		<SocketProvider>
			<div className='flex'>
				<SideBarComponent />
				<Routes>
					<Route path={routesPrivate.chatScreen} element={<ChatScreen />} />
					<Route path={routesPrivate.usersScreen} element={<UsersScreen />} />
					<Route path={routesPrivate.groupScreen} element={<GroupScreen />} />
					<Route path={routesPrivate.accountScreen} element={<AccountScreen />} />
					<Route path={routesPrivate.devicesScreen} element={<DevicesScreen />} />
					<Route path={routesPrivate.settingsScreen} element={<SettingsScreen />} />
					<Route path={routesPrivate.dashboardScreen} element={<DashboardScreen />} />
					<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />} />
				</Routes>
			</div>
		</SocketProvider>
	)
}
