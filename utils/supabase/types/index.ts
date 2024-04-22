import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Product {
  image: string | StaticImport;
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
}


export interface Order {
  id: string;
  products: Product[];
  shippingAddress: string;
  paymentMethod: string;
  status: string;
}
