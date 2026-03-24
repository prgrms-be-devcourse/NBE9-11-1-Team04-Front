'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Coffee, ClipboardList, LogOut } from 'lucide-react';

export default function AdminNav() {
  // 현재 접속 중인 URL 경로를 가져옵니다.
  const pathname = usePathname();

  const navItems = [
    { name: '상품 관리', href: '/admin', icon: Coffee },
    { name: '주문 관리', href: '/admin/orders', icon: ClipboardList },
  ];

  return (
    <div className="bg-[#3D2B24] rounded-lg p-6 shadow-sm h-fit sticky top-8 border border-[#4A362D]">
      {/* 로고 / 타이틀 영역 */}
      <div className="mb-8 px-2">
        <h2 className="text-xl font-bold text-white tracking-wide">CAFE ADMIN</h2>
        <p className="text-xs text-gray-400 mt-1">관리자 대시보드</p>
      </div>

      {/* 네비게이션 메뉴 영역 */}
      <nav className="space-y-2">
        {navItems.map((item) => {
          // 현재 URL과 메뉴의 href가 일치하면 활성화(isActive) 상태로 만듭니다.
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all text-sm font-medium ${
                isActive
                  ? 'bg-white text-[#2D1B14] shadow-sm font-bold' // 선택된 메뉴: 흰색 배경
                  : 'text-gray-400 hover:bg-[#4A362D] hover:text-white' // 기본 메뉴: 투명 배경
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 하단 유틸 영역 (로그아웃 등) */}
      <div className="mt-12 pt-6 border-t border-[#4A362D]">
        <button className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all w-full text-left rounded-md hover:bg-[#4A362D]">
          <LogOut className="w-5 h-5" />
          주문 페이지로
        </button>
      </div>
    </div>
  );
}