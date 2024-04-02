import {makeRequest} from "@/api/makeRequest.js";

export const editProduct = async (productId, formData) => {
    const data = await makeRequest(
        `/admin/product/${productId}/edit`,
        'POST',
        formData
    )

    return data.json()
}