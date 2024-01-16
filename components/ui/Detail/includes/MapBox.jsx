"use client";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import Style from "../tour-detail.module.css";

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

function Marker() {
    return (
        <div className={Style.marker}></div>
    )
}

export default function App({ locations }) {
    const mapContainer = useRef(null);
    const map = useRef(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: locations[0].coordinates,
            zoom: 5,
            doubleClickZoom: false,
            scrollZoom: false
        });

        locations.forEach(location => {
            const [longitude, latitude] = location.coordinates;

            new mapboxgl.Marker(<Marker />)
                .setLngLat([longitude, latitude])
                .addTo(map.current);

            new mapboxgl.Popup({ offset: 30 })
                .setLngLat([longitude, latitude]).setHTML(`<h5>Day ${location.day}: ${location.description}</h5>`).addTo(map.current);

        });
    }, [locations]);

    return (
        <div ref={mapContainer} style={{ width: "100%", top: "0", bottom: "0", position: "absolute" }} />
    );
}
