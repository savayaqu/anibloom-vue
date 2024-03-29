import {makeRequest} from "@/api/makeRequest.js";

export const getReviews = async (fileId) => {
    const data = await makeRequest(`/product/${fileId}/review`)

    return data.json()
}