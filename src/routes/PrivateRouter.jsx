import { Navigate, Route, Routes } from 'react-router-dom'

import { SideBarComponent } from '../Components'
import { pathNavigation } from '../pages/auth/constants'
import { DevicesScreen, NotificationScreen } from '../pages/PrivateRoutes'
import { Account } from '../pages/PrivateRoutes/Account'
import { ChatScreen } from '../pages/PrivateRoutes/Chat'
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
import { CreateTravel, DetailTravel, GeneralTravel, TableTravels, Travels } from '../pages/PrivateRoutes/Travels'
import { UsersScreen } from '../pages/PrivateRoutes/Users/UsersScreen'
import { deviceStore } from '../store/deviceStore'
import { inventoryStore } from '../store/inventoryStore'
import { travelsStore } from '../store/travelsStore'
import { routesPrivate } from './constants'

export const PrivateRouter = ({ isAuthenticated }) => {
	return isAuthenticated ? <RoutesPrivate /> : <Navigate to={pathNavigation.login} />
}

export const RoutesPrivate = () => {
	const setArrayTabledevice = deviceStore((state) => state.setArrayTabledevice)
	const setArrayTableInventory = inventoryStore((state) => state.setArrayTableInventory)
	const setArrayTableTravels = travelsStore((state) => state.setArrayTableTravels)

	return (
		<SocketProvider>
			<div className='flex'>
				<SideBarComponent />
				<Routes>
					<Route path={routesPrivate.chatScreen} element={<ChatScreen />} />
					<Route path={routesPrivate.servicesScreen} element={<Services />}>
						<Route index path='table' element={<Table />} />
					</Route>
					<Route path={routesPrivate.servicesClientScreen} element={<ServicesClient />}>
						<Route index path='table' element={<TableServiceClient />} />
						<Route index path='create-service' element={<CreateService />} />
					</Route>
					<Route
						path={routesPrivate.travelsScreen}
						element={
							<SocketForNameSpace
								nameSpace={CONNECTION_NAME_SPACE.TRAVEL}
								typeJoin={SOCKETS_ROOMS.ROOM_TRAVELS}
								socketsEvents={SOCKET_EVENTS.R_TB_TRAVELS}
								functionListening={setArrayTableTravels}
							>
								<Travels />
							</SocketForNameSpace>
						}
					>
						<Route index path='table' element={<TableTravels />} />
						<Route index path='create-travel' element={<CreateTravel />} />
						<Route path='travel/:idTravel' element={<DetailTravel />}>
							<Route index path='general' element={<GeneralTravel />} />
							{/* <Route path='test' element={<Test />} /> */}
							{/* <Route path='events' element={<Events />} /> */}
							{/* <Route path='travels' element={<Travels />} /> */}
						</Route>
					</Route>
					<Route path={routesPrivate.usersScreen} element={<UsersScreen />} />
					<Route path={routesPrivate.testingScreen} element={<TestingScreen />} />
					<Route
						path={routesPrivate.devicesScreen}
						element={
							<SocketForNameSpace
								nameSpace={CONNECTION_NAME_SPACE.DEVICE}
								typeJoin={SOCKETS_ROOMS.ROOM_DEVICE_CLI}
								socketsEvents={SOCKET_EVENTS.R_TB_DEVICE_CLI}
								functionListening={setArrayTabledevice}
							>
								<DevicesScreen />
							</SocketForNameSpace>
						}
					>
						<Route index path='table' element={<TableDevice />} />
						<Route index path='assign-device' element={<FormAssignDevice />} />
						<Route path='device/:idDevice' element={<Device />}>
							<Route index path='general' element={<General />} />
							<Route path='test' element={<Test />} />
							<Route path='events' element={<Events />} />
							<Route path='travels' element={<Travels />} />
						</Route>
					</Route>
					<Route
						path={routesPrivate.inventoryScreen}
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
					<Route path={routesPrivate.accountScreen} element={<Account />} />
					<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />}>
						<Route index path='table' element={<TableNotification />} />
						<Route path=':idNotification' element={<DetailNotification />} />
					</Route>
					<Route path={routesPrivate.factoryDevicesScreen} element={<FactoryDevicesScreen />} />
				</Routes>
			</div>
		</SocketProvider>
	)
}
