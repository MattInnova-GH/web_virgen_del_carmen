import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements AfterViewInit {
  @ViewChild('track') track!: ElementRef;

  items: string[] = [
    'https://americancomputeriquitos.com/images/difoid.png',
    'https://upload.wikimedia.org/wikipedia/commons/2/21/Logo_del_Ministerio_de_Educaci%C3%B3n_del_Per%C3%BA_-_MINEDU.png',
    'https://web.gereducusco.gob.pe/wp-content/uploads/geredu_cusco_dark.png',
    'https://www.pedagogicomariamadre.edu.pe/inicio/wp-content/uploads/2019/09/logo-siges.png',
    'https://ugelarequipasur.gob.pe/wp-content/uploads/2021/07/logo-perueduca.png',
    'https://eespvirgendelcarmen.edu.pe/wp-content/uploads/2022/12/Enlaces-de-interes_06.png'
  ];

  private isDragging = false;
  private startX = 0;
  private currentTranslate = 0;
  private prevTranslate = 0;
  private animationID = 0;
  private readonly itemWidth = 220; // Ajustar según el CSS (ancho + gap)

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const trackEl = this.track.nativeElement;

    // Eventos de Mouse
    this.renderer.listen(trackEl, 'mousedown', (e) => this.dragStart(e));
    this.renderer.listen(window, 'mousemove', (e) => this.dragAction(e));
    this.renderer.listen(window, 'mouseup', () => this.dragEnd());

    // Eventos Touch (Móviles)
    this.renderer.listen(trackEl, 'touchstart', (e) => this.dragStart(e));
    this.renderer.listen(window, 'touchmove', (e) => this.dragAction(e));
    this.renderer.listen(window, 'touchend', () => this.dragEnd());
  }

  dragStart(event: any) {
    this.isDragging = true;
    this.startX = this.getPositionX(event);
    this.track.nativeElement.style.transition = 'none';
    this.track.nativeElement.style.cursor = 'grabbing';
    cancelAnimationFrame(this.animationID);
  }

  dragAction(event: any) {
    if (!this.isDragging) return;
    
    const currentPosition = this.getPositionX(event);
    const diff = currentPosition - this.startX;
    this.currentTranslate = this.prevTranslate + diff;
    
    this.updatePosition();
    this.loopItems();
  }

  dragEnd() {
    this.isDragging = false;
    this.track.nativeElement.style.cursor = 'grab';
    this.track.nativeElement.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    
    // Snap a la posición más cercana
    this.currentTranslate = Math.round(this.currentTranslate / this.itemWidth) * this.itemWidth;
    this.prevTranslate = this.currentTranslate;
    
    this.updatePosition();
  }

  getPositionX(event: any): number {
    return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
  }

  updatePosition() {
    this.renderer.setStyle(
      this.track.nativeElement,
      'transform',
      `translateX(${this.currentTranslate}px)`
    );
  }

  loopItems() {
    // Lógica de bucle infinito reordenando el array
    if (this.currentTranslate <= -this.itemWidth) {
      const first = this.items.shift();
      if (first) this.items.push(first);
      this.currentTranslate += this.itemWidth;
      this.prevTranslate += this.itemWidth;
      this.updatePosition();
    } 
    else if (this.currentTranslate >= 0) {
      const last = this.items.pop();
      if (last) this.items.unshift(last);
      this.currentTranslate -= this.itemWidth;
      this.prevTranslate -= this.itemWidth;
      this.updatePosition();
    }
  }

  trackByFn(index: number, item: string): string {
    return item; // o return index.toString();
  }
}