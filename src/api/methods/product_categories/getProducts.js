import { makeRequest } from "@/api/makeRequest.js";

export const getProducts = async () => {
    const response = await makeRequest('/products');
    return response.json();
}
