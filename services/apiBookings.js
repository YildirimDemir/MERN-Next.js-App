export async function getMyBookings(id) {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/users/${id}/get-my-bookings`);

        const myBookings = await res.json();

        if (!res.ok) {
            throw new Error(myBookings.message || "Failed to get bookings");
        }

        return myBookings;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function createCheckoutStripe(tour) {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/bookings/checkout-session`, {
            method: "POST",
            body: JSON.stringify(tour),
            headers: {
                "Content-type": "application/json",
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to create a checkout stripe");
        }

        window.location.assign(data);
        return data;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}