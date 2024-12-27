import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from "./components/container/container.component";
import { HeaderComponent } from "./components/header/header.component";
import { SeparadorComponent } from "./components/separador/separador.component";
import { ContatoComponent } from './components/contato/contato.component';
import {FormsModule} from '@angular/forms' ;

interface Contato {
  id: number
  nome: string
  telefone: string
}

import agenda from './agenda.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ContainerComponent, HeaderComponent, SeparadorComponent,ContatoComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  contacts: Contato[] = agenda;
  textFilter: string =''

  //to remove a string's accents
  private removeAccents(text: string) : string {
    return text.normalize("NFD".replace(/[\u0300-\u036f]/g, ''));
  }

  filterContactsByText (): Contato[] {
    if(!this.textFilter){
      return this.contacts
    }
    return this.contacts.filter(contact => {
      return this.removeAccents(contact.nome).toLowerCase().includes(this.removeAccents(this.textFilter).toLowerCase())
    })
  }

  filterContactsByLetter (letter:string) : Contato[] {
    return this.filterContactsByText().filter(contact => { return this.removeAccents(contact.nome).toLowerCase().startsWith(letter)})
  }
}