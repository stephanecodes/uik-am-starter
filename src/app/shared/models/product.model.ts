export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  warranty: string;
  category: string;
  tags: string[];
  warning: string;
  offer: string | null;
  discount: string | null;
  price: number;
  currency: string;
  image: string;
  specifications: ProductSpecification[];
}

export interface ProductSpecification {
  label: string;
  value: string;
}

