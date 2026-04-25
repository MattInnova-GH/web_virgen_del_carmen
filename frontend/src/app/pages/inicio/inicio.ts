import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  OnInit,
  Renderer2,
  NgZone,
  ChangeDetectorRef,
  inject,
  signal
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit, AfterViewInit, OnDestroy {

  private http = inject(HttpClient);
  private api = 'http://localhost:3000/api';

  latestNoticias = signal<any[]>([]);
  latestComunicados = signal<any[]>([]);
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('track') track!: ElementRef;

  // Agrega estas propiedades al componente
  heroImages: { src: string; alt: string }[] = [
    { src: 'https://eespvirgendelcarmen.edu.pe/wp-content/uploads/2024/08/3-copia-scaled.jpg', alt: 'Hero 1' },
    { src: 'https://eespvirgendelcarmen.edu.pe/wp-content/uploads/2024/08/1.png', alt: 'Hero 2' },
    { src: 'https://eespvirgendelcarmen.edu.pe/wp-content/uploads/2024/08/2-1-scaled.jpg', alt: 'Hero 3' },
  ];

  currentHeroIndex = 0;
  private heroInterval: ReturnType<typeof setInterval> | null = null;


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

  // Auto-scroll
  private animationId: number | null = null;
  private isPaused = false;
  private scrollSpeed = 0.5; // px por frame
  private currentTranslate = 0;

  // Drag
  private isDragging = false;
  private startX = 0;
  private dragStartTranslate = 0;
  private didDrag = false;

  private listeners: (() => void)[] = [];

  constructor(private renderer: Renderer2, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<any[]>(`${this.api}/news/list`).subscribe({
      next: data => this.latestNoticias.set(data.filter(n => n.status).slice(0, 3))
    });
    this.http.get<any[]>(`${this.api}/press_releases/list`).subscribe({
      next: data => this.latestComunicados.set(data.filter(n => n.status).slice(0, 2))
    });
  }

  ngAfterViewInit() {
  this.cloneItems();
  this.startHeroSlideshow();   // ← ya no dentro de runOutsideAngular

  this.ngZone.runOutsideAngular(() => {
    this.startAutoScroll();
    this.bindEvents();
  });
}

  ngOnDestroy() {
    if (this.animationId !== null) cancelAnimationFrame(this.animationId);
    this.listeners.forEach(fn => fn());

    if (this.heroInterval) clearInterval(this.heroInterval);
  }


  // Método nuevo:
  private startHeroSlideshow() {
    this.heroInterval = setInterval(() => {
      this.ngZone.run(() => {  // ← Ejecutar dentro de Angular zone
        this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroImages.length;
        this.cdr.detectChanges();  // ← Forzar detección de cambios
      });
    }, 3000);
  }
  
  goToHeroSlide(index: number) {
    this.currentHeroIndex = index;
  }

  // ── Loop infinito: clona los items al final del track ──
  private cloneItems() {
    const track = this.track.nativeElement as HTMLElement;
    const origItems = Array.from(track.children) as HTMLElement[];
    origItems.forEach(item => {
      const clone = item.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  // ── Auto scroll ──
  private startAutoScroll() {
    const track = this.track.nativeElement as HTMLElement;
    const carousel = this.carousel.nativeElement as HTMLElement;

    const tick = () => {
      if (!this.isPaused && !this.isDragging) {
        this.currentTranslate -= this.scrollSpeed;

        // Ancho de los items originales (la mitad del track clonado)
        const halfWidth = track.scrollWidth / 2;

        // Cuando llegamos al final de los originales, volvemos al inicio
        if (Math.abs(this.currentTranslate) >= halfWidth) {
          this.currentTranslate = 0;
        }

        track.style.transform = `translateX(${this.currentTranslate}px)`;
      }
      this.animationId = requestAnimationFrame(tick);
    };

    this.animationId = requestAnimationFrame(tick);
  }

  // ── Bind eventos ──
  private bindEvents() {
    const carousel = this.carousel.nativeElement as HTMLElement;
    const track = this.track.nativeElement as HTMLElement;

    // Pausa al hacer hover sobre el carousel
    this.listeners.push(
      this.renderer.listen(carousel, 'mouseenter', () => {
        this.isPaused = true;
      })
    );
    this.listeners.push(
      this.renderer.listen(carousel, 'mouseleave', () => {
        this.isPaused = false;
        if (!this.isDragging) {
          this.didDrag = false;
        }
      })
    );

    // Drag — mouse
    this.listeners.push(
      this.renderer.listen(track, 'mousedown', (e: MouseEvent) => this.onDragStart(e))
    );
    this.listeners.push(
      this.renderer.listen(window, 'mousemove', (e: MouseEvent) => this.onDragMove(e))
    );
    this.listeners.push(
      this.renderer.listen(window, 'mouseup', () => this.onDragEnd())
    );

    // Drag — touch
    this.listeners.push(
      this.renderer.listen(track, 'touchstart', (e: TouchEvent) => this.onDragStart(e))
    );
    this.listeners.push(
      this.renderer.listen(window, 'touchmove', (e: TouchEvent) => this.onDragMove(e))
    );
    this.listeners.push(
      this.renderer.listen(window, 'touchend', () => this.onDragEnd())
    );

    // Evitar navegación al hacer click después de drag
    this.listeners.push(
      this.renderer.listen(track, 'click', (e: MouseEvent) => {
        if (this.didDrag) {
          e.preventDefault();
          this.didDrag = false;
        }
      })
    );
  }

  private onDragStart(event: MouseEvent | TouchEvent) {
    this.isDragging = true;
    this.didDrag = false;
    this.startX = this.getClientX(event);
    this.dragStartTranslate = this.currentTranslate;
    this.track.nativeElement.style.transition = 'none';
    this.track.nativeElement.style.cursor = 'grabbing';
  }

  private onDragMove(event: MouseEvent | TouchEvent) {
    if (!this.isDragging) return;

    const diff = this.getClientX(event) - this.startX;
    if (Math.abs(diff) > 3) this.didDrag = true;

    this.currentTranslate = this.dragStartTranslate + diff;
    this.track.nativeElement.style.transform = `translateX(${this.currentTranslate}px)`;
  }

  private onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.track.nativeElement.style.cursor = 'grab';
  }

  private getClientX(event: MouseEvent | TouchEvent): number {
    return event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
  }
}