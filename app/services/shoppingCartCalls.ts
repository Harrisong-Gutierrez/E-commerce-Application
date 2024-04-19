import axios from 'axios';


export interface ProductData {
    id: string;
    user_id: string;
    // creation_date: string;
}



// export const getShoppingCart = async (productData: ProductData) => {
//     try {
//         const response = await axios.get(`/api/shopping_carts`, productData);
//         return response.data;
//     } catch (error) {
//         console.error('Error adding Shopping Carts:', error);
//         throw error;
//     }
// }




export const addShoppingCart = async (productData: ProductData) => {
    try {
        const response = await axios.post(`/api/shopping_carts`, productData);
        return response.data;
    } catch (error) {
        console.error('Error adding Shopping Carts:', error);
        throw error;
    }
}