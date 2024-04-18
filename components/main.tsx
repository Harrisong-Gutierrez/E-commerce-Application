"use client";

import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";
import { getProducts } from "@/app/services/productCalls";
import { Product } from "@/utils/supabase/types";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Main: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);
    if (!isProductInCart) {
      setCart([...cart, product]);
    } else {
      toast.warn("The product is already in the cart.!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">E-Commerce App</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ProductList products={products} onAddToCart={addToCart} />
        </div>
        <div className="md:col-span-1">
          <ShoppingCart cart={cart} onRemoveFromCart={removeFromCart} />
        </div>
      </div>
    </div>
  );
};

export default Main;
