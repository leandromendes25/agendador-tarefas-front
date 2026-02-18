import { ThisReceiver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ThumbPosition } from '@angular/material/slider/testing';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly TOKEN_KEY = 'auth_token';

  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
