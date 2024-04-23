"use client";

import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";
import CheckoutProcess from "./CheckoutProcess";
import { getProducts } from "@/app/services/productCalls";
import { Order, Product } from "@/utils/supabase/types";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@/utils/supabase/client";
import { addShoppingCart } from "@/app/services/shoppingCartCalls";
import { v4 as uuidv4 } from "uuid";
import { addPurchaseHistory } from "@/app/services/purchaseHistoryCalls";

const Main: React.FC = () => {
  const supabase = createClient();

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [hasAddedToCart, setHasAddedToCart] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id as string;
  };

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

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const hasAddedToCartStorage = localStorage.getItem("hasAddedToCart");
    if (hasAddedToCartStorage) {
      setHasAddedToCart(true);
    }
  }, []);

  const addToCart = async (product: Product) => {
    if (!hasAddedToCart) {
      const randomId: string = uuidv4();
      const userId = await getUser();

      if (userId) {
        addShoppingCart({ id: randomId, user_id: userId });
        setHasAddedToCart(true);
        localStorage.setItem("hasAddedToCart", "true");
      }
    }
    const userId = await getUser();

    const purchaseData = {
      id: "5da61fb2-8caa-4163-8e5d-4873a5b4db11",
      user_id: "5ef30832-4d1d-4f0d-9e4f-f479ff950372",
      product_id: "cfe12180-4cf7-478d-b6e2-fd9e0e3f663b",
      purchase_date: "70294d63-be7f-47de-902c-c1a612c363cf",
    };

    if (userId) {
      try {
        const result = await addPurchaseHistory(purchaseData);
        console.log("Purchase history added successfully:", result);
      } catch (error) {
        console.error("Failed to add purchase history:", error);
      }
    }

    const isProductInCart = cart.some((item) => item.id === product.id);

    if (!isProductInCart) {
      setCart([...cart, product]);
      toast.success("the product was added to the shopping cart!", {
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
    } else {
      toast.warn("The product is already in the cart!", {
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

    localStorage.setItem("cart", JSON.stringify([...cart, product]));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const openCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  function handleOrderComplete(order: Order): void {
    console.log("Pedido completado:", order);
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-4">E-Commerce App</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <ProductList products={products} onAddToCart={addToCart} />
        </div>
        <div className="md:col-span-1">
          {isCheckoutOpen ? (
            <CheckoutProcess cart={cart} onClose={closeCheckout} />
          ) : (
            <ShoppingCart
              cart={cart}
              onRemoveFromCart={removeFromCart}
              onCheckout={openCheckout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
