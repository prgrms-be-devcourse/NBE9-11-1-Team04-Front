'use client';

import { useState } from 'react';
import { Tag, Star, Minus, Plus } from 'lucide-react';
import { CartItem, UserInfo } from '@/types/product';

export default function Sidebar({ items, quantities, updateQty }: { items: CartItem[], quantities: any, updateQty: (id: number, delta: number) => void }) {

  // 1. 화면 전환 상태 (cart: 장바구니, user: 배송정보(유저 정보)입력)
  // 기본 상태 : 장바구니
  const [view, setView] = useState<'cart' | 'user'>('cart');

  // 수량 및 수량 조절 함수는 그 위 컴포넌트에서 받아온다(card 클릭시에도 수량 추가하기 위해)
  const activeItems = items.filter(item => quantities[item.id] > 0);
  // 전체 가격 계산 
  const totalPrice = items.reduce((acc, item) =>
    acc + (item.price * (quantities[item.id] || 0)), 0
  );

  // 3. 유저 정보 입력 상태 관리
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    address: '',
    zipCode: ''
  });

  // 4. 최종 결제 버튼 클릭 시 실행될 함수
  const handleSubmitOrder = async () => {
    if (!userInfo.email || !userInfo.address || !userInfo.zipCode) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    const orderInfo = items
      .map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: quantities[item.id] || 0,
      }))
      .filter((order) => order.quantity > 0); // 수량이 0인 상품은 제외

    if (orderInfo.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
    console.log("================ 데이터 확인 ================");
    console.log("1. 유저 정보 (userInfo):", userInfo);
    console.log("2. 주문 상품 목록 (orderInfo):", orderInfo);

    try {
      // --- 유저 생성 API 호출 ---
      const response = await fetch('http://localhost:8080/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo), // { email, address, zipCode }
      });

      // 요청 응답 객체
      const rsData = await response.json();

      if (rsData.resultCode.startsWith("201")) {
        const rsUserId = rsData.data.user.id;
        console.log("유저 생성 성공! ID:", rsUserId);

        // Todo
        // --- 2단계 - 생성된 ID를 가지고 주문(Order) API를 호출 구현 ---

      } else {
        alert(`실패!!!!!!!: ${rsData.msg}`);
      }

    } catch (error) {
      console.error("에러:", error);
      alert("오류가 발생했습니다.");
    }
  };


  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg sticky top-8 mt-17">
      {view === 'cart' ? (
        /* --- 장바구니 뷰 --- */
        <>
          <div className="p-6">
            <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">Cafe</p>
            <h2 className="text-xl font-bold text-gray-900 mb-4">장바구니</h2>

            <div className="space-y-1">
              {activeItems.length === 0 ? (
                <div className='min-h-[90px] flex items-center justify-center'>
                  <p className='text-sm text-gray-500'>담긴 상품이 없습니다</p>
                </div>
              ) : (
                activeItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex gap-3">
                      <Tag className="w-5 h-5 text-gray-500 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                        <p className="text-xs font-bold text-gray-700">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border rounded-md px-1 py-0.5">
                      <button onClick={() => updateQty(item.id, -1)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold min-w-[16px] text-center">{quantities[item.id]}</span>
                      <button onClick={() => updateQty(item.id, 1)} className="p-1 hover:bg-gray-100 rounded text-gray-500">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )} 
              <div className=" text-xl font-bold text-gray-900  mt-3">${totalPrice}</div>
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={() => setView('user')}
              className="w-full bg-[#2D2D2D] text-white py-3 rounded-md text-sm font-medium hover:bg-black transition-all active:scale-[0.98]"
            >
              주문하기
            </button>
          </div>
        </>
      ) : (
        /* --- 유저 정보 입력 뷰 --- */
        <div className="p-6 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">주문 정보</h2>
            <p className="text-xs text-gray-500 mt-1">오후 2시 이후 주문은 다음날 배송됩니다</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">이메일</label>
              <input
                type="text"
                placeholder="example@email.com"
                className="w-full border border-gray-200 p-3 rounded-md outline-none text-sm focus:border-black"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">주소</label>
              <input
                type="text"
                placeholder="서울특별시 삼악로 110"
                className="w-full border border-gray-200 p-3 rounded-md outline-none text-sm focus:border-black"
                value={userInfo.address}
                onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1">우편번호</label>
              <input
                type="text"
                placeholder="000000"
                className="w-full border border-gray-200 p-3 rounded-md outline-none text-sm focus:border-black"
                value={userInfo.zipCode}
                onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}
              />
            </div>
          </div>

          <button
            onClick={handleSubmitOrder}
            className="w-full bg-[#2D2D2D] text-white py-3 rounded-md text-sm font-medium hover:bg-black transition-all active:scale-[0.98]"
          >
            결제
          </button>
          <button
            onClick={() => setView('cart')}
            className="w-full bg-white text-gray-500 py-2 rounded-md text-xs font-medium hover:text-gray-900 hover:bg-gray-50 transition-all"
          >
            ← 장바구니로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}