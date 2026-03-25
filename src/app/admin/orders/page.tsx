'use client';

import React, { useEffect, useState } from 'react';
import AdminOrderTable from '@/components/AdminOrderTable';
import AdminNav from '@/components/AdminNav';
import ErrorMessage from '@/components/order-admin/ErrorMessage';
import { toAppError } from '@/lib/errors/appError';
import { getOrdersPage } from '@/lib/orders/orderApi';
import { OrderDto } from '@/types/order';

const PAGE_SIZE = 10;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await getOrdersPage({
          page: currentPage,
          size: PAGE_SIZE,
        });

        setOrders(result.content ?? []);
        setTotalPages(result.totalPages ?? 0);
      } catch (err) {
        console.error('Order fetch error:', err);
        setError(toAppError(err).message);
      } finally {
        setLoading(false);
      }
    };

    void fetchOrders();
  }, [currentPage]);

  const handleOrderUpdated = (updatedOrder: OrderDto) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <AdminNav />
        </aside>

        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-[#3D2B24] p-4 rounded-lg">
            <div>
              <h1 className="text-xl font-bold text-white">주문 관리 내역</h1>
              <p className="text-sm text-gray-400 mt-1">고객들의 주문 상태를 확인합니다.</p>
            </div>
          </div>

          {loading ? (
            <div className="bg-white rounded-lg p-12 text-center shadow-sm">
              <p className="text-gray-500 font-medium">주문 데이터를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <ErrorMessage message={error} />
          ) : (
            <>
              <AdminOrderTable orders={orders} onOrderUpdated={handleOrderUpdated} />

              {totalPages > 0 && (
                <div className="flex justify-center items-center space-x-4 mt-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition-colors text-gray-700"
                  >
                    이전
                  </button>
                  <span className="text-sm text-white font-medium">
                    {currentPage + 1} / {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                    className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition-colors text-gray-700"
                  >
                    다음
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
