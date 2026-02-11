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

@Injectable({
  providedIn: 'root',
})
export class User {
  private apiUrl = 'http://localhost:8083';
  constructor(private Http: HttpClient) {}

  register(body: UserRegisterPayload): Observable<UserRegisterResponse> {
    return this.Http.post<UserRegisterResponse>(`${this.apiUrl}/usuario`, body);
  }
}
