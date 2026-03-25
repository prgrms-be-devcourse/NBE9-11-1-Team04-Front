'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminProduct } from '@/types/adminProduct';

export default function AdminProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [product, setProduct] = useState<AdminProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/products/${id}`);

      if (!res.ok) {
        throw new Error('상품 단건 조회 실패');
      }

      const data: AdminProduct = await res.json();
      setProduct(data);
    } catch (error) {
      console.error('상품 조회 중 오류 발생:', error);
      alert('상품 정보를 불러오지 못했습니다.');
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!product) return;

    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]:
        name === 'price' || name === 'stock'
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;

    setSubmitting(true);

    try {
      const res = await fetch(`http://localhost:8080/api/v1/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock,
          description: product.description,
          imageUrl: product.imageUrl,
        }),
      });

      if (!res.ok) {
        throw new Error('상품 수정 실패');
      }

      const data = await res.json();
      alert(data.msg ?? '수정이 완료되었습니다.');
      router.push('/admin');
    } catch (error) {
      console.error('상품 수정 중 오류 발생:', error);
      alert('상품 수정에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center items-center">
        <div className="text-white text-lg">로딩중...</div>
      </main>
    );
  }

  if (!product) return null;

  return (
    <main className="min-h-screen bg-[#2D1B14] p-6 md:p-12 flex justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl p-5 shadow-sm">
        <div className="bg-gray-200 aspect-square rounded-md mb-4 flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            상품명
          </label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="상품명"
            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            가격
          </label>
          <input
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            placeholder="가격"
            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            카테고리
          </label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none bg-white"
          >
            <option value="NUTTY">고소한맛맛</option>
            <option value="FRUITY">산미</option>
            <option value="DECAF">디카페인</option>
          </select>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            상품 설명
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="상품 설명"
            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none min-h-[120px] resize-none"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            재고
          </label>
          <input
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
            placeholder="재고"
            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
          />
          <label className="block text-sm font-medium text-gray-700 mb-1">
            이미지 URL
          </label>
          <input
            name="imageUrl"
            value={product.imageUrl ?? ''}
            onChange={handleChange}
            placeholder="이미지 URL"
            className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none"
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/admin')}
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-md font-semibold"
            >
              취소
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[#2D2D2D] text-white py-3 rounded-md font-semibold disabled:opacity-60"
            >
              {submitting ? '수정 중...' : '수정 완료'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}