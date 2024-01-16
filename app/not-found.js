"use client";
import Style from "./notfound.module.css";

export default function TourNotFoundPage() {
    return (
        <main className={Style.main}>
            <div className={Style.notfound}>
                <div className={`${Style["notfound__title"]}`}>
                    <h2 className={`${Style["heading-secondary"]} ${Style["heading-secondary--notfound"]}`}>404 Not Found</h2>
                </div>
            </div>
        </main>
    )
}
