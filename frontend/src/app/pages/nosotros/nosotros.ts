import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

interface Personal {
  nombre: string;
  cargo: string;
  foto: string;
}

type ContentType = 'mision' | 'vision' | 'valores' | 'organigrama' | null;

interface AcademicPersonalDB {
  id: number;
  type: string;
  names: string;
  last_names: string;
  grade: string;
  position: string;
  img_url: string;
  year: number;
  description: string;
  status: boolean;
}

@Component({
  selector: 'app-nosotros',
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros implements OnInit {
  imageViewer = signal(false);
  expandedHistory = signal(false);
  activeContent = signal<ContentType>(null);

  private http = inject(HttpClient);
  career = signal<any>(null);

  selectedYear = 0;
  years: number[] = [];

  private allPersonal = signal<AcademicPersonalDB[]>([]);

  private abbreviateName(grade: string, names: string, lastNames: string): string {
    const parts = (names ?? '').trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${grade} ${parts[0]} ${parts[1][0]}. ${lastNames}`;
    }
    return `${grade} ${names} ${lastNames}`;
  }

  get currentPersonal(): Personal[] {
    return this.allPersonal()
      .filter(p => p.status && p.year === this.selectedYear)
      .map(p => ({
        nombre: this.abbreviateName(p.grade, p.names, p.last_names),
        cargo: p.position,
        foto: p.img_url ?? '',
      }));
  }

  selectYear(year: number): void {
    this.selectedYear = year;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/career/list`).subscribe({
      next: data => {
        const activo = data.find(c => c.status);
        if (activo) this.career.set({
          ...activo,
          history: activo.history,
          mision: activo.mision,
          vision: activo.vision,
        });
      }
    });

    this.http.get<AcademicPersonalDB[]>(`${environment.apiUrl}/academic_personal/list`).subscribe({
      next: data => {
        this.allPersonal.set(data);

        // Obtener años únicos
        const uniqueYears = [...new Set(data.map(p => p.year))];

        // Ordenar de mayor a menor
        this.years = uniqueYears.sort((a, b) => b - a);

        // Seleccionar automáticamente el año más reciente
        if (this.years.length > 0) {
          this.selectedYear = this.years[0];
        }
      },
    });

    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    });
  }
  /**
   * Muestra el contenido seleccionado (Misión/Visión/Valores)
   * @param contentType - Tipo de contenido: 'mision', 'vision' o 'valores'
   */
  private stripHtml(html: string): string {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.replace(/\s+/g, ' ').trim();
  }

  showContent(type: ContentType) {
    this.activeContent.update(current => current === type ? null : type);
  }

  getShortHistory(html: string): string {
    if (!html) return '';

    const text = this.stripHtml(html);
    const maxLength = 220; // puedes ajustar

    if (text.length <= maxLength) return text;

    return text.substring(0, maxLength) + '...';
  }

  toggleHistory(): void {
    this.expandedHistory.update(v => !v);
  }

  sanitizeHtml(html: string): string {
    if (!html) return '';

    return html
      .replace(/&nbsp;/g, ' ')
      .replace(/<p>\s*<\/p>/g, '')
      .replace(/ style="[^"]*"/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  openImageViewer(event: Event) {
    event.stopPropagation();
    this.imageViewer.set(true);
  }

  closeImageViewer() {
    this.imageViewer.set(false);
  }
}

