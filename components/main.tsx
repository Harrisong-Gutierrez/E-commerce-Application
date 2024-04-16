"use client";

import { Product } from "@/utils/supabase/types";
import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";
import { getProducts } from "@/app/services/productCalls";

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
    setCart([...cart, product]);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">E-Commerce App</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ProductList products={products} onAddToCart={addToCart} />
        </div>
        <div className="md:col-span-1">
          <ShoppingCart cart={cart} />
        </div>
      </div>
    </div>
  );
};

export default Main;
