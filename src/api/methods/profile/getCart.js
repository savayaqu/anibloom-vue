import { makeRequest } from "@/api/makeRequest.js";

export const getCart = async () => {
    const response = await makeRequest('/cart');
    return response.json();
}
