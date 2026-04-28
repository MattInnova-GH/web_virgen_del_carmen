import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Organigrama } from './organigrama/organigrama';

interface Personal {
  nombre: string;
  cargo: string;
  foto: string;
}

interface AcademicPersonalDB {
  id: number;
  type: string;
  names: string;
  last_names: string;
  grade: string;
  img_url: string;
  year: number;
  description: string;
  status: boolean;
}

@Component({
  selector: 'app-nosotros',
  imports: [CommonModule, Organigrama],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros implements OnInit {

  private http = inject(HttpClient);
  career = signal<any>(null);

  selectedYear = 2026;
  readonly years = [2026, 2025, 2024, 2023, 2022];

  private allPersonal = signal<AcademicPersonalDB[]>([]);

  private abbreviateName(names: string, lastNames: string): string {
    const parts = (names ?? '').trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1][0]}. ${lastNames}`;
    }
    return `${names} ${lastNames}`;
  }

  get currentPersonal(): Personal[] {
    return this.allPersonal()
      .filter(p => p.status && p.year === this.selectedYear)
      .map(p => ({
        nombre: this.abbreviateName(p.names, p.last_names),
        cargo: p.grade,
        foto: p.img_url ?? '',
      }));
  }

  selectYear(year: number): void {
    this.selectedYear = year;
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/career/list').subscribe({
      next: data => {
        const activo = data.find(c => c.status);
        if (activo) this.career.set({
          ...activo,
          history: this.stripHtml(activo.history),
          mision: this.stripHtml(activo.mision),
          vision: this.stripHtml(activo.vision),
        });
      }
    });

    this.http.get<AcademicPersonalDB[]>('http://localhost:3000/api/academic_personal/list').subscribe({
      next: data => this.allPersonal.set(data),
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

  showContent(contentType: string): void {
    // 1. Obtener referencias principales
    const displayArea = document.getElementById('content-display-area');
    const targetContent = document.getElementById(`content-${contentType}`);
    const targetButton = document.getElementById(`btn-${contentType}`);

    if (!displayArea || !targetContent || !targetButton) {
      console.warn(`No se encontraron elementos para ${contentType}`);
      return;
    }

    // 2. Verificar si el contenido solicitado YA está visible (para alternar/toggle)
    const isAlreadyVisible = !targetContent.classList.contains('hidden');

    // 3. Ocultar todo el texto de contenido anterior y quitar estados activos
    const allContentDivs = document.querySelectorAll('.content-text');
    const allButtons = document.querySelectorAll('.floating-btn');

    allContentDivs.forEach((div) => div.classList.add('hidden'));
    allButtons.forEach((btn) => btn.classList.remove('floating-btn-active'));

    // 4. Lógica de visualización (Toggle)
    if (isAlreadyVisible) {
      // Si ya estaba abierto, ocultamos el área completa
      displayArea.classList.add('hidden');
    } else {
      // Si estaba cerrado o era otro contenido, lo mostramos
      displayArea.classList.remove('hidden');
      targetContent.classList.remove('hidden');
      targetButton.classList.add('floating-btn-active');

      // Desplazamiento suave para mejorar el enfoque visual
      setTimeout(() => {
        displayArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }
}
