"use client";
import { decreaseItemQuantity, getBasket, increaseItemQuantity, updateBasket } from "@/global/basketSlice";
import { userLogout } from "@/services/apiUsers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import Style from "./navbar.module.css";

export default function Navbar({ reqUser }) {

    const [updateDBBasket, setUpdateDBBasket] = useState(true);

    const dispatch = useDispatch();

    const [showBasket, setShowBasket] = useState(false);
    const [animation, setAnimation] = useState(false);

    async function logoutHandler() {
        await userLogout();
    }

    function handleBasket() {
        setShowBasket(show => !show);
        setAnimation(true);
    }

    useEffect(() => {
        if (updateDBBasket && reqUser?.basket?.length > 0) {
            dispatch(updateBasket(reqUser?.basket));
        }
        setUpdateDBBasket(false);
    }, []);

    const basket = useSelector(getBasket);

    function increaseItem(tourId) {
        dispatch(increaseItemQuantity(tourId));
    }

    function decreaseItem(tourId) {
        dispatch(decreaseItemQuantity(tourId));
    }

    return (
        <>
            <header className={Style.header}>
                <nav className={`${Style.nav} ${Style["nav--tours"]}`}>
                    <Link href="/" className={`${Style["nav__el"]}`}>
                        All Tours
                    </Link>
                    <SearchBar />
                </nav>
                <div className={`${Style["header__logo"]}`}>
                    <Image src="/img/logo-white.png" width={70} height={250} alt="Natours-logo" />
                </div>
                <nav className={`${Style.nav} ${Style["nav--user"]}`}>
                    {reqUser ?
                        <>
                            <Link href="/profile" className={`${Style["nav__el"]}`}>
                                <Image className={`${Style["nav__user-img"]}`} src={`/img/users/${reqUser?.photo}`} priority width={50} height={50} alt={`Photo of ${reqUser.name}`} />
                                <span>{reqUser.name}</span>
                            </Link>
                            <button className={`${Style["nav__el"]}`} onClick={logoutHandler}>
                                Logout
                            </button>
                        </>
                        :
                        <>
                            <Link href="/login" className={`${Style["nav__el"]}`}>
                                Login
                            </Link>
                            <Link href="/signup" className={`${Style["nav__el"]} ${Style["nav__el--cta"]}`}>
                                Sign up
                            </Link>
                        </>}
                    <button className={`${Style["nav__el"]}`} onClick={handleBasket}>
                        <svg className={`${Style["card__icon"]}`}>
                            <use xlinkHref="/img/icons.svg#icon-briefcase"></use>
                        </svg>
                        <p className={Style.basketIcon}>{basket?.length >= 1 && `(${basket?.length})`}</p>
                    </button>
                </nav>
            </header>
            {animation &&
                <div className={showBasket ? Style.basketOpen : Style.basketClose}>
                    {basket?.map(item => (
                        <div key={item._id} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "90%", height: "10rem" }}>
                            <h1 style={{ fontSize: "150%", width: "30%" }}>{item.name}</h1>
                            <h1 style={{ fontSize: "150%" }}>Quantity: {item.quantity}</h1>
                            <button style={{ fontSize: "25px", width: "10%" }} onClick={() => increaseItem(item._id)}>+</button>
                            <button style={{ fontSize: "25px", width: "10%" }} onClick={() => decreaseItem(item._id)}>-</button>
                            <h1 style={{ fontSize: "150%" }}>Price: {item.totalPrice}</h1>
                        </div>
                    ))}
                </div>}
        </>
    )
}
