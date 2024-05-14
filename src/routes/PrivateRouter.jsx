import { Navigate, Route, Routes } from 'react-router-dom'

import { SideBarComponent } from '../Components'
import { pathNavigation } from '../pages/auth/constants'
import { DevicesScreen, NotificationScreen } from '../pages/PrivateRoutes'
import { ChatScreen } from '../pages/PrivateRoutes/Chat/ChatScreen'
import { FormAssignDevice, TableDevice } from '../pages/PrivateRoutes/Devices'
import { FactoryDevicesScreen } from '../pages/PrivateRoutes/FactoryDevices/FactoryDevicesScreen'
import { Device, Events, General, InventoryScreen, TableInventory, Test } from '../pages/PrivateRoutes/Inventory'
import { DetailNotification } from '../pages/PrivateRoutes/Notification/DetailNotification'
import { TableNotification } from '../pages/PrivateRoutes/Notification/TableNotification'
import { ServicesClient, TableServiceClient } from '../pages/PrivateRoutes/ServiceClient'
import { CreateService, Services, Table } from '../pages/PrivateRoutes/Services'
import { SettingsScreen } from '../pages/PrivateRoutes/Settings/SettingsScreen'
import { CONNECTION_NAME_SPACE, SOCKET_EVENTS, SOCKETS_ROOMS } from '../pages/PrivateRoutes/sockets/constants'
import { SocketForNameSpace } from '../pages/PrivateRoutes/sockets/socketForNameSpace'
import { SocketProvider } from '../pages/PrivateRoutes/sockets/socketProvider'
import { TestingScreen } from '../pages/PrivateRoutes/Testing/TestingScreen'
import { CreateTravel, TableTravels, Travels } from '../pages/PrivateRoutes/Travels'
import { UsersScreen } from '../pages/PrivateRoutes/Users/UsersScreen'
import { deviceStore } from '../store/deviceStore'
import { inventoryStore } from '../store/inventoryStore'
import { routesPrivate } from './constants'

export const PrivateRouter = ({ isAuthenticated }) => {
	return isAuthenticated ? <RoutesPrivate /> : <Navigate to={pathNavigation.login} />
}

export const RoutesPrivate = () => {
	const setArrayTabledevice = deviceStore((state) => state.setArrayTabledevice)
	const setArrayTableInventory = inventoryStore((state) => state.setArrayTableInventory)

	return (
		<SocketProvider>
			<div className='flex'>
				<SideBarComponent />
				<Routes>
					<Route path={routesPrivate.chatScreen} element={<ChatScreen />} />
					<Route path={routesPrivate.ServicesScreen} element={<Services />}>
						<Route index path='table' element={<Table />} />
					</Route>
					<Route path={routesPrivate.ServicesClientScreen} element={<ServicesClient />}>
						<Route index path='table' element={<TableServiceClient />} />
						<Route index path='create-service' element={<CreateService />} />
					</Route>
					<Route path={routesPrivate.TravelsScreen} element={<Travels />}>
						<Route index path='table' element={<TableTravels />} />
						<Route index path='create-travel' element={<CreateTravel />} />
					</Route>
					<Route path={routesPrivate.usersScreen} element={<UsersScreen />} />
					<Route path={routesPrivate.TestingScreen} element={<TestingScreen />} />
					<Route
						path={routesPrivate.devicesScreen}
						element={
							<SocketForNameSpace
								nameSpace={CONNECTION_NAME_SPACE.DEVICE}
								typeJoin={'room_device_cli'}
								socketsEvents={'r_tb_device_cli'}
								functionListening={setArrayTabledevice}
							>
								<DevicesScreen />
							</SocketForNameSpace>
						}
					>
						<Route index path='table' element={<TableDevice />} />
						<Route index path='assign-device' element={<FormAssignDevice />} />
					</Route>
					<Route
						path={routesPrivate.InventoryScreen}
						element={
							<SocketForNameSpace
								nameSpace={CONNECTION_NAME_SPACE.DEVICE}
								typeJoin={SOCKETS_ROOMS.ROOM_INVENTORY}
								socketsEvents={SOCKET_EVENTS.R_TB_DEVICE_FAC}
								functionListening={setArrayTableInventory}
							>
								<InventoryScreen />
							</SocketForNameSpace>
						}
					>
						<Route index path='table' element={<TableInventory />} />
						<Route path='device/:idDevice' element={<Device />}>
							<Route index path='general' element={<General />} />
							<Route path='test' element={<Test />} />
							<Route path='events' element={<Events />} />
							<Route path='travels' element={<Travels />} />
						</Route>
					</Route>
					<Route path={routesPrivate.settingsScreen} element={<SettingsScreen />} />
					{/* <Route path={routesPrivate.dashboardScreen} element={<DashboardScreen />} /> */}
					<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />}>
						<Route index path='table' element={<TableNotification />} />
						<Route path=':idNotification' element={<DetailNotification />} />
					</Route>
					<Route path={routesPrivate.FactoryDevicesScreen} element={<FactoryDevicesScreen />} />
				</Routes>
			</div>
		</SocketProvider>
	)
}
