import {makeRequest} from "@/api/makeRequest.js";

export const updateCart = async (productId, newQuantity) => {
    const data = await makeRequest(
        `/cart`,
        'PATCH',
        JSON.stringify({
            product_id: productId,
            quantity: newQuantity
        })
    )

    return data.json()
}