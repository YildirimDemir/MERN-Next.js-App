"use client";
import { addFilteredTour } from "@/global/tourSlice";
import { getFiltered } from "@/services/apiTours";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import Style from "./all-tours.module.css";

export default function Filtered() {

    const dispatch = useDispatch();

    const { mutate, data: filteredData, isLoading } = useMutation({
        mutationFn: getFiltered,
        onSuccess: () => {
            reset();
        },
        onError: (err) => Console.error(err.message),
    });

    const { control, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (filteredData) {
            dispatch(addFilteredTour(filteredData));
        }
    }, [filteredData]);

    async function submitFilter(data) {
        mutate(data);
    }

    return (
        <div className={Style.ani} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "3rem" }}>
            <form onSubmit={handleSubmit(submitFilter)}>
                <label style={{ fontSize: "20px", marginRight: "1rem", color: "white" }} htmlFor="minDuration">Lowest Duration</label>
                <Controller
                    name="minDuration"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <select {...field} style={{ fontSize: "20px", marginRight: "1rem", padding: "2px", border: "1px solid white", borderRadius: "10px", color: "white", backgroundColor: "#3a4453", boxShadow: "box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;" }}>
                            <option value="">---</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </select>
                    )}
                />
                <label style={{ fontSize: "20px", marginRight: "1rem", color: "white" }} htmlFor="maxDuration">Highest Duration</label>
                <Controller
                    name="maxDuration"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <select {...field} style={{ fontSize: "20px", marginRight: "1rem", padding: "2px", border: "1px solid white", borderRadius: "10px", color: "white", backgroundColor: "#3a4453", boxShadow: "box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;" }}>
                            <option value="">---</option>
                            <option value="2">2</option>
                            <option value="4">4</option>
                            <option value="6">6</option>
                            <option value="8">8</option>
                        </select>
                    )}
                />
                <label style={{ fontSize: "20px", marginRight: "1rem", color: "white" }} htmlFor="minPrice">Lowest Price</label>
                <Controller
                    name="minPrice"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <select {...field} style={{ fontSize: "20px", marginRight: "1rem", padding: "2px", border: "1px solid white", borderRadius: "10px", color: "white", backgroundColor: "#3a4453", boxShadow: "box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;" }}>
                            <option value="">---</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                        </select>
                    )}
                />
                <label style={{ fontSize: "20px", marginRight: "1rem", color: "white" }} htmlFor="maxPrice">Highest Price</label>
                <Controller
                    name="maxPrice"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <select {...field} style={{ fontSize: "20px", marginRight: "1rem", padding: "2px", border: "1px solid white", borderRadius: "10px", color: "white", backgroundColor: "#3a4453", boxShadow: "box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;" }}>
                            <option value="">---</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                            <option value="1500">1500</option>
                            <option value="2000">2000</option>
                        </select>
                    )}
                />
                <button className={`${Style.btn} ${Style["btn--green"]}`}>Submit</button>
            </form>
            {/* <button className={`${Style.btn} ${Style["btn--green"]}`} onClick={() => reset()}>Reset</button> */}
        </div>
    )
}
