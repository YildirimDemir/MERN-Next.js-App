import Style from "../tour-detail.module.css";
import MapBox from "./MapBox";

export default function TourMap({ tour }) {
    return (
        <section className={`${Style["section-map"]}`}>
            <MapBox locations={tour.locations} />
        </section>
    )
}
