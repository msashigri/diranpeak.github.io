/**
 * Firebase Firestore Error Handler
 */

export enum OperationType {
  GET = 'get',
  LIST = 'list',
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  WRITE = 'write'
}

export interface FirestoreErrorInfo {
  code: string;
  message: string;
  operationType: OperationType;
  path?: string;
  timestamp: string;
}

export function handleFirestoreError(
  error: any,
  operationType: OperationType = OperationType.GET,
  path?: string
): FirestoreErrorInfo {
  const code = error?.code || 'unknown';
  const rawMessage = error?.message || String(error);

  const errorInfo: FirestoreErrorInfo = {
    code,
    message: rawMessage,
    operationType,
    path,
    timestamp: new Date().toISOString()
  };

  // Log in development console for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `[Firestore ${operationType.toUpperCase()}] ${path ? `Path: ${path} | ` : ''}Code: ${code} | Message: ${rawMessage}`
    );
  }

  return errorInfo;
}
