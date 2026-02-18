import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface UserRegisterPayload {
  nome: string;
  email: string;
  senha: string;
}

interface UserRegisterResponse {
  nome: string;
  email: string;
  enderecos:
    | [
        {
          rua: string;
          numero: number;
          complemento: string;
          cidade: string;
          estado: string;
          cep: string;
        },
      ]
    | null;
  telefones:
    | [
        {
          numero: string;
          ddd: string;
        },
      ]
    | null;
}

export interface UserLoginPayload {
  email: string;
  senha: string;
}

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = 'http://localhost:8083';
  constructor(private Http: HttpClient) {}

  register(body: UserRegisterPayload): Observable<UserRegisterResponse> {
    return this.Http.post<UserRegisterResponse>(`${this.apiUrl}/usuario`, body);
  }
  login(body: UserLoginPayload): Observable<string> {
    return this.Http.post<string>(`${this.apiUrl}/usuario/login`, body, {
      responseType: 'text' as 'json',
    });
  }
}
