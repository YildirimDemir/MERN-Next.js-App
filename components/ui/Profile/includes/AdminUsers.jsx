"use client";
import { paginationUsers } from "@/services/apiUsers";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import DataLoader from "../../Loader/DataLoader";
import Style from "../user-detail.module.css";
import UserEdit from "./UserEdit";

export default function AdminUsers() {

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    const { mutate, data: paginationData, } = useMutation({
        mutationFn: paginationUsers,
        onError: (err) => Console.error(err.message),
        onSuccess: (data) => {
            setTotalPages(data.totalPageNumber);
        }
    });

    useEffect(() => {
        mutate({ page });
    }, [page]);

    const nextPage = () => {
        if (page < paginationData?.totalPageNumber) {
            setPage(page => page + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    function handleEdit(data) {
        setSelectedUser(data)
        setIsEdit((edit) => !edit);
    }

    return (
        <>
            {isEdit ?
                <UserEdit setEdit={setIsEdit} selectedUser={selectedUser} />
                :
                <div>
                    <div style={{ display: "flex", alignItems: "center", margin: "2rem" }}>
                        <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ marginRight: "2rem", backgroundColor: "lightgray" }} onClick={prevPage} disabled={page <= 1}>BACK</button>
                        <h1 style={{ marginRight: "2rem" }}>{page}/{totalPages}</h1>
                        <button className={`${Style.btn} ${Style["btn--small"]}`} style={{ marginRight: "2rem", backgroundColor: "lightgray" }} onClick={nextPage} disabled={page >= paginationData?.totalPageNumber}>NEXT</button>
                    </div>
                    {paginationData === undefined ? <DataLoader /> :
                        <div className={`${Style["card-container"]}`}>
                            {paginationData?.users?.map(user => (
                                <div key={user.email} className={Style.card} style={{ display: "flex", margin: "2rem", alignItems: "center", width: "100%" }}>
                                    <Image className={`${Style["form__user-photo"]}`} src={`/img/users/${user.photo}`} alt={`User photo`} priority width={500} height={500} />
                                    <h1 >{user.name}</h1>
                                    <div className={`${Style["form__group"]} ${Style.right}`} style={{ justifyContent: "center", alignItems: "center", margin: "0", padding: "1rem" }}>
                                        <button className={`${Style.btn} ${Style["btn--small"]} ${Style["btn--green"]}`} onClick={() => handleEdit(user)} >Edit</button>
                                    </div>
                                </div>
                            ))}
                        </div>}
                </div>}
        </>
    )
}
