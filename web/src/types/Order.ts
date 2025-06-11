export interface Order {
  _id: string;
  table: string;
  status: StatusType;
  products: OrderProduct[];
}

export type StatusType = 'WAITING' | 'IN_PRODUCTION' | 'DONE';
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
