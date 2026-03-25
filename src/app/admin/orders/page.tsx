'use client';

import React, { useEffect, useState } from 'react';
import AdminOrderTable from '@/components/AdminOrderTable';
import AdminNav from '@/components/AdminNav';
import { OrderDto, PageResponseDto, RsData } from '@/types/order';

export default function AdminOrdersPage() {
  //상태(State) 관리: 실제 데이터, 로딩 상태, 에러 상태를 각각 관리
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 (0부터 시작)
  const [totalPages, setTotalPages] = useState(0);   // 전체 페이지 수

  // 백엔드 API 호출 함수
  const fetchOrders = async () => {
    try {
      //백엔드 주문 목록 조회 API 엔드포인트, URL에 파라미터 추가 & 전체 페이지 수 저장
      const res = await fetch(`http://localhost:8080/api/v1/admin/orders?page=${currentPage}&size=10`);
      
      if (!res.ok) {
        throw new Error('주문 목록을 불러오는데 실패했습니다.');
      }

      // RsData -> PageResponseDto -> OrderDto 계층 구조를 타입으로 명시
      const result: RsData<PageResponseDto<OrderDto>> = await res.json();
      
      // 페이징 DTO 안의 'content' 배열추출출
      setOrders(result.data.content);
      // 전체 페이지 수도 상태에 저장
      setTotalPages(result.data.totalPages); 
      
    } catch (err) {
      console.error('API Fetch 에러:', err);
      setError('주문 데이터를 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  //currentPage가 바뀔 때마다 재실행
  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* 좌측 네비게이션 */}
        <aside className="lg:col-span-1">
          <AdminNav />
        </aside>

        {/* 우측 메인 콘텐츠 */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between bg-[#3D2B24] p-4 rounded-lg">
            <div>
              <h1 className="text-xl font-bold text-white">주문 관리 내역</h1>
              <p className="text-sm text-gray-400 mt-1">고객들의 주문 상태를 확인합니다.</p>
            </div>
          </div>

          {/* 상태에 따른 조건부 렌더링 (로딩 중 / 에러 발생 / 성공) */}
          {loading ? (
            <div className="bg-white rounded-lg p-12 text-center shadow-sm">
              <p className="text-gray-500 font-medium">주문 데이터를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg p-12 text-center shadow-sm">
              <p className="text-red-500 font-medium">{error}</p>
            </div>
          ) : (
            <>
              {/* 테이블 컴포넌트 */}
              <AdminOrderTable orders={orders} />

              {/* 💡 5. 페이징 컨트롤 UI (테이블 하단) */}
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