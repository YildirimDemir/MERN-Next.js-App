import Style from "../user-detail.module.css";

export default function Sidebar({ setContent, user }) {

    return (
        <div className={`${Style["user-view"]}`} style={{ width: "20%" }}>
            <nav className={`${Style["user-view__menu"]}`}>
                <ul className={`${Style["side-nav"]}`}>
                    <li className={`${Style["side-nav--active"]}`}>
                        <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => setContent("settings")}>
                            <svg>
                                <use xlinkHref="/img/icons.svg#icon-settings" ></use>
                            </svg>
                            | Settings
                        </button>
                        <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => setContent("bookings")}>
                            <svg>
                                <use xlinkHref="/img/icons.svg#icon-briefcase" ></use>
                            </svg>
                            | My Bookings
                        </button>
                        <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => setContent("reviews")}>
                            <svg>
                                <use xlinkHref="/img/icons.svg#icon-star" ></use>
                            </svg>
                            | My Reviews
                        </button>
                        <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => setContent("favourites")}>
                            <svg>
                                <use xlinkHref="/img/icons.svg#icon-heart" ></use>
                            </svg>
                            | My Favourites
                        </button>
                        {user.role === "admin" &&
                            <div style={{ marginTop: "5rem" }}>
                                <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => setContent("dbusers")}>
                                    <svg>
                                        <use xlinkHref="/img/icons.svg#icon-archive" ></use>
                                    </svg>
                                    | Manage Users
                                </button>
                                <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => setContent("dbtours")}>
                                    <svg>
                                        <use xlinkHref="/img/icons.svg#icon-archive" ></use>
                                    </svg>
                                    | Manage Tours
                                </button>
                                <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => setContent("dbreviews")}>
                                    <svg>
                                        <use xlinkHref="/img/icons.svg#icon-archive" ></use>
                                    </svg>
                                    | Manage Reviews
                                </button>
                                <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => setContent("dblikes")}>
                                    <svg>
                                        <use xlinkHref="/img/icons.svg#icon-archive" ></use>
                                    </svg>
                                    | Manage Likes
                                </button>
                                <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => setContent("dbbookings")}>
                                    <svg>
                                        <use xlinkHref="/img/icons.svg#icon-archive" ></use>
                                    </svg>
                                    | Manage Bookings
                                </button>
                            </div>}
                    </li>
                </ul>
            </nav>
        </div>
    )
}
