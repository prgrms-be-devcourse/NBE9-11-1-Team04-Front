"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function ProductDetailPage() {
    const router = useRouter();

    // UI 확인을 위한 데이터 (image_1.png 내용 반영)
    const product = {
        name: "아메리카노",
        price: 4500,
        description: "진한 에스프레소와 깨끗한 물이 만나 선사하는 깔끔하고 깊은 풍미의 정석적인 커피입니다. 매일 아침 신선하게 로스팅된 원두를 사용하여 최상의 맛을 보장합니다.",
        category: "커피"
    };

    return (
        <div className="min-h-screen bg-[#2D1B14] text-white p-8 md:p-16 flex flex-col items-center">
            <div className="max-w-6xl w-full">
                {/* 상단 네비게이션 */}
                <button
                    onClick={() => router.back()}
                    className="mb-12 flex items-center text-gray-200 hover:text-white transition-all group"
                >
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase">Return to Menu</span>
                </button>

                {/* 메인 레이아웃 (이미지 비중을 줄이기 위해 col-span 조정) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* 상품 이미지 영역 (전체 12컬럼 중 5컬럼만 차지) */}
                    <div className="lg:col-span-5 aspect-square bg-gray-200 rounded-[2rem] flex items-center justify-center shadow-2xl relative overflow-hidden group">
                        <div className="text-[#4D4443] transition-transform duration-700 group-hover:scale-105">
                            <svg className="w-32 h-32 opacity-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        {/* 은은한 내부 조명 효과 */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 pointer-events-none" />
                    </div>

                    {/* 상품 정보 영역 (나머지 7컬럼 차지) */}
                    <div className="lg:col-span-7 flex flex-col justify-start">
                        <div className="mb-10">
                            {/* 카테고리 & 구분선 */}
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-white-400 text-s font-black uppercase">
                                    {product.category}
                                </span>
                                <div className="h-px flex-1 bg-white/10" />
                            </div>

                            {/* 상품명 */}
                            <h1 className="text-4xl font-black mb-10 leading-[1.1] tracking-tighter max-w-lg">
                                {product.name}
                            </h1>

                            {/* 가격 */}
                            <div className="flex items-baseline gap-2 mb-12 border-b border-white/10 pb-10">
                                <p className="text-3xl font-extralight text-white">
                                    ₩ {product.price.toLocaleString()}
                                </p>
                            </div>

                            {/* 설명 */}
                            <div className="space-y-6 max-w-xl">
                                <h3 className="text-s font-black uppercase  text-gray-200">
                                    상품 설명
                                </h3>
                                <p className="text-gray-200 leading-[1.9] text-lg font-light">
                                    {product.description}
                                </p>
                            </div>
                        </div>

                        {/* 하단 디자인 데코레이션 */}
                        <div className="mt-auto pt-10 border-t border-white/5">
                            <div className="flex justify-between items-center opacity-30">
                                <span className="text-[10px] font-medium tracking-[0.5em] uppercase italic">Crafted with Passion</span>
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}