import OrderAdminTable from '@/components/order-admin/OrderAdminTable';

export default function OrderAdminPreviewPage() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-500">Admin Preview</p>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">주문 관리 임시 화면</h1>
          <p className="mt-2 text-sm text-gray-600">
            주문 상세 모달, 배송 상태 변경, 공통 에러 메시지를 미리 테스트하는 페이지입니다.
          </p>
        </div>

        <OrderAdminTable />
      </div>
    </main>
  );
}
