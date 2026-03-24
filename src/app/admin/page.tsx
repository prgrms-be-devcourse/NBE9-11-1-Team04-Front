'use client';

import AdminProductGrid from '@/components/AdminProductGrid';
import AdminSidebar from '@/components/AdminSidebar';
import { AdminProduct } from '@/types/adminProduct';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [adminProducts, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/products');
      if (!res.ok) {
        throw new Error('상품 목록 조회 실패');
      }

      const data: AdminProduct[] = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('상품 목록 불러오기 실패:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('상품 삭제 실패');
      }

      const data = await res.json();
      alert(data.msg);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleCreate = (newProduct: AdminProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  return (
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <AdminProductGrid 
        initialProducts={adminProducts} 
        onDelete={handleDelete}/>

        <aside className="lg:col-span-1 mt-17">
          <AdminSidebar onCreate={handleCreate} />
        </aside>
      </div>
    </main>
  );
}