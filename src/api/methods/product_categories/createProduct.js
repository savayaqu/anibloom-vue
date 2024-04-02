import {makeRequest} from "@/api/makeRequest.js";

export const createProduct = async (formData) => {
    const data = await makeRequest(
        `/admin/product/create`,
        'POST',
        formData
    )

    return data.json()
}