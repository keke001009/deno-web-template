export class ErrorCode extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}

export const kCodeMaintenance: number = 1;
export const kCodeJwtAuth: number = 2;

export function throrSystemError(message: string) {
  throw new ErrorCode("system auth error: " + message, kCodeJwtAuth);
}

export function throwJwtError(message: string) {
  throw new ErrorCode("jwt auth error: " + message, kCodeJwtAuth);
}
