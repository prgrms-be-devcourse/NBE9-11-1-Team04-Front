'use client';

import { useState } from 'react';
import ProductGrid from './ProductGrid';
import Sidebar from './Sidebar';
import { Product } from '@/types/product';

export default function ProductWrapper({ products }: { products: Product[] }) {
    const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

    // 상품 클릭 관리 -> 클릭한 product id를 전달
    const handleProductClick = (product: Product) => { 
        setQuantities(prev => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1
        }));
    };

    // 수량 관리 -> 클릭한 상품 추가/ 사이드바에서 수량 조절
    const updateQty = (id: number, delta: number) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(0, (prev[id] || 0) + delta)
        }));
    };

    return (
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 클릭 함수 전달 */}
            <ProductGrid initialProducts={products} onProductClick={handleProductClick} />

            <aside className="lg:col-span-1">
                {/* 현재 수량과 수량 관리 함수 전달 */}
                <Sidebar items={products} quantities={quantities} updateQty={updateQty} />
            </aside>
        </div>
    );
}