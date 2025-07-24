import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DummyUsers } from '../types/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private userSubject = new BehaviorSubject<any>(this.getUserFromStorage());

  get user$(): Observable<any> {
    return this.userSubject.asObservable();
  }

  get userValue(): any {
    return this.userSubject.value;
  }

  login(username: string, password: string): boolean {
    const found = DummyUsers.find(u => u.username === username && u.password === password);
    if (found) {
      localStorage.setItem('BACKOFFICE_USERLOGIN', JSON.stringify(found));
      this.userSubject.next(found);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('BACKOFFICE_USERLOGIN');
    localStorage.removeItem('BACKOFFICE_EMPLOYEES');
    this.userSubject.next(null);
  }

  private getUserFromStorage(): any {
    const user = localStorage.getItem('BACKOFFICE_USERLOGIN');
    return user ? JSON.parse(user) : null;
  }
}
