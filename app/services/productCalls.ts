import axios from 'axios';



export const getProducts = async () => {
    try {
        const response = await axios.get(`/api/products`);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const addProduct = async (productData: any) => {
    try {
        const response = await axios.post(`/api/products`, productData);
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

export const updateProduct = async (productData: any) => {
    try {
        const response = await axios.put(`/api/products`, productData);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (productId: any) => {
    try {
        const response = await axios.delete(`/api/products`, { data: { id: productId } });
        return response.data;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
