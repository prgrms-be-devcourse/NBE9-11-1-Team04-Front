'use client';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      style={{
        marginBottom: '16px',
        border: '1px solid #f1b7b7',
        backgroundColor: '#fff4f4',
        borderRadius: '10px',
        padding: '14px 16px',
        color: '#9f2f2f',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: 700,
        }}
      >
        오류가 발생했습니다.
      </p>
      <p
        style={{
          margin: '6px 0 0 0',
          fontSize: '14px',
        }}
      >
        {message}
      </p>
    </div>
  );
}
