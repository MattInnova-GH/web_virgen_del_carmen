import { Component } from '@angular/core';

interface Campana {
  numero: number;
  titulo: string;
  descripcion: string;
  imagenes: string[];
  activeIndex: number;
}

@Component({
  selector: 'app-psicopedagogico',
  imports: [],
  templateUrl: './psicopedagógico.html',
  styleUrl: './psicopedagógico.css',
})

export class Psicopedagogico {
  activeTab = 'presentacion';

  campanas: Campana[] = [
    {
      numero: 1,
      titulo: 'Campaña 101% buen ciudadano',
      descripcion: 'objetivo Promover, fortalecer y revalorar la importancia del civismo, la ética de la ciudadanía, los derechos humanos y la convivencia en democracia. Sensibilizar a la comunidad educativa en la importancia de ser un buen ciudadano, logrando el respeto y buen trato a sus pares, así como a la población en general.',
      imagenes: [
        'images/img4-psicope.jpeg',
        'images/img5-psicope.jpeg',
        'images/img6-psicope.jpeg',
        'images/img7-psicope.jpeg',
      ],
      activeIndex: 0,
    },
    
  ];

  setTab(tab: string): void {
    this.activeTab = tab;
  }

  nextSlide(campana: Campana): void {
    campana.activeIndex = (campana.activeIndex + 1) % campana.imagenes.length;
  }

  prevSlide(campana: Campana): void {
    campana.activeIndex =
      (campana.activeIndex - 1 + campana.imagenes.length) % campana.imagenes.length;
  }

  goToSlide(campana: Campana, index: number): void {
    campana.activeIndex = index;
  }
}
