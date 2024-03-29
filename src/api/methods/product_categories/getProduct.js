import {makeRequest} from "@/api/makeRequest.js";

export const getProduct = async (productId) => {
    const data = await makeRequest(`/product/${productId}`)

    return data.json()
}