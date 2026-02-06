import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, Subscription } from 'rxjs';
@Component({
  selector: 'app-top-menu',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.scss',
})
export class TopMenu implements OnInit, OnDestroy {
  appLogo = 'assets/logo-agendador-javanauta.png';
  rotaAtual: string = '';
  inscricaoRota!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.rotaAtual = this.router.url; //pega a rota atual
    this.inscricaoRota = this.router.events
      .pipe(
        //pipe permite fazer execuções
        filter((events) => events instanceof NavigationEnd),
      ) //assim que a navegação terminar, então conseguimos pegar a rota atualizada
      .subscribe((evento: NavigationEnd) => {
        //conseguimos observar o evento de navegação
        this.rotaAtual = evento.url;
      });
  }
  ngOnDestroy(): void {
    this.inscricaoRota.unsubscribe(); //desinscreve para evitar vazamento de memória
  }
  estaNaRotaRegister(): boolean {
    return this.rotaAtual === '/register';
  }
}
