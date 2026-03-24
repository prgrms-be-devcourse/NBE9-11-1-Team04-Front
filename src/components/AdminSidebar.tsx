'use client';

import { AdminProduct } from '@/types/adminProduct';
import { useState } from 'react';

export default function AdminSidebar({
  onCreate,
}: {
  onCreate: (newProduct: AdminProduct) => void;
}) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'COFFEE',
    description: '',
    stock: '',
    imageUrl: '',
  });

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          category: form.category,
          description: form.description,
          stock: Number(form.stock),
          imageUrl: form.imageUrl,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.msg ?? '등록 실패');
        return;
      }

      onCreate(result.data);
      alert('등록 완료');

      setForm({
        name: '',
        price: '',
        category: 'COFFEE',
        description: '',
        stock: '',
        imageUrl: '',
      });
    } catch (error) {
      console.error(error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm sticky top-8">
      <div className="bg-gray-200 aspect-square rounded-md mb-4 flex items-center justify-center overflow-hidden">
        {form.imageUrl ? (
          <img
            src={form.imageUrl}
            alt="미리보기"
            className="w-full h-full object-cover"
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

      <div className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={updateField}
          placeholder="상품명"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={updateField}
          placeholder="가격"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />

        <select
          name="category"
          value={form.category}
          onChange={updateField}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
        >
          <option value="COFFEE">커피</option>
          <option value="TEA">차</option>
          <option value="DESSERT">디저트</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={updateField}
          placeholder="상품 설명"
          rows={3}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none resize-none focus:border-gray-400"
        />

        <input
          name="stock"
          value={form.stock}
          onChange={updateField}
          placeholder="재고"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />

        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={updateField}
          placeholder="이미지 URL"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
      </div>

      <div className="mt-4">
        <button
          onClick={onSubmit}
          className="w-full bg-[#2D2D2D] text-white py-3 rounded-md text-sm font-medium hover:bg-black transition-all active:scale-[0.98]"
        >
          등록
        </button>
      </div>
    </div>
  );
}