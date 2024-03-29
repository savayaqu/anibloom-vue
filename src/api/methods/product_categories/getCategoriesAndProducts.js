import {getCategories} from "@/api/methods/product_categories/getCategories.js";
import {getCategoryProducts} from "@/api/methods/product_categories/getCategoryProducts.js";


export const getCategoriesAndProducts = async () => {
    try {
        const categoriesData = await getCategories();
        const categories = categoriesData.data;

        // Для каждой категории получаем первые 3 продукта
        for (const category of categories) {
            const productsData = await getCategoryProducts(category.id);
            const products = productsData.data;

            // Добавляем только первые 3 продукта категории
            category.products = products.slice(0, 3);
            category.items = products;
        }

        return categories;
    } catch (error) {
        throw new Error('Произошла ошибка: ' + error.message);
    }
}
