import OrderAdminTable from '@/components/order-admin/OrderAdminTable';

export default function OrderAdminPreviewPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#4b2619',
        padding: '48px 24px 80px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '40px',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '56px',
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.1,
            }}
          >
            Coffee Order
          </h1>
          <p
            style={{
              margin: '12px 0 0 0',
              fontSize: '24px',
              color: '#e7d7cf',
            }}
          >
            Admin Order Preview
          </p>
        </div>

        <OrderAdminTable />
      </div>
    </main>
  );
}