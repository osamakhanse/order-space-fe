export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}



export interface Order {
  id: number;
  orderNumber: string,
  date: Date;
  items: OrderItem[];
  total: number;
  status: string;
  shippingAddress: Address;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  total: number
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}


export const ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: '12345',
    date: new Date('2022-03-01'),
    items: [
      { product: { id: 1, name: 'Product 1', price: 100, description: '', imageUrl: 'assets/images/product1.jpg' }, quantity: 2, total: 100 },
      { product: { id: 3, name: 'Product 3', price: 50, description: '',  imageUrl: 'assets/images/product3.jpg' }, quantity: 1, total: 100 }
    ],
    total: 250,
    status: 'Pending',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA'
    }
  },
  {
    id: 2,
    orderNumber: '12345',
    date: new Date('2022-02-15'),
    items: [
      { product: { id: 2, name: 'Product 2', price: 75, description: '',  imageUrl: 'assets/images/product2.jpg' }, quantity: 3, total: 100 }
    ],
    total: 225,
    status: 'Shipped',
    shippingAddress: {
      street: '456 Maple Ave',
      city: 'San Francisco',
      state: 'CA',
      zip: '94110',
      country: 'USA'
    }
  },
  {
    id: 3,
    orderNumber: '12345',
    date: new Date('2022-01-10'),
    items: [
      { product: { id: 4, name: 'Product 4', price: 120, description: '',  imageUrl: 'assets/images/product4.jpg' }, quantity: 1, total: 100 },
      { product: { id: 5, name: 'Product 5', price: 85, description: '',  imageUrl: 'assets/images/product5.jpg' }, quantity: 2, total: 100 }
    ],
    total: 290,
    status: 'Delivered',
    shippingAddress: {
      street: '789 Oak St',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90012',
      country: 'USA'
    }
  }
];
