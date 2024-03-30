import {makeRequest} from "@/api/makeRequest.js";

export const deleteCartItem = async (productId) => {
    const data = await  makeRequest(
        `/cart/product/${productId}`,
        'DELETE'
    )

    return data.json()
}