import { HttpInterceptorFn } from '@angular/common/http';

export const vitrayaInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
