import { makeRequest } from "@/api/makeRequest.js";

export const getCategoryProducts = async (categoryId) => {
    const response = await makeRequest(`/category/${categoryId}`);
    return response.json();
}
