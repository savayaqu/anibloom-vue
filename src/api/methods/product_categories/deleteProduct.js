import {makeRequest} from "@/api/makeRequest.js";

export const deleteProduct = async (productId) => {
    const data = await makeRequest(
        `/admin/product/${productId}/delete`,
        'DELETE',
    )

    return data.json()
}