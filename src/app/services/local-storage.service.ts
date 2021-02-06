import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private localStorageService;
  private currentSession: any = null;
  constructor() { 
    this.localStorageService = localStorage;
    /*if ( localStorage.getItem('currentUser') ) {
      this.localStorageService = localStorage;
    } else {
      this.localStorageService = sessionStorage;
    }*/
    this.currentSession = this.loadSessionData();
  }

  loadSessionData(): any {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? JSON.parse(sessionStr) : null;
  }
  getCurrentSession(): any {
    return this.currentSession;
  }

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  getCurrentUsername(): string {
    var session = this.getCurrentSession();
    return (session && session.username) ? session.username : null;
  };

  getUserData(): any {
    var userData = this.localStorageService.getItem('userData');
    return (userData) ? JSON.parse(userData) : null;
  }
  setCurrentSession(session, rememberMe: boolean = false): void {
    /*if (rememberMe)
    {
      this.localStorageService = localStorage;
    } else {
      this.localStorageService = sessionStorage;
    }*/
    this.currentSession = session;
    if (rememberMe) {
      session.recordar = rememberMe;
      this.localStorageService.setItem('userData', JSON.stringify(session));
    } else {
      this.localStorageService.removeItem('userData');
    }
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  logout(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }
}
