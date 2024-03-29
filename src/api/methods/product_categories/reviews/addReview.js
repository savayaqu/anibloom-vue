import {makeRequest} from "@/api/makeRequest.js";

export const addReview = async (productId, rating, textReview) => {
    const data = await  makeRequest(
        `/product/${productId}/review`,
        'POST',
        JSON.stringify({
            rating,
            textReview
        })
    )

    return data.json()
}