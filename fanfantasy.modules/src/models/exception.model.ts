export interface Exception {
  code: string;
  message: string;
  i18nTag: string;
  originalError: any;
  httpStatus: number;
}

export interface ExceptionResponse {
  code:string;
  message: string;
}