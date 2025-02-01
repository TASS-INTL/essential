
import { Outlet } from "react-router-dom";
import { APIProvider, useMap } from '@vis.gl/react-google-maps'
import { MapGoogle } from '@/Components/mapGoogle/Map'
import { Polygon } from '@/Components/mapGoogle/Polygon'
import { Polyline } from '@/Components/mapGoogle/Polyline'
import { API_KEY_GOOGLE_MAPS } from '../../constants/constants'
import { useMapLogic } from '@/hooks/map/useMap'
import { travelInfoStore } from "@/store/travels/travelInfoStore";
import { useEffect } from "react";




export const MapTravelInfo = () => {
    const { state, dispatch } = useMapLogic()
    const travelInfoGeneral = travelInfoStore((state) => state.general)
    const onClickPolygon = (e) => {
        console.log('click polygon', e)
    }
    return (
        <div className="grid grid-cols-[1fr_auto] h-full pl-8">
            <div className="relative bg-white p-3 pt-6">
                <APIProvider apiKey={API_KEY_GOOGLE_MAPS}>
                    <MapGoogle width={'100%'} showDrawingManager state={state} dispatch={dispatch}>
                        <MapHandlerBoundliteral viewport={travelInfoGeneral?.data?.routing?.viewport} />
                        {!!travelInfoGeneral?.data?.routing?.coordinatesroute && (
                            <Polyline
                                onClick={onClickPolygon}
                                strokeWeight={7}
                                strokeColor={'#c27e79'}
                                pathArray={travelInfoGeneral?.data?.routing?.coordinatesroute}
                            />
                        )}
                        {!!travelInfoGeneral?.data?.routing?.location_start && (
                            <Polygon
                                onClick={onClickPolygon}
                                strokeWeight={1.5}
                                pathsArray={travelInfoGeneral?.data?.routing?.location_start?.location.coordinates[0]}
                            />
                        )}
                        {!!travelInfoGeneral?.data?.routing?.location_end && (
                            <Polygon
                                onClick={onClickPolygon}
                                strokeWeight={1.5}
                                pathsArray={travelInfoGeneral?.data?.routing?.location_end?.location.coordinates[0]}
                            />
                        )}
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