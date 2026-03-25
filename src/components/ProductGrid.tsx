'use client';

import { useState } from 'react';
import { Product, CategoryType, CATEGORY_LABELS } from '@/types/product';
import ProductCard from './ProductCard';

const TABS: (CategoryType | 'ALL')[] = ['ALL', 'NUTTY', 'FRUITY', 'DECAF'];

export default function ProductGrid({ initialProducts, onProductClick, onAddToCart }:
    { initialProducts: Product[], onProductClick: (product: Product) => void, onAddToCart: (product: Product) => void }) {
    // 1. 상태 선언 (초기값 'ALL')
    const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'ALL'>('ALL');

    // 2. 필터링 로직 (상태 변경 시 자동 재계산)
    const filteredProducts = selectedCategory === 'ALL'
        ? initialProducts
        : initialProducts.filter(product => product.category === selectedCategory);

    return (
        <div className="lg:col-span-3 space-y-6">
            {/* 카테고리 탭 영역 */}
            <div className="flex gap-2 p-1 bg-[#3D2B24] rounded-lg w-fit">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedCategory(tab)} // 클릭 시 상태 업데이트
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${selectedCategory === tab
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {CATEGORY_LABELS[tab]}
                    </button>
                ))}
            </div>

            {/* 상품 목록 그리드 (필터링된 배열 사용) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 h-fit">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={onProductClick} // 상세 페이지 이동
                        onAddToCart={onAddToCart}   // 장바구니 관리
                    />
                ))}
            </div>
        </div>
    );
}