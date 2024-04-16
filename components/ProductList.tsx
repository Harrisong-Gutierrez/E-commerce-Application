import React from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/utils/supabase/types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  function renderproducts() {
    return products.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        onAddToCart={onAddToCart}
      />
    ));
  }

  console.log(products);
  if (!Array.isArray(products) || products.length === 0) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {renderproducts()}
    </div>
  );
};

export default ProductList;
