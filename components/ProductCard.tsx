import { Product } from "@/utils/supabase/types";
import Image from "next/image";
import React from "react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleClick = () => {
    onAddToCart(product);
    console.log(product.available);
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <figure>
        <Image
          className="rounded-t-lg"
          src={product.image}
          alt=""
          width={300}
          height={500}
        />
      </figure>
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="mb-2">{product.description}</p>
      <p className="text-gray-700 mb-2">${product.price}</p>
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
