import {makeRequest} from "@/api/makeRequest.js";

export const addToCart = async (productId) => {
    const data = await makeRequest(
        `/product/${productId}`,
        'POST',
        JSON.stringify({
            product_id: productId,
        })
    )

    return data.json()
}