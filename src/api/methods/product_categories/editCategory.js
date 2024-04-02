import {makeRequest} from "@/api/makeRequest.js";

export const editCategory = async (categoryId,name) => {
    const data = await makeRequest(
        `/admin/category/${categoryId}/edit`,
        'PATCH',
        JSON.stringify({
            name: name,
        })
    )

    return data.json()
}