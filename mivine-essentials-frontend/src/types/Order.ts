export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  color?: string;
  quantity: number;
}

export interface Order {
  _id: string;
  user: string;
  orderItems?: OrderItem[];   //always optional to prevent errors
  checkoutItems?: OrderItem[]; //in case older docs still have this
  shippingAddress?: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
}