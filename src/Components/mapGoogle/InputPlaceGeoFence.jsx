import { useEffect, useRef, useState } from 'react'

import { useMapsLibrary } from '@vis.gl/react-google-maps'

export const PlaceAutocompleteClassic = ({ locations, setGeofences, setLocations, type, geofences }) => {
    const inputRef = useRef(null)
    const places = useMapsLibrary('places')
    const options = {
        fields: ['geometry', 'name', 'formatted_address']
    }

    useEffect(() => {

        const autocomplete = places.Autocomplete(inputRef.current, options);
        autocomplete.addListener('place_changed', () => {
            const place = placeAutocomplete.getPlace()
            if (!place.geometry) return;

            // validate if exist geo con nombre location
            const findGeo = Object.values(geofences).find(geo => geo.name === `location_${type}`)
            



            // const newGeofence = {
            //     id: crypto.randomUUID(),
            //     type: 'circle',
            //     name: `location_${type}`,
            //     location: {
            //         type: "Polygon",
            //         coordinates: [[place.geometry.location.lng(), place.geometry.location.lat()]]
            //     },
            //     market: {
            //         location: {
            //             type: "Point",
            //             coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
            //         },
            //         status: 'create'
            //     },
            //     permissions: [],
            //     info: {
            //         status: 'created',
            //         order: 1,
            //         radius: 400
            //     }
            // };

            // setGeofences(prev => ({
            //     ...prev,
            //     [newGeofence.name]: newGeofence
            // }));

            setLocations(prev => ({
                ...prev,
                [type]: place.formatted_address
            }));
        });
    }, [])

    return (
        <div className='autocomplete-container'>
            <input
                className='border text-sm rounded-lg text-black block w-full ps-2 p-2.5 border-gray-600 placeholder-gray-400 focus:ring-offset-gray-400'
                ref={inputRef}
                placeholder='Search for a place'
                onChange={(e) => setLocations({ ...locations, [type]: e.target.value })}
                value={locations[type]}
            />
        </div>
    )
}
