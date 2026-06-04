import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

interface Personal {
  id: number;
  nombre: string;
  cargo: string;
  area: string;
  foto: string;
  email: string;
  descripcion: string;
  pdf_url: string;
}

type ContentType = 'mision' | 'vision' | 'valores' | 'organigrama' | null;

interface AcademicPersonalDB {
  id: number;
  type: string;
  names: string;
  last_names: string;
  grade: string;
  position: string;
  area: string;
  img_url: string;
  year: number;
  description: string;
  institucional_email: string;
  pdf_url: string;
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
  private sanitizer = inject(DomSanitizer);
  career = signal<any>(null);

  selectedYear = 0;
  years: number[] = [];
  selectedArea: string | null = null;

  activeProfile = signal<Personal | null>(null);
  safePdfUrl = signal<SafeResourceUrl | null>(null);

  private allPersonal = signal<AcademicPersonalDB[]>([]);

  availableAreas = computed(() => {
    const filtered = this.allPersonal().filter(p => p.status && p.year === this.selectedYear);
    const areas = filtered.map(p => p.area).filter(a => a && a.trim() !== '');
    return [...new Set(areas)];
  });

  private abbreviateName(grade: string, names: string, lastNames: string): string {
    const parts = (names ?? '').trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${grade} ${parts[0]} ${parts[1][0]}. ${lastNames}`;
    }
    return `${grade} ${names} ${lastNames}`;
  }

  get currentPersonal(): Personal[] {
    return this.allPersonal()
      .filter(p => {
        if (!p.status || p.year !== this.selectedYear) return false;
        if (this.selectedArea !== null && p.area !== this.selectedArea) return false;
        return true;
      })
      .map(p => ({
        id: p.id,
        nombre: this.abbreviateName(p.grade, p.names, p.last_names),
        cargo: p.position,
        area: p.area ?? '',
        foto: p.img_url ?? '',
        email: p.institucional_email ?? '',
        descripcion: p.description ?? '',
        pdf_url: p.pdf_url ?? '',
      }));
  }

  selectYear(year: number): void {
    this.selectedYear = year;
    this.selectedArea = null;
  }

  selectArea(area: string | null): void {
    this.selectedArea = area;
  }

  openProfile(persona: Personal) {
    this.activeProfile.set(persona);
    if (persona.pdf_url) {
      const base = environment.baseUrl
      this.safePdfUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(base + persona.pdf_url));
    } else {
      this.safePdfUrl.set(null);
    }
    document.body.style.overflow = 'hidden';
  }

  closeProfile() {
    this.activeProfile.set(null);
    this.safePdfUrl.set(null);
    document.body.style.overflow = '';
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get<any[]>(`${environment.apiUrl}/career/list`).subscribe({
      next: data => {
        const activo = data.find(c => c.status);
        if (activo) this.career.set({ ...activo });
      }
    });

    this.http.get<AcademicPersonalDB[]>(`${environment.apiUrl}/academic_personal/list`).subscribe({
      next: data => {
        this.allPersonal.set(data);
        const uniqueYears = [...new Set(data.map(p => p.year))];
        this.years = uniqueYears.sort((a, b) => b - a);
        if (this.years.length > 0) this.selectedYear = this.years[0];
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

  private stripHtml(html: string): string {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
  }

  showContent(type: ContentType) {
    this.activeContent.update(current => current === type ? null : type);
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