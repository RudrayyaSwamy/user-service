import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem("tocken")==null){
    return false;
  }
  if(localStorage.getItem("tocken")!=null){
    return true;
  }
  return false;
};
