import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;
  if (req.url.includes(environment.citiesApiUrl)) {
    clonedRequest = req.clone({
      headers: req.headers.append(
        'X-Api-Key',
        'bsMdS4EQiitUzB5yrEWbtw==MAzb5nfcZDrtGdF0',
      ),
    });
  }

  return next(clonedRequest);
};
