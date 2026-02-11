import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { RouterState } from '../../../../core/router/router-state';
@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
})
export class TopMenu implements OnInit, OnDestroy {
  appLogo = 'assets/logo-agendador-javanauta.png';
  inscricaoRota!: Subscription;
  rotaAtual: string = '';
  private routerService = inject(RouterState);
  ngOnInit(): void {
    this.inscricaoRota = this.routerService.rotaAtual$.subscribe((url) => {
      this.rotaAtual = url;
    });
  }
  ngOnDestroy(): void {
    this.inscricaoRota.unsubscribe(); //desinscreve para evitar vazamento de memória
  }
  estaNaRotaRegister(): boolean {
    return this.rotaAtual === '/register';
  }
}
