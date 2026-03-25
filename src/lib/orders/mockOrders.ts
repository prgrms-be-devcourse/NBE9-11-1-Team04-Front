import { Order } from '@/types/order';

export const mockOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    email: 'admin-test@example.com',
    address: '서울시 마포구 테스트로 101',
    totalPrice: 10000,
    orderedAt: '2026-03-23T14:38:39.106859',
    status: 'PENDING',
    orderProducts: [
      {
        productId: 101,
        productName: '테스트 원두',
        quantity: 2,
      },
      {
        productId: 102,
        productName: '시그니처 머그',
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    email: 'coffee-user@example.com',
    address: '서울시 강남구 샘플로 22',
    totalPrice: 18500,
    orderedAt: '2026-03-24T09:15:10.000000',
    status: 'SHIPPED',
    orderProducts: [
      {
        productId: 201,
        productName: '테스트 드립백',
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    userId: 3,
    email: 'bean-lover@example.com',
    address: '서울시 성동구 예제로 77',
    totalPrice: 22000,
    orderedAt: '2026-03-24T11:42:55.000000',
    status: 'DELIVERED',
    orderProducts: [
      {
        productId: 301,
        productName: '콜드브루 보틀',
        quantity: 2,
      },
      {
        productId: 302,
        productName: '테스트 텀블러',
        quantity: 3,
      },
    ],
  },
  {
    id: 4,
    userId: 4,
    email: 'cancel-test@example.com',
    address: '서울시 서초구 데모로 15',
    totalPrice: 10000,
    orderedAt: '2026-03-24T13:20:00.000000',
    status: 'CANCELLED',
    orderProducts: [],
  },
];
