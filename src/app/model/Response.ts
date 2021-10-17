export class Response<T> {
    obj: T;
    success: boolean;
    codStatus: number;
    message:   string[];
  }