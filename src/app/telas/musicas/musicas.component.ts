import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Musicas } from './musicas.model';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-musicas',
  templateUrl: './musicas.component.html',
  styleUrls: ['./musicas.component.scss']
})
export class MusicasComponent implements OnInit {

  panelOpenState: boolean;
  musicas: Musicas[] = [];
  musicaAtual: String = '';
  musicasFiltradas: Musicas[] = [];
  paginaAnterior = 0;
  controlador = 7;
  constructor(private sanitazer: DomSanitizer) { }

  ngOnInit() {
    this.musicas = [
      {
        // tslint:disable-next-line:max-line-length
        id: 1, titulo: 'A Avó a Bordar', descricao: 'A turma do paiol canta a música "A Avó a Bordar".', youtube: 'lLg8ClXv-Vs', icone: './assets/personagens/zaza.jpg', safeUrl: '',
        // tslint:disable-next-line:max-line-length
        musica: '<p>Estava a Avó no seu lugar.</p><p>veio a mosca lhe cutucar.</p><p>veio a mosca lhe cutucar.</p><p>veio a mosca lhe cutucar.</p><p>veio a mosca lhe cutucar.</p><p>veio a mosca lhe cutucar.</p><p>veio a mosca lhe cutucar.</p><p>veio a mosca lhe cutucar.</p><p>veio a mosca lhe cutucar.</p><p>veio a mosca lhe cutucar.</p>'
      },
     /* {
        // tslint:disable-next-line:max-line-length
        id: 2, titulo: 'Já falei mais de mil vezes', descricao: 'teste.', youtube: 'IbnedIp7jPc', icone: './assets/personagens/zaza.jpg'
      },
      {
        // tslint:disable-next-line:max-line-length
        id: 3, titulo: 'Já falei mais de mil vezes', descricao: 'teste.', youtube: 'IbnedIp7jPc', icone: './assets/personagens/zaza.jpg'
      },
      {
        // tslint:disable-next-line:max-line-length
        id: 4, titulo: 'Já falei mais de mil vezes', descricao: 'teste.', youtube: 'IbnedIp7jPc', icone: './assets/personagens/zaza.jpg'
      },
      {
        // tslint:disable-next-line:max-line-length
        id: 5, titulo: 'Já falei mais de mil vezes', descricao: 'teste.', youtube: 'IbnedIp7jPc', icone: './assets/personagens/zaza.jpg'
      },
      {
        // tslint:disable-next-line:max-line-length
        id: 6, titulo: 'Já falei mais de mil vezes', descricao: 'teste.', youtube: 'IbnedIp7jPc', icone: './assets/personagens/zaza.jpg'
      }*/
    ];
    this.getSafeUrls();
    this.paginarMusicas(this.controlador);
  }

  getSafeUrls() {
    for (let i = 0 ; i < this.musicas.length; i++) {
      this.musicas[i].safeUrl = this.corrigirUrlYoutube(this.musicas[i]);
    }
  }
  corrigirUrlYoutube(musica) {
    return this.sanitazer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${musica.youtube}?ecver=2`);
  }

  filtro() {
    this.musicasFiltradas = JSON.parse(JSON.stringify(this.musicas));
    if (this.musicaAtual === '') {
        this.paginarMusicas(7);
    }
    if (this.musicaAtual.length > 1) {
      this.musicasFiltradas = this.filtrar(this.musicas);
    }
  }
  filtrar(values) {
    return values.filter(musica => musica.titulo.toLowerCase().includes(this.musicaAtual));
  }
  opcaoSelecionada(musicaSelecionada) {
    for (const musica in this.musicas) {
      if (this.musicas[musica].titulo === musicaSelecionada.option.value) {
        this.musicasFiltradas = [this.musicas[musica]];
        break;
      }
    }
  }

  paginar(event: MatPaginator) {
    if (event !== undefined) {
      if (event.pageIndex < this.paginaAnterior) {
        this.controlador -= 7;
      } else {
        this.controlador += 7;
      }
      this.paginaAnterior = event.pageIndex;
    }
    this.paginarMusicas(this.controlador);
  }

  paginarMusicas(controlador: number) {
    let inicial = controlador - 7;
    let num = 0;
    this.musicasFiltradas = [];
    for (inicial; inicial < controlador; inicial++ , num++) {
      if (this.musicas[inicial] === undefined) {
        break;
      }
      this.musicasFiltradas[num] = this.musicas[inicial];
    }
  }
}
