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

  // 필터링 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchUserId, setSearchUserId] = useState('');

  // 백엔드 API 호출 함수
  const fetchOrders = async () => {
    try {
      let url = `${process.env.NEXT_PUBLIC_BASEURL}/admin/orders?page=${currentPage}&size=10`;

      if (searchUserId) {
        // 유저 별 조회
        url = `${process.env.NEXT_PUBLIC_BASEURL}/admin/orders/user/${searchUserId}?page=${currentPage}&size=10`;
      } else if (startDate && endDate) {
        // 기간 별 조회
        url = `${process.env.NEXT_PUBLIC_BASEURL}/admin/orders/period?startDate=${startDate}&endDate=${endDate}&page=${currentPage}&size=10`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('주문 목록을 불러오는데 실패했습니다.');
      }

      const result: RsData<PageResponseDto<OrderDto>> = await res.json();

      setOrders(result.data.content);
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

  // 검색 버튼 클릭 핸들러 (유효성 검사 및 방어 로직)
  const handleSearch = () => {
    if (searchUserId && (startDate || endDate)) {
      alert('유저 별 조회와 기간 별 조회를 동시에 할 수는 없습니다. 하나의 조건만 입력해 주세요.');
      return;
    }
    if ((startDate && !endDate) || (!startDate && endDate)) {
      alert('검색할 시작일과 종료일을 모두 선택해 주세요.');
      return;
    }
    if (startDate && endDate && startDate > endDate) {
      alert('시작일은 종료일보다 이전이어야 합니다.');
      return;
    }

    if (currentPage === 0) fetchOrders();
    else setCurrentPage(0);
  };

  // 필터 초기화 핸들러
  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSearchUserId('');
    setCurrentPage(0);
    setTimeout(() => {
      fetchOrders();
    }, 0);
  };

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
          <div className="bg-[#3D2B24] p-5 rounded-lg flex flex-col gap-4">
            {/* 상단: 타이틀 영역 */}
            <div>
              <h1 className="text-xl font-bold text-white">주문 관리 내역</h1>
              <p className="text-sm text-gray-400 mt-1">고객들의 주문 상태를 확인하고 필터링합니다.</p>
            </div>

            {/* 하단: 필터 입력 영역 */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#4A362D]">
              
              {/*유저 ID 검색 */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-300">유저 ID</span>
                <input
                  type="number"
                  placeholder="예: 101"
                  value={searchUserId}
                  onChange={(e) => setSearchUserId(e.target.value)}
                  className="bg-white px-3 py-1.5 rounded-md text-sm outline-none text-gray-900 w-24"
                />
              </div>

              {/* 데스크탑에서만 보이는 세로 구분선 */}
              <div className="hidden sm:block w-px h-5 bg-[#4A362D]"></div>

              {/* 기간 검색 */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-300">조회 기간</span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white px-2 py-1.5 rounded-md text-sm outline-none text-gray-900"
                />
                <span className="text-gray-400">~</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white px-2 py-1.5 rounded-md text-sm outline-none text-gray-900"
                />
              </div>

              <div className="flex items-center gap-2 sm:ml-auto w-full sm:w-auto justify-end">
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white transition-colors underline underline-offset-2"
                >
                  초기화
                </button>
                <button
                  onClick={handleSearch}
                  className="px-5 py-1.5 bg-white text-[#2D1B14] text-sm font-bold rounded-md hover:bg-gray-200 transition-colors shadow-sm"
                >
                  조회
                </button>
              </div>
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

              {/* 페이징 컨트롤 UI (테이블 하단) */}
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