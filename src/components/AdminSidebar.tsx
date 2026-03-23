'use client';

import { useState } from 'react';

export default function Sidebar() {
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: 'COFFEE',
    description: '',
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

  const onSubmit = () => {
    console.log('등록할 상품:', form);
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