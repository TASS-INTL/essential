import { Navigate, Route, Routes } from 'react-router-dom'

import { SideBar } from '../Components/SideBar'
import { AccountComponent } from '../pages/PrivateRoutes/Account'
import { ChatComponent } from '../pages/PrivateRoutes/Chat'
import { Dashboard } from '../pages/PrivateRoutes/dashboard'
import { DevicesComponent } from '../pages/PrivateRoutes/Devices'
import { Groups } from '../pages/PrivateRoutes/Groups'
import { SettingsComponents } from '../pages/PrivateRoutes/Settings'
import { Users } from '../pages/PrivateRoutes/Users'

export const PrivateRouter = ({ isAuthenticated }) => {
	return isAuthenticated ? <RoutesPrivate /> : <Navigate to='/auth/login' />
}

const routesPrivate = {
	chat: 'chat',
	Users: 'Users',
	groups: 'groups',
	account: 'account',
	devices: 'devices',
	settings: 'settings',
	dashboard: 'dashboard'
}

export const RoutesPrivate = () => {
	return (
		<div className='flex'>
			<SideBar />
			<Routes>
				<Route path={routesPrivate.Users} element={<Users />} />
				<Route path={routesPrivate.groups} element={<Groups />} />
				<Route path={routesPrivate.chat} element={<ChatComponent />} />
				<Route path={routesPrivate.dashboard} element={<Dashboard />} />
				<Route path={routesPrivate.account} element={<AccountComponent />} />
				<Route path={routesPrivate.devices} element={<DevicesComponent />} />
				<Route path={routesPrivate.settings} element={<SettingsComponents />} />
			</Routes>
		</div>
	)
}
