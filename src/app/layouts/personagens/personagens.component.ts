import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personagens',
  templateUrl: './personagens.component.html',
  styleUrls: ['./personagens.component.scss']
})
export class PersonagensComponent implements OnInit {

  personagens: any[] = [];
  constructor() { }

  ngOnInit() {
    this.personagens = [
      {nomePersonagem: 'Alípio ', descricaoPersonagem: 'Cavalo Alípio', imagemPersonagem: './assets/personagens/alipio2.jpg'},
      {nomePersonagem: 'Júlio ', descricaoPersonagem: 'Júlio', imagemPersonagem: './assets/personagens/julio2.jpg'},
      {nomePersonagem: 'Caco ', descricaoPersonagem: 'Júlio', imagemPersonagem: './assets/personagens/caco.jpg'},
    ]
  }

}
