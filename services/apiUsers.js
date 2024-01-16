import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

export async function userSignup(newUser) {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/auth/signup`, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json",
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to create a user");
        }

        return data;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function userLogin(data) {

    const { email, password } = data;

    const result = await signIn("credentials", {
        redirect: false,
        email,
        password
    });

    if (result.error) throw new Error("Email or password wrong...");

};

export async function userLogout() {
    await signOut();
};

export async function requestUser(email) {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/auth/requestuser/${email}`);

        const user = await res.json();

        if (!res.ok) {
            throw new Error(user.message || "Not found user!");
        }

        return user;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function updateUserData(newData) {

    try {
        const { id, name, email, photo } = newData;
        const formData = new FormData();

        Array.from(photo).forEach((file) => {
            formData.append(`files`, file);
        });

        formData.append(`name`, name);
        formData.append(`email`, email);

        const res = await fetch(`${process.env.LOCAL_HOST}/api/users/${id}/update-data`, {
            method: 'PATCH',
            body: formData
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to update a user");
        }

        return data;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}

export async function updateUserPassword(newData) {

    try {
        const { id, passwordCurrent, newPassword, passwordConfirm } = newData;

        const res = await fetch(`${process.env.LOCAL_HOST}/api/users/${id}/update-password`, {
            method: "PATCH",
            body: JSON.stringify({ passwordCurrent, newPassword, passwordConfirm }),
            headers: {
                "Content-type": "application/json",
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to update a user");
        }

        return data;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}

export async function addMyBasket(data) {

    const { basket, user } = data;

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/users/${user.id}/add-my-basket`, {
            method: "PATCH",
            body: JSON.stringify({ basket }),
            headers: {
                "Content-type": "application/json",
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to add a basket");
        }

        return data;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }
}

export async function paginationUsers(data) {

    try {
        const { page } = data;

        const res = await fetch(`${process.env.LOCAL_HOST}/api/users/pagination?page=${page}`);

        const pageUsers = await res.json();

        if (!res.ok) {
            throw new Error(pageUsers.message || "Failed to get page users");
        }

        return pageUsers;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}

export async function forgetResetPassword(data) {

    const { email } = data;

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/auth/forget-password`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-type": "application/json",
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to send a email");
        }

        return data;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}

export async function ResetTokenPassword(data) {

    const { token, password, passwordConfirm } = data;

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/auth/reset-password`, {
            method: "PATCH",
            body: JSON.stringify({ token, password, passwordConfirm }),
            headers: {
                "Content-type": "application/json",
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to send a token");
        }

        return data;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}