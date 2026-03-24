'use client';

import React from 'react';
import { OrderDto } from '@/types/order';

interface AdminOrderTableProps {
  orders: OrderDto[];
}

export default function AdminOrderTable({ orders }: AdminOrderTableProps) {
  return (
    // 기존 ProductCard와 동일한 화이트 카드 스타일
    <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100">
              <th className="pb-4 font-semibold text-gray-900 text-sm">주문 번호</th>
              <th className="pb-4 font-semibold text-gray-900 text-sm">유저 ID</th>
              <th className="pb-4 font-semibold text-gray-900 text-sm">결제 금액</th>
              <th className="pb-4 font-semibold text-gray-900 text-sm">주문 일시</th>
              <th className="pb-4 font-semibold text-gray-900 text-sm">상태</th>
              <th className="pb-4 font-semibold text-gray-900 text-sm">관리</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  주문 내역이 없습니다.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-medium text-gray-900">#{order.id}</td>
                  <td className="py-4 text-gray-600">{order.userId}</td>
                  <td className="py-4 font-bold text-gray-900">{order.totalPrice.toLocaleString()}원</td>
                  <td className="py-4 text-gray-500 text-xs">
                    {new Date(order.ordered_at).toLocaleString('ko-KR', {
                      year: 'numeric', month: '2-digit', day: '2-digit',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'SHIPPED' ? 'bg-[#2D1B14] text-white' : // 카페 테마 강조색
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors underline underline-offset-2">
                      상세보기
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}