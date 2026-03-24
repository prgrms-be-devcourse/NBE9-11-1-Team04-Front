import { AppError } from '@/lib/errors/appError';

interface ErrorMessageProps {
  error: AppError | null;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) {
    return null;
  }

  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {error.message}
    </div>
  );
}
