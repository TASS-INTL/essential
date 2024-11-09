import { Navigate, Route, Routes } from 'react-router-dom'

import { SideBarComponent } from '../Components'
import Navbar from '../Components/navBar'
import { pathNavigation } from '../pages/auth/constants'
import { Account } from '../pages/PrivateRoutes/Account/ModuleAccount/Account'
import { UsersScreen } from '../pages/PrivateRoutes/Admin/ModuleUsers/UsersScreen'
import { CentralScreen } from '../pages/PrivateRoutes/Central'
import { InstallersScreen } from '../pages/PrivateRoutes/Central/ModuleInstallers/InstallersScreen'
import { MonitoringScreen } from '../pages/PrivateRoutes/Central/ModuleMonitoring/MonitoringScreen'
import { ServicesClientScreen } from '../pages/PrivateRoutes/Central/ModuleServiceClient/ServicesClientScreen'
import { TableServiceClientScreen } from '../pages/PrivateRoutes/Central/ModuleServiceClient/TableServiceClientScreen'
import {
	CreateService,
	ServicesMasterScreen,
	TableServicesMasterScreen
} from '../pages/PrivateRoutes/Central/ModuleServices'
import {
	CreateTravel,
	DetailTravel,
	EventsTravel,
	GeneralTravel,
	Monitoring,
	Reports,
	TableTravelsScreen,
	TravelsScreen
} from '../pages/PrivateRoutes/Central/ModuleTravels'
import { ChatScreen } from '../pages/PrivateRoutes/Chat/ModuleChat/ChatScreen'
import { DevicesScreen } from '../pages/PrivateRoutes/Inventory/ModuleDevices/DevicesScreen'
import { FormAssignDeviceScreen } from '../pages/PrivateRoutes/Inventory/ModuleDevices/FormAssignDeviceScreen'
import { TableDeviceScreen } from '../pages/PrivateRoutes/Inventory/ModuleDevices/TableDeviceScreen'
import { FactoryDevicesScreen } from '../pages/PrivateRoutes/Inventory/ModuleFactoryDevices/FactoryDevicesScreen'
import { DeviceProviderSocket, Events, General, Test } from '../pages/PrivateRoutes/Inventory/ModuleInventory'
import { TestingScreen } from '../pages/PrivateRoutes/Inventory/ModuleTesting/TestingScreen'
import { NotificationScreen } from '../pages/PrivateRoutes/Notification/ModuleNotification/NotificationScreen'
import { TableNotification } from '../pages/PrivateRoutes/Notification/ModuleNotification/TableNotification'
import { CONNECTION_NAME_SPACE, SOCKET_EVENTS, SOCKETS_ROOMS } from '../pages/PrivateRoutes/sockets/constants'
import { SocketForNameSpace } from '../pages/PrivateRoutes/sockets/socketForNameSpace'
import { SocketProvider } from '../pages/PrivateRoutes/sockets/socketProvider'
import { deviceStore } from '../store/deviceStore'
import { travelsStore } from '../store/travelsStore'
import { routesPrivate } from './constants'

export const PrivateRouter = ({ isAuthenticated }) => {
	return isAuthenticated ? (
		<SocketProvider>
			<RoutesPrivate />
		</SocketProvider>
	) : (
		<Navigate to={pathNavigation.login} />
	)
}

export const RoutesPrivate = () => {
	const setArrayTabledevice = deviceStore((state) => state.setArrayTabledevice)
	const setArrayTableTravels = travelsStore((state) => state.setArrayTableTravels)

	return (
		<div className='flex relative h-screen w-screen bg-[#e6e6e6]'>
			<div className='fixed w-full z-10'>
				<Navbar />
				<SideBarComponent />
			</div>
			<Routes>
				{/* Installers */}
				<Route path={routesPrivate.installersScreen} element={<InstallersScreen />} />
				{/* Monitoring */}
				<Route path={routesPrivate.monitoringScreen} element={<MonitoringScreen />} />
				{/* Service client */}
				<Route path={routesPrivate.servicesClientScreen} element={<ServicesClientScreen />}>
					<Route
						index
						path={routesPrivate.tableServicesClientScreen}
						element={<TableServiceClientScreen />}
					/>
					<Route path={routesPrivate.createService} element={<CreateService />} />
				</Route>
				{/* Services  */}
				<Route path={routesPrivate.servicesMasterScreen} element={<ServicesMasterScreen />}>
					<Route
						index
						path={routesPrivate.tableServicesMasterScreen}
						element={<TableServicesMasterScreen />}
					/>
				</Route>
				{/* Travels */}
				<Route
					path={routesPrivate.centralScreen}
					element={<CentralScreen NameMap='Central' title='Central' />}
				/>
				<Route
					path={routesPrivate.travelsScreen}
					element={
						<SocketForNameSpace
							nameSpace={CONNECTION_NAME_SPACE.TRAVEL}
							typeJoin={SOCKETS_ROOMS.ROOM_TRAVELS}
							socketsEvents={SOCKET_EVENTS.R_TB_TRAVELS}
							functionListening={setArrayTableTravels}
						>
							<TravelsScreen />
						</SocketForNameSpace>
					}
				>
					<Route index path={routesPrivate.tableTravelsScreen} element={<TableTravelsScreen />} />
					<Route path={routesPrivate.createTravel} element={<CreateTravel />} />
					<Route path={routesPrivate.travelIdTravel} element={<DetailTravel />}>
						<Route index path={routesPrivate.general} element={<GeneralTravel />} />
						<Route path={routesPrivate.monitoring} element={<Monitoring />} />
						<Route path={routesPrivate.events} element={<EventsTravel />} />
						<Route path={routesPrivate.reports} element={<Reports />} />
					</Route>
				</Route>

				{/* ============ MODULE ADMIN =============== */}

				{/* Users */}
				<Route path={routesPrivate.usersScreen} element={<UsersScreen />} />

				{/* ============ MODULE CHAT =============== */}

				{/*  Chat */}
				<Route path={routesPrivate.chatScreen} element={<ChatScreen />} />

				<Route path={routesPrivate.testingScreen} element={<TestingScreen />} />

				{/* ============ MODULE INVENTORY =============== */}
				{/* DEVICES OPERATOR - MASTER */}
				<Route
					path={routesPrivate.inventoryScreen}
					element={<CentralScreen NameMap='Inventory' title='Inventario' />}
				/>
				<Route
					path={routesPrivate.devicesScreen}
					element={
						<SocketForNameSpace
							nameSpace={CONNECTION_NAME_SPACE.DEVICE}
							typeJoin={SOCKETS_ROOMS.ROOM_DEVICE_CLI}
							functionListening={setArrayTabledevice}
							socketsEvents={SOCKET_EVENTS.R_TB_DEVICE_CLI}
						>
							<DevicesScreen />
						</SocketForNameSpace>
					}
				>
					<Route index path={routesPrivate.table} element={<TableDeviceScreen />} />
					{/* Factory Device */}
					<Route path={routesPrivate.factoryDevicesScreen} element={<FactoryDevicesScreen />} />
					<Route path={routesPrivate.assignDeviceScreen} element={<FormAssignDeviceScreen />} />
					<Route path={routesPrivate.deviceIdDevice} element={<DeviceProviderSocket />}>
						<Route index path={routesPrivate.general} element={<General />} />
						<Route path={routesPrivate.test} element={<Test />} />
						<Route path={routesPrivate.events} element={<Events />} />
						{/* <Route path={routesPrivate.travels} element={<Travels />} /> */}
					</Route>
				</Route>

				{/* ============ MODULE ACCOUNT =============== */}

				{/* Account */}
				<Route path={routesPrivate.accountScreen} element={<Account />} />

				{/* ============ MODULE NOTIFICATIONS =============== */}

				{/* Notification */}
				<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />}>
					<Route index path={routesPrivate.table} element={<TableNotification />} />
				</Route>
			</Routes>
		</div>
	)
}
