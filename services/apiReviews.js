export async function getMyReviews(id) {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/users/${id}/get-my-reviews`);

        const myReviews = await res.json();

        if (!res.ok) {
            throw new Error(myReviews.message || "Failed to get likes");
        }

        return myReviews;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function createReview(newReview) {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/reviews`, {
            method: "POST",
            body: JSON.stringify(newReview),
            headers: {
                "Content-type": "application/json",
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to create a review");
        }

        return data;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}

export async function paginationReviews(data) {

    try {
        const { page } = data;

        const res = await fetch(`${process.env.LOCAL_HOST}/api/reviews/pagination?page=${page}`);

        const reviews = await res.json();

        if (!res.ok) {
            throw new Error(reviews.message || "Failed to get page reviews");
        }

        return reviews;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}