import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  
  // 1️⃣ Check if request is for login
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register') ) {
    return next(req); // Let login & register request go without token
  }


  // 2️⃣ Get token from sessionStorage
  const token = sessionStorage.getItem('token');

  // 3️⃣ If token exists, clone request and add Authorization header
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // 4️⃣ If no token, continue with request as is
  return next(req);
};
