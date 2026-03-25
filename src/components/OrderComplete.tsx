'use client';

import { CheckCircle2, Ticket, ArrowLeft } from 'lucide-react';
import { Tag } from 'lucide-react';
export default function OrderComplete({ orderData, onBackToMain }: any) {
    return (
        <div className="fixed inset-0 z-50 bg-[#2D1B14] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 overflow-hidden border border-[#E5E0DD]">
                <div className="p-10 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
                        <CheckCircle2 className="w-10 h-10 text-black-600" />
                    </div>

                    <h1 className="text-2xl font-black text-gray-900 mb-2">주문이 완료되었습니다</h1>
                    <div className="text-left space-y-4 mb-10 bg-[#FAF9F8] p-6 rounded-3xl border border-gray-100">
                        <h3 className="text-xs font-black text-gray-400 uppercase mb-2">주문 내역</h3>
                        <div className="divide-y divide-gray-100">
                            {orderData.orderProducts.map((p: any) => (
                                <div key={p.productId} className="py-3 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-gray-100">
                                            <Tag className="w-5 h-5 text-gray-500 mt-1" />
                                        </div>
                                        <span className="font-bold text-gray-800 text-sm">{p.name} <span className="text-gray-400 font-medium ml-1">x{p.quantity}</span></span>
                                    </div>
                                    <span className="font-bold text-gray-900 text-sm">&#8361;{(p.price * p.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 flex justify-between items-center border-t border-gray-200 mt-2">
                            <span className="text-sm font-bold text-gray-500">Total Price</span>
                            <span className="text-2xl font-black text-gray-950">&#8361;{orderData.totalPrice.toLocaleString()}</span>
                        </div>
                    </div>

                    <button
                        onClick={onBackToMain}
                        className="w-full bg-black text-white py-5 rounded-[1rem] font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
}