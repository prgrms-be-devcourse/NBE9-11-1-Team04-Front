'use client';

import React from 'react';
import AdminOrderTable from '@/components/AdminOrderTable';
import { OrderDto } from '@/types/order';
import Link from 'next/link';
import AdminNav from '@/components/AdminNav';


export default function AdminOrdersPage() {
  return (
    // 기존 admin/page.tsx와 동일한 다크 브라운 톤 배경 및 레이아웃
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center gap-8">
      <AdminNav />
      <div className="max-w-7xl w-full space-y-8">

      
        {/* 상단 헤더 및 네비게이션 영역 */}
        <div className="flex items-center justify-between bg-[#3D2B24] p-4 rounded-lg">
          <div>
            <h1 className="text-xl font-bold text-white">주문 관리 내역</h1>
            <p className="text-sm text-gray-400 mt-1">고객들의 주문 상태를 확인합니다.</p>
          </div>
          <Link 
            href="/admin" 
            className="px-4 py-2 bg-white text-[#2D1B14] text-sm font-medium rounded-md hover:bg-gray-100 transition-colors"
          >
            상품 관리로 돌아가기
          </Link>
        </div>

        {/* 주문 테이블 컴포넌트 */}
        <AdminOrderTable orders={[]} />

      </div>
      
    </main>
  );
}