export interface AppError {
  message: string;
  code?: string;
}

function isAppError(error: unknown): error is AppError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

export function toAppError(error: unknown): AppError {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    return {
      message: error.message || '알 수 없는 오류가 발생했습니다.',
    };
  }

  if (typeof error === 'string') {
    return {
      message: error,
    };
  }

  return {
    message: '알 수 없는 오류가 발생했습니다.',
  };
}
