import { create } from "zustand";
import api from "../../api";

const useProductStore = create((set) => ({
  products: [],
  product: null,
  loading: false,
  error: null,

  // GET ALL PRODUCTS
  getProducts: async () => {
    set({ loading: true, error: null });

    try {
      const res = await api.get("/products");
      set({
        products: res.data.data,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // GET PRODUCT BY ID
  getProductById: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await api.get(`/products/${id}`);

      set({
        product: res.data.data,
        loading: false,
      });

      return res.data.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  // CREATE PRODUCT
  createProduct: async (productData) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/products", productData);

      set((state) => ({
        products: [...state.products, res.data.data],
        loading: false,
      }));

      return res.data.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      throw error;
    }
  },

  // UPDATE PRODUCT
  updateProduct: async (id, productData) => {
    set({ loading: true, error: null });

    try {
      const res = await api.put(`/products/${id}`, productData);

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? res.data.data : product,
        ),
        product:
          state.product?._id === id ? res.data.data : state.product,
        loading: false,
      }));

      return res.data.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      throw error;
    }
  },

  // DELETE PRODUCT
  deleteProduct: async (id) => {
    set({ loading: true, error: null });

    try {
      await api.delete(`/products/${id}`);

      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
        product: state.product?._id === id ? null : state.product,
        loading: false,
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
      throw error;
    }
  },

  // CLEAR SELECTED PRODUCT
  clearProduct: () => set({ product: null }),

  // CLEAR ERROR
  clearError: () => set({ error: null }),
}));

export default useProductStore;
