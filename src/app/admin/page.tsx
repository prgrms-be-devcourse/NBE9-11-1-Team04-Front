'use client';

import AdminProductGrid from '@/components/AdminProductGrid';
import AdminSidebar from '@/components/AdminSidebar';
import { AdminProduct } from '@/types/AdminProduct';
import { useState } from 'react';

export default function AdminPage() {
  const [adminProducts, setProducts] = useState<AdminProduct[]>([
    { id: 1, name: '아메리카노', price: 4500, description: '진한 에스프레소', category: 'COFFEE', stock: 10 },
    { id: 2, name: '카페라떼', price: 5000, description: '부드러운 우유', category: 'COFFEE', stock: 9 },
    { id: 3, name: '얼그레이', price: 5500, description: '향긋한 홍차', category: 'TEA', stock: 19 },
    { id: 4, name: '치즈케이크', price: 7000, description: '꾸덕한 치즈', category: 'DESSERT', stock: 20 },
    { id: 5, name: '녹차', price: 5500, description: '깔끔한 맛', category: 'TEA', stock: 9 },
    { id: 6, name: '초코쿠키', price: 3000, description: '달콤한 쿠키', category: 'DESSERT', stock: 7 },
  ]);

  const handleCreate = (newProduct: AdminProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
        <AdminProductGrid initialProducts={adminProducts} />

        <aside className="lg:col-span-1">
          <AdminSidebar onCreate={handleCreate} />
        </aside>
      </div>
    </main>
  );
}