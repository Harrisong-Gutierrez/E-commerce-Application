export interface Product {
  image: string | StaticImport;
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
}
