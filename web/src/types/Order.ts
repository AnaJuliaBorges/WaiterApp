export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE'; // Adapte conforme os status possíveis
  products: OrderProduct[];
}

interface Product {
  name: string;
  imagePath: string;
  price: number;
}

interface OrderProduct {
  _id: string;
  product: Product;
  quantity: number;
}
