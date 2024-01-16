export async function getUsers() {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/users`);

        const users = await res.json();

        if (!res.ok) {
            throw new Error(users.message || "Failed to get users");
        }

        return users;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function deleteUser(data) {

    const { id } = data;

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/users/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to delete a user");
        }

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}

export async function getReviews() {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/reviews`);

        const reviews = await res.json();

        if (!res.ok) {
            throw new Error(reviews.message || "Failed to get reviews");
        }

        return reviews;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function getBookings() {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/bookings`);

        const bookings = await res.json();

        if (!res.ok) {
            throw new Error(bookings.message || "Failed to get bookings");
        }

        return bookings;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};