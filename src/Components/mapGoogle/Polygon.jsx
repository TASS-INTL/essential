import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react'

import { GoogleMapsContext, useMapsLibrary } from '@vis.gl/react-google-maps'

function usePolygon(props) {
    const { onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut, onPathChanged, pathsArray, ...polygonOptions } = props
    const callbacks = useRef({})
    Object.assign(callbacks.current, {
        onClick,
        onDrag,
        onDragStart,
        onDragEnd,
        onMouseOver,
        onMouseOut,
        onPathChanged
    })

    const polygon = useRef(new google.maps.Polygon()).current

    const geometryLibrary = useMapsLibrary('geometry')

    // update PolygonOptions (note the dependencies aren't properly checked
    // here, we just assume that setOptions is smart enough to not waste a
    // lot of time updating values that didn't change)
    useMemo(() => {
        polygon.setOptions(polygonOptions)
    }, [polygon, polygonOptions])

    const map = useContext(GoogleMapsContext)?.map

    // update the path with the encodedPath
    useMemo(() => {
        if (!pathsArray || !geometryLibrary) return
        const paths = pathsArray.map((coord) => ({ lat: coord[1], lng: coord[0] }))
        polygon.setPaths([paths])
    }, [polygon, pathsArray, geometryLibrary])

    // create polygon instance and add to the map once the map is available
    useEffect(() => {
        if (!map) {
            if (map === undefined) console.error('<Polygon> has to be inside a Map component.')

            return
        }

        polygon.setMap(map)

        return () => {
            polygon.setMap(null)
        }
    }, [map])

    // attach and re-attach event-handlers when any of the properties change
    useEffect(() => {
        if (!polygon) return

        const gme = google.maps.event
        const listeners = [
            ['click', 'onClick'],
            ['drag', 'onDrag'],
            ['dragstart', 'onDragStart'],
            ['dragend', 'onDragEnd'],
            ['mouseover', 'onMouseOver'],
            ['mouseout', 'onMouseOut']
        ]

        // Agregar listener específico para cambios en el path
        if (callbacks.current.onPathChanged) {
            const path = polygon.getPath();
            listeners.push(['set_at', 'onPathChanged']);
            listeners.push(['insert_at', 'onPathChanged']);
            listeners.push(['remove_at', 'onPathChanged']);
        }

        listeners.forEach(([eventName, eventCallback]) => {
            gme.addListener(polygon, eventName, (e) => {
                const callback = callbacks.current[eventCallback]
                if (callback) callback(polygon)
            })
        })

        return () => {
            gme.clearInstanceListeners(polygon)
        }
    }, [polygon])

    return polygon
}

/**
 * Component to render a polygon on a map
 */
export const Polygon = forwardRef((props, ref) => {
	const polygon = usePolygon(props)

	useImperativeHandle(ref, () => polygon, [])

	return null
})
