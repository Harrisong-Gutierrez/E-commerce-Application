import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/utils/supabase/types";

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [noProductsAvailable, setNoProductsAvailable] = useState(false);

  useEffect(() => {
    setFilteredProducts(products);
    setNoProductsAvailable(products.length === 0);
  }, [products]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
    setNoProductsAvailable(filtered.length === 0);
  };

  function renderProducts() {
    return filteredProducts.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        onAddToCart={onAddToCart}
      />
    ));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearch}
        className="appearance-none border border-gray-300 rounded-md py-2 px-4 mb-4 w-full text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
      />
      {noProductsAvailable && <div>No hay productos disponibles.</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {renderProducts()}
      </div>
    </div>
  );
};

export default ProductList;
