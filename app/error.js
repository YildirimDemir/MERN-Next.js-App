"use client";
import Style from "./error.module.css";

export default function TourErrorPage({ error }) {
    return (
        <main className={Style.main}>
            <div className={Style.error}>
                <div className={`${Style["error__title"]}`}>
                    <h2 className={`${Style["heading-secondary"]} ${Style["heading-secondary--error"]}`}>Uh oh! Something went wrong!</h2>
                    <h2 className={`${Style["error__emoji"]}`}>😥</h2>
                </div>
                <div className={`${Style["error__msg"]}`}>
                    {error.message}
                </div>
            </div>
        </main>
    )
}
