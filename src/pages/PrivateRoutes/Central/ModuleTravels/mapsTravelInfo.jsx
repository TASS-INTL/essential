
import { Outlet } from "react-router-dom";
import { APIProvider, useMap } from '@vis.gl/react-google-maps'
import { MapGoogle } from '@/Components/mapGoogle/Map'
import { Polygon } from '@/Components/mapGoogle/Polygon'
import { Polyline } from '@/Components/mapGoogle/Polyline'
import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { useMapLogic } from '@/hooks/map/useMap'
import { travelInfoStore } from "@/store/travels/travelInfoStore";
import { useEffect } from "react";
import { GeofenceMapComponent } from "../../Routing/ModuleGeofence/GeofenceMapComponent";




export const MapTravelInfo = () => {
    const { state, dispatch } = useMapLogic()
    const travelInfoGeneral = travelInfoStore((state) => state.general)
    const onClickPolygon = (e) => {
        console.log('click polygon', e)
    }
    console.log("TRAVEL INFO: ", travelInfoGeneral)
    return (
        <div className="grid grid-cols-2 h-full pl-8">
            <div className="relative bg-white p-3 pt-6">
                <APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
                    <MapGoogle width={'100%'} showDrawingManager state={state} dispatch={dispatch}>
                        <MapHandlerBoundliteral viewport={travelInfoGeneral?.data?.routing?.viewport} />
                        {!!travelInfoGeneral?.data?.location_finalization &&
                            <GeofenceMapComponent
                                key={travelInfoGeneral?.data?.location_finalization?.id}
                                geofence={travelInfoGeneral?.data?.location_finalization}
                            />
                            
                        }
                        {!!travelInfoGeneral?.data?.location_installation &&
                            <GeofenceMapComponent
                                key={travelInfoGeneral?.data?.location_installation?.id}
                                geofence={travelInfoGeneral?.data?.location_installation}
                            />
                            
                        }
                        {!!travelInfoGeneral?.data?.routing?.coordinatesroute && (
                            <Polyline
                                onClick={onClickPolygon}
                                strokeWeight={4}
                                strokeColor={'#c27e79'}
                                pathArray={travelInfoGeneral?.data?.routing?.coordinatesroute}
                            />
                        )}
                        {!!travelInfoGeneral?.data?.routing?.location_start && (
                             <GeofenceMapComponent
                                key={travelInfoGeneral?.data?.routing?.location_start.id}
                                geofence={travelInfoGeneral?.data?.routing?.location_start}
                            />
                        )}
                        {!!travelInfoGeneral?.data?.routing?.location_end && (
                           <GeofenceMapComponent
                                key={travelInfoGeneral?.data?.routing?.location_end.id}
                                geofence={travelInfoGeneral?.data?.routing?.location_end}
                            />
                        )}

                        {!!travelInfoGeneral?.data?.routing?.stations && 
                            travelInfoGeneral?.data?.routing?.stations.map((station, index) => (
                                <GeofenceMapComponent
                                    key={station.id}
                                    geofence={station}
                                />
                            ))
                        }
                    </MapGoogle>
                    {/* cuadrado */}
                    {/* <div className="absolute top-0 left-0 bg-white h-[80%] w-3/21 m-50 mr-50">
                        hola
                    </div> */}
                </APIProvider>
            </div>
            <Outlet />
        </div>
    );
}

export const MapHandlerBoundliteral = ({ viewport }) => {
    const map = useMap()

    useEffect(() => {
        if (!map || !viewport) return

        if (viewport) {
            map.fitBounds(viewport, 50)
        }
    }, [map, viewport])

    return null
}