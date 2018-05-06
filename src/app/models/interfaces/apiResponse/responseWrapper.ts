export interface IResponseWrapper {
  isValid: boolean;
  errorMessage: string;
}

export interface IContentResponseWrapper<T> extends IResponseWrapper {
  content: T;
}

