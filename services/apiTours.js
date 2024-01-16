export async function getTours() {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/tours`);

        const tours = await res.json();

        if (!res.ok) {
            throw new Error(tours.message || "Failed to get tours");
        }

        return tours;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function getTour(slug) {

    try {
        const res = await fetch(`${process.env.LOCAL_HOST}/api/tours/${slug}`);

        const tour = await res.json();

        if (!res.ok) {
            throw new Error(tour.message || "Failed to get tour by slug");
        }

        return tour;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

};

export async function getFiltered(filteredData) {

    try {
        const { maxDuration, minDuration, maxPrice, minPrice } = filteredData;

        const res = await fetch(`${process.env.LOCAL_HOST}/api/tours/filter?minDuration=${minDuration}&maxDuration=${maxDuration}&maxPrice=${maxPrice}&minPrice=${minPrice}`);

        const filteredTours = await res.json();

        if (!res.ok) {
            throw new Error(filteredTours.message || "Failed to get filtered tours");
        }

        return filteredTours;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}

export async function paginationTours(data) {

    try {
        const { page } = data;

        const res = await fetch(`${process.env.LOCAL_HOST}/api/tours/pagination?page=${page}`);

        const pageTours = await res.json();

        if (!res.ok) {
            throw new Error(pageTours.message || "Failed to get page tours");
        }

        return pageTours;

    } catch (error) {
        // console.error(error.message);
        throw error;
    }

}