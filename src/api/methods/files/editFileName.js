import {makeRequest} from "@/api/makeRequest.js";

export const editFileName = async fileId => {
    const data = await makeRequest(
        `/files/${fileId}`,
        'PATCH',
        JSON.stringify({name})
    )

    return data.json()
}