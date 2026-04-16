import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('track') track!: ElementRef;

  items: { image: string; url: string; alt: string }[] = [
    {
      image: 'https://americancomputeriquitos.com/images/difoid.png',
      url: 'https://www.minedu.gob.pe/superiorpedagogica/',
      alt: 'MINEDU Superior Pedagógica'
    },
    {
      image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/Logo_del_Ministerio_de_Educaci%C3%B3n_del_Per%C3%BA_-_MINEDU.png',
      url: 'https://www.gob.pe/minedu',
      alt: 'Ministerio de Educación'
    },
    {
      image: 'https://web.gereducusco.gob.pe/wp-content/uploads/geredu_cusco_dark.png',
      url: 'https://www.gob.pe/regioncusco-geredu',
      alt: 'GEREDU Cusco'
    },
    {
      image: 'https://www.pedagogicomariamadre.edu.pe/inicio/wp-content/uploads/2019/09/logo-siges.png',
      url: 'https://www.gob.pe/institucion/minedu/noticias/506778-minedu-crea-el-sistema-integrado-de-informacion-de-la-educacion-superior-y-tecnico-productiva',
      alt: 'SIGES'
    },
    {
      image: 'https://ugelarequipasur.gob.pe/wp-content/uploads/2021/07/logo-perueduca.png',
      url: 'https://www.perueduca.pe/#/home',
      alt: 'Perú Educa'
    },
    {
      image: 'https://eespvirgendelcarmen.edu.pe/wp-content/uploads/2022/12/Enlaces-de-interes_06.png',
      url: 'https://www.gob.pe/941-consultar-titulos-de-instituciones-tecnologicas-y-pedagogicas',
      alt: 'Consulta de Títulos'
    }
  ];

  private isDragging = false;
  private startX = 0;
  private currentTranslate = 0;
  private prevTranslate = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const trackEl = this.track.nativeElement;

    // Mouse Events
    this.renderer.listen(trackEl, 'mousedown', (e) => this.dragStart(e));
    this.renderer.listen(window, 'mousemove', (e) => this.dragAction(e));
    this.renderer.listen(window, 'mouseup', () => this.dragEnd());

    // Touch Events
    this.renderer.listen(trackEl, 'touchstart', (e) => this.dragStart(e));
    this.renderer.listen(window, 'touchmove', (e) => this.dragAction(e));
    this.renderer.listen(window, 'touchend', () => this.dragEnd());
  }

  private dragStart(event: any) {
    this.isDragging = true;
    this.startX = this.getPositionX(event);
    this.track.nativeElement.style.transition = 'none';
    this.track.nativeElement.style.cursor = 'grabbing';
  }

  private dragAction(event: any) {
    if (!this.isDragging) return;

    const currentPosition = this.getPositionX(event);
    const diff = currentPosition - this.startX;
    let x = this.prevTranslate + diff;

    // Aplicar límites para que no se salga del contenedor
    const maxScroll = -(this.track.nativeElement.scrollWidth - this.carousel.nativeElement.offsetWidth);
    if (x > 0) x = 0; // Límite izquierdo
    if (x < maxScroll) x = maxScroll; // Límite derecho

    this.currentTranslate = x;
    this.updatePosition();
  }

  private dragEnd() {
    this.isDragging = false;
    this.prevTranslate = this.currentTranslate;
    this.track.nativeElement.style.transition = 'transform 0.4s ease-out';
    this.track.nativeElement.style.cursor = 'grab';
  }

  private getPositionX(event: any): number {
    return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  }

  private updatePosition() {
    this.renderer.setStyle(
      this.track.nativeElement,
      'transform',
      `translateX(${this.currentTranslate}px)`
    );
  }
}