import { useAuthProvider } from '@/pages/auth/hooks/useAuthProvider'
import { PoliciesScreen } from '@/pages/PrivateRoutes/Admin/ModulePolicies/PoliciesScreen'
import { ProfilesScreen } from '@/pages/PrivateRoutes/Admin/ModuleProfiles/ProfilesScreen'
import { Navigate, Route, Routes } from 'react-router-dom'


// Centers
import { CentersScreen } from '@/pages/PrivateRoutes/Central/ModuleCentral/CentralScreen'

import { LoaderComponent, SideBarComponent } from '../Components'
import { NavBarUIComponent } from '@/Components/ui/NavBar'
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
import { DevicesTravelInfo } from '@/pages/PrivateRoutes/Central/ModuleTravels/DevicesTravelInfo'
import { OperationsTravelInfo } from '@/pages/PrivateRoutes/Central/ModuleTravels/OperationsTravelInfo'
import { ChatScreen } from '../pages/PrivateRoutes/Chat/ModuleChat/ChatScreen'
import { DevicesScreen } from '../pages/PrivateRoutes/Inventory/ModuleDevices/DevicesScreen'
import { FormAssignDeviceScreen } from '../pages/PrivateRoutes/Inventory/ModuleDevices/FormAssignDeviceScreen'
import { TableDeviceScreen } from '../pages/PrivateRoutes/Inventory/ModuleDevices/TableDeviceScreen'
import { FactoryDevicesScreen } from '../pages/PrivateRoutes/Inventory/ModuleFactoryDevices/FactoryDevicesScreen'
import { SocketTravelsProvider } from '@/pages/PrivateRoutes/sockets/socketTravelsNameSpace'
import { DeviceProviderSocket, Events, General, Test } from '../pages/PrivateRoutes/Inventory/ModuleInventory'
import { DeviceInfoProviderSocket } from '@/pages/PrivateRoutes/Inventory/ModuleDevices/DeviceInfoProviderSocket'
import { TravelInfoProviderSocket } from '@/pages/PrivateRoutes/Central/ModuleTravels/TravelInfoProviderSocket'
import { MapTravelInfo } from '@/pages/PrivateRoutes/Central/ModuleTravels/mapsTravelInfo'
import { DeviceInfoEvents } from '@/pages/PrivateRoutes/Inventory/ModuleDevices/DeviceInfoEvents'
import { DeviceInfoGeneral } from '@/pages/PrivateRoutes/Inventory/ModuleDevices/DeviceInfoGeneral'
import { DeviceInfoTests } from '@/pages/PrivateRoutes/Inventory/ModuleDevices/DeviceInfoTests'
import { TestingScreen } from '../pages/PrivateRoutes/Inventory/ModuleTesting/TestingScreen'
import { NotificationScreen } from '../pages/PrivateRoutes/Notification/ModuleNotification/NotificationScreen'
import { TableNotification } from '../pages/PrivateRoutes/Notification/ModuleNotification/TableNotification'
import { CONNECTION_NAME_SPACE, SOCKET_EVENTS, SOCKETS_ROOMS } from '../pages/PrivateRoutes/sockets/constants'
import { SocketForNameSpace } from '../pages/PrivateRoutes/sockets/socketForNameSpace'
import { SocketDeviceProvider } from '@/pages/PrivateRoutes/sockets/socketDeviceNameSpace'
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
	const { queryUserToken, logout } = useAuthProvider()

	const userHasToken = queryUserToken()

	if (userHasToken?.isLoading) return <LoaderComponent />

	if (userHasToken.error) {
		logout()
	}
	
	return (
		<div className='flex h-screen w-screen bg-[#e6e6e6]'>
			<div className='h-full w-36'>
				<SideBarComponent />

			</div>
			<div className='w-full z-10'>

				<Navbar />
				{/* <div className='flex w-full h-full z-0'> */}
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
								<SocketTravelsProvider>
									<TravelsScreen />
								</SocketTravelsProvider>
							}
						>
							<Route index path={routesPrivate.tableTravelsScreen} element={<TableTravelsScreen />} />
							<Route path={routesPrivate.createTravel} element={<CreateTravel />} />
							<Route path={routesPrivate.travelIdTravel} element={<TravelInfoProviderSocket />}>
								<Route index path={routesPrivate.general} element={<GeneralTravel />} />
								<Route path={routesPrivate.devices} element={<DevicesTravelInfo />} />
								<Route path={routesPrivate.operations} element={<OperationsTravelInfo />} />
								<Route path={routesPrivate.monitoring} element={<Monitoring />} />
								<Route path={routesPrivate.events} element={<EventsTravel />} />
								<Route path={routesPrivate.reports} element={<Reports />} />
							</Route>
						</Route>

						{/* ============ MODULE CENTERS =============== */}
						{/* Centers */}
						<Route path={routesPrivate.centersScreen} element={<CentersScreen />} />

						{/* ============ MODULE CENTRAL =============== */}
						{/* Central */}

						{/* ============ MODULE ADMIN =============== */}

						{/* Users */}
						<Route
							path={routesPrivate.adminScreen}
							element={<CentralScreen NameMap='Admin' title='Administrador' />}
						/>
						<Route path={routesPrivate.usersScreen} element={<UsersScreen />} />
						<Route path={routesPrivate.profilesScreen} element={<ProfilesScreen />} />
						<Route path={routesPrivate.policiesScreen} element={<PoliciesScreen />} />

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
								<SocketDeviceProvider>
									<DevicesScreen />
								</SocketDeviceProvider>
							}
						>
							<Route index path={routesPrivate.table} element={<TableDeviceScreen />} />
							{/* Factory Device */}
							<Route path={routesPrivate.factoryDevicesScreen} element={<FactoryDevicesScreen />} />
							<Route path={routesPrivate.assignDeviceScreen} element={<FormAssignDeviceScreen />} />
							<Route path={routesPrivate.deviceIdDevice} element={<DeviceInfoProviderSocket />}>
								<Route index path={routesPrivate.general} element={<DeviceInfoGeneral />} />
								<Route path={routesPrivate.test} element={<DeviceInfoTests />} />
								<Route path={routesPrivate.events} element={<DeviceInfoEvents />} />
								{/* <Route path={routesPrivate.travels} element={<Travels />} /> */}
							</Route>
						</Route>

						{/* ============ MODULE ACCOUNT =============== */}

						{/* Account */}
						<Route path={routesPrivate.accountScreen} element={<Account />} />
						<Route
							path={routesPrivate.routingScreen}
							element={<CentralScreen NameMap='Routing' title='Modulo de rutas' />}
						/>

						{/* ============ MODULE NOTIFICATIONS =============== */}

						{/* Notification */}
						<Route path={routesPrivate.notificationScreen} element={<NotificationScreen />}>
							<Route index path={routesPrivate.table} element={<TableNotification />} />
						</Route>
					</Routes>
				</div>
			</div>
			
		// </div>
	)
}
