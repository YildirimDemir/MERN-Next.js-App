"use client";
import { addSearchedTour } from "@/global/tourSlice";
import { getTours } from "@/services/apiTours";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import Style from "./navbar.module.css";

export default function SearchBar() {

    const dispatch = useDispatch();

    const { isLoading, data: toursData, error } = useQuery({
        queryKey: ["searchedInitialData"],
        queryFn: getTours
    });

    if (error) throw new Error(error.message);

    let data = {};
    toursData?.forEach(element => {
        data[element.name] = element;
    });

    async function handleSearchChange(e) {

        const searchedValue = e.target.value;
        const filteredKeys = Object.keys(data).filter(function (key) {
            return key.toLowerCase().includes(searchedValue.toLowerCase());
        });

        let newTours = [];
        filteredKeys.forEach((element) => {
            newTours.push(data[element]);
        });

        dispatch(addSearchedTour(newTours));
    }

    return (
        <div className={`${Style["nav__search"]}`}>
            <div className={`${Style["nav__search-btn"]}`}>
                <svg>
                    <use xlinkHref="/img/icons.svg#icon-search"></use>
                </svg>
            </div>
            <input className={`${Style["nav__search-input"]}`}
                type="text"
                placeholder="Search tours"
                name="searchInput"
                id="searchInput"
                onChange={handleSearchChange}
            />
        </div>
    )
}
