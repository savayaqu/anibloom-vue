import {makeRequest} from "@/api/makeRequest.js";

export const deleteCategory = async (categoryId) => {
    const data = await makeRequest(
        `/admin/category/${categoryId}/delete`,
        'DELETE',
    )

    return data.json()
}