import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/';

const api = axios.create({ baseURL: BASE_URL });

const useApi = () => {
  const getProducts = async (limit) => {
    return api.get('products', { params: { limit } });
  };

  const searchProducts = async (q) => {
    return api.get('products/search', { params: { q } });
  };

  const getProductDetails = async (id) => {
    return api.get(`products/${id}`);
  };

  return { getProducts, searchProducts, getProductDetails };
};

export default useApi;
