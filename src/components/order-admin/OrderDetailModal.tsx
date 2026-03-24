'use client';

import { ORDER_STATUS_LABELS, Order } from '@/types/order';

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
  if (!order) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">주문 상세</h2>
            <p className="mt-1 text-sm text-gray-500">주문 ID: {order.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            닫기
          </button>
        </div>

        <div className="space-y-6 px-6 py-5">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">주문 ID</p>
              <p className="mt-1 text-sm text-gray-900">{order.id}</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">회원 ID</p>
              <p className="mt-1 text-sm text-gray-900">{order.userId}</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">주문 상태</p>
              <p className="mt-1 text-sm text-gray-900">{ORDER_STATUS_LABELS[order.status]}</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-medium text-gray-500">총 금액</p>
              <p className="mt-1 text-sm text-gray-900">{order.totalPrice.toLocaleString()}원</p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 sm:col-span-2">
              <p className="text-xs font-medium text-gray-500">주문 일시</p>
              <p className="mt-1 text-sm text-gray-900">{order.ordered_at}</p>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-gray-900">주문 상품</h3>

            {order.orderProducts.length === 0 ? (
              <div className="mt-3 rounded-lg border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500">
                주문 상품 데이터가 없습니다.
              </div>
            ) : (
              <div className="mt-3 overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">orderId</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">productId</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">quantity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {order.orderProducts.map((item, index) => (
                      <tr key={`${item.orderId}-${item.productId}-${index}`}>
                        <td className="px-4 py-3 text-gray-900">{item.orderId}</td>
                        <td className="px-4 py-3 text-gray-900">{item.productId}</td>
                        <td className="px-4 py-3 text-gray-900">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
