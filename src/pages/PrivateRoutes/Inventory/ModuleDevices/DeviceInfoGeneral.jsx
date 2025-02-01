import React from 'react'
import { battery, padlockClose, padlockOpen } from '@/assets/assetsplatform'
import { ErrorComponent, LoaderComponent } from '@/Components'
import { MapGoogle } from '@/Components/mapGoogle/Map'
import { MarkerComponent } from '@/Components/mapGoogle/Marker'
import { arrayTapInventory, TapBottons } from '@/Components/TapBottons'
import { APIProvider } from '@vis.gl/react-google-maps'
import { useLocation, useParams } from 'react-router-dom'
import { deviceInfoStore } from '@/store/devices/deviceInfoStore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { useDeviceInfo } from './hooks/useDeviceInfo'

export const DeviceInfoGeneral = () => {
    const location = useLocation()
    const { idDevice } = useParams()
    const deviceInfoGeneral = deviceInfoStore((state) => state.general)
    const { handleSendComand } = useDeviceInfo()

    const SendCommand = ({ typeComand }) => {
        console.log('SendCommand', typeComand)
        handleSendComand({ idDevice, typeComand})
    }

    if (deviceInfoGeneral === null) return <LoaderComponent />

    if (deviceInfoGeneral.error) return <ErrorComponent error={deviceInfoGeneral.message} />

    const DeviceInfoItem = ({ label, value }) => (
        <div className="flex items-center justify-between py-2 border-b border-gray-200">
            <span className="font-semibold text-gray-700">{label}:</span>
            <span className="text-gray-600">{value}</span>
        </div>
    )

    const ControlButton = ({ onClick, color, icon, label }) => (
        <button
            onClick={onClick}
            className={`${color} py-2 px-4 text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-all`}
        >
            {icon && <span className="material-icons text-xl">{icon}</span>}
            {label}
        </button>
    )

    return (
        <div className="p-4 space-y-4 h-[calc(100vh-120px)] overflow-y-auto pb-8">
            <TapBottons location={location} idDevice={idDevice} path='devices-screen/device' data={arrayTapInventory} />

            {/* Map with floating device card */}
            <div className="relative h-[50vh] rounded-lg overflow-hidden">
                <div className="absolute top-4 left-6 z-10 max-h-[45vh] overflow-y-auto rounded-lg">
                    <div className="space-y-3 p-2">
                        <Card className="w-64 min-h-[300px] bg-white/95 backdrop-blur-sm shadow-lg border-2">
                            <CardHeader className="bg-white">
                                <CardTitle>Device Status</CardTitle>
                            </CardHeader>
                            <CardContent className="bg-white space-y-2">
                                <DeviceInfoItem label="ID" value={deviceInfoGeneral?.data?._id} />
                                <DeviceInfoItem label="Status" value={deviceInfoGeneral?.data?.general?.state} />
                                <DeviceInfoItem label="DID" value={deviceInfoGeneral?.data?.general?.did} />
                                <DeviceInfoItem label="Lock Status" value={deviceInfoGeneral?.data?.general?.lock?.value} />
                                <DeviceInfoItem label="Nickname" value={deviceInfoGeneral?.data?.general?.nickname} />
                                <DeviceInfoItem label="Type" value={deviceInfoGeneral?.data?.general?.type_state} />
                            </CardContent>
                        </Card>

                        <Card className="w-64 min-h-[250px] bg-white/95 backdrop-blur-sm shadow-lg border-2">
                            <CardHeader className="bg-white">
                                <CardTitle>Control Panel</CardTitle>
                            </CardHeader>
                            <CardContent className="bg-white space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <ControlButton
                                        onClick={() => SendCommand({ typeComand: 'open' })}
                                        color="bg-green-600"
                                        label="Open"
                                    />
                                    <ControlButton
                                        onClick={() => SendCommand({ typeComand: 'close' })}
                                        color="bg-red-600"
                                        label="Close"
                                    />
                                </div>
                                <ControlButton
                                    onClick={() => SendCommand({ typeComand: 'battery' })}
                                    color="bg-blue-600"
                                    label="Check Battery"
                                />
                                <ControlButton
                                    onClick={() => SendCommand({ typeComand: 'location'})}
                                    color="bg-purple-600"
                                    label="Get Location"
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="w-100 h-full">
                    <APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
                        <MapGoogle width='100%' height='100%'>
                            <MarkerComponent
                                lat={deviceInfoGeneral?.data?.general?.last_location?.lat}
                                lng={deviceInfoGeneral?.data?.general?.last_location?.lng}
                            />
                        </MapGoogle>
                    </APIProvider>
                </div>
            </div>

            {/* Device Info and Commands Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Device Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <DeviceInfoItem label="DID" value={deviceInfoGeneral?.data?.general?.did} />
                        <DeviceInfoItem label="Lock Status" value={deviceInfoGeneral?.data?.general?.lock?.value} />
                        <DeviceInfoItem label="Nickname" value={deviceInfoGeneral?.data?.general?.nickname} />
                        <DeviceInfoItem label="Type State" value={deviceInfoGeneral?.data?.general?.type_state} />
                    </CardContent>
                </Card>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Communication</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DeviceInfoItem label="Battery" value={`${deviceInfoGeneral?.data?.general?.batery?.value}%`} />
                        <DeviceInfoItem label="Signal" value={deviceInfoGeneral?.data?.general?.signal || 'N/A'} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DeviceInfoItem label="Latitude" value={deviceInfoGeneral?.data?.general?.last_location?.lat} />
                        <DeviceInfoItem label="Longitude" value={deviceInfoGeneral?.data?.general?.last_location?.lng} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Last Update</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DeviceInfoItem 
                            label="Time" 
                            value={new Date(deviceInfoGeneral?.data?.general?.updated_at).toLocaleString()} 
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
