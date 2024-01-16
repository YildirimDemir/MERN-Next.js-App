export async function getLikes() {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/likes`);

        const Likes = await res.json();

        if (!res.ok) {
            throw new Error(Likes.message || "Failed to get all likes.");
        }

        return Likes;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function getMyLikes(id) {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/users/${id}/get-my-likes`);

        const myLikes = await res.json();

        // if (!res.ok) {
        //     console.error(myLikes.message || "Failed to get my likes.");
        // }

        return myLikes;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function createLike(newLike) {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/likes`, {
            method: "POST",
            body: JSON.stringify(newLike),
            headers: {
                "Content-type": "application/json",
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to create a like");
        }

        return data;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}

export async function deleteLike(data) {

    const { tourId, userId } = data;

    const likes = await getLikes();

    const currentTourLikes = likes.filter(item => item.tour._id === tourId);

    const currentUserLike = currentTourLikes.filter(item => item.user._id === userId);

    const getTour = currentUserLike[0].tour;

    const likeId = currentUserLike[0]._id;

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/likes/${likeId}`, {
            method: "DELETE",
            body: JSON.stringify({ getTour })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to delete a like");
        }

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}